import React, {useEffect, useState} from 'react';
import App from "../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import Modal from "../../../Components/Modal";
import FormPaymentChannel from "../../../Components/Forms/FormPaymentChannel";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";

export default function PaymentChannelIndex() {
    const { data:payment_type } = usePage().props.payment_type
    const [ preview, setPreview ] = useState(null)
    const [ hidden, setHidden ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const { data, setData, post, errors, clearErrors, reset, processing } = useForm({
        payment_type_id: '',
        payment_channel: '',
        identifier_channel: '',
        type: '',
        virtual_number: '',
        payment_channel_owner: '',
        image: '',
        instruction: '',
        archived: false
    })

    useEffect(() => {
        const manualTransfer = data.payment_type_id.label === 'Manual Transfer'

        if (manualTransfer) {
            setHidden(false)
        }
         else {
            setHidden(true)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('payment.channel_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#addPaymentChannel').modal('hide')
            }
        })
    }

    const updateHandler = (e) => {
        e.preventDefault()
        data._method = 'put'
        post(route('payment.channel_update', data.identifier_code), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                setPreview(null)
                window.$('#editPaymentChannel').modal('hide')
            }
        })
    }

    const selectPaymentTypeHandler = (e) => {
        const manualTransfer = e.label === 'Manual Transfer'

        if (manualTransfer) {
            setData({
                ...data,
                payment_type_id: e,
                identifier_channel: '',
                type: '',
            })
        } else {
            setData({
                ...data,
                payment_type_id: e,
                virtual_number: '',
                payment_channel_owner: '',
            })
        }
    }

    const _switcherStatusPaymentChannel = (e, id) => {
        Inertia.put(route('payment.channel_status'), {
            channel_id: id,
            status: e.target.checked
        }, {
            preserveScroll:true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    const _switcherStatusPaymentType = (e, id) => {
        Inertia.put(route('payment.switch_status'), {
            id: id,
            status: e.target.checked
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    return (
        <>
            <Head title={"Dream Space - Payment Channel"}/>
            <Breadcrumb
                titleHeading="Payment Channel"
                item1="Dashboard"
                item2="Payment"
                item3="Payment Channel" linkItem3={route('payment.channel_index')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="row">
                        {
                            payment_type.map((type) => (
                                <div key={type.id} className="col-xl-6">
                                    <div className="card card-custom gutter-b">
                                        <div className="card-header border-bottom py-5">
                                            <h3 className="card-title font-weight-bolder text-dark">
                                                {type.payment_type}
                                            </h3>
                                            <div className="card-toolbar">
                                                <span className="switch switch-sm switch-outline switch-icon switch-brand">
                                                  <label>
                                                      <input type="checkbox"
                                                             disabled={loading} onClick={e => _switcherStatusPaymentType(e, type.id)}
                                                             defaultChecked={type.status === 'Active'} name="status" id="status" />
                                                      <span />
                                                    </label>
                                                </span>
                                                <button type="button" className="btn btn-primary btn-sm font-weight-bold ml-2"
                                                        data-toggle="modal" data-target="#addPaymentChannel" disabled={type.status === 'Inactive'}
                                                        onClick={() => {
                                                            setData({
                                                                ...data,
                                                                payment_type_id: {value: type.id, label: type.payment_type},
                                                                payment_channel: '',
                                                                virtual_number: '',
                                                                identifier_channel: '',
                                                                type: '',
                                                                payment_channel_owner: '',
                                                                image: '',
                                                                instruction: '',
                                                                archived: false
                                                            });
                                                            setPreview(null);
                                                            clearErrors();}
                                                        }>
                                                    <i className="flaticon2-plus icon-1x"/> Payment Channel
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {
                                                type.payment_channels.length > 0
                                                ?
                                                    type.payment_channels.map((channel) => (
                                                        <div key={channel.id}>
                                                            <fieldset disabled={type.status === 'Inactive'}>
                                                                <div className={`d-flex align-items-center border
                                                                border-1 rounded p-5 mb-4 ${type.status === 'Inactive' ? 'bg-gray-100' : ''}`}>
                                                                    <div className="symbol mr-3">
                                                                        <LazyLoadImage
                                                                            effect="blur"
                                                                            height={23}
                                                                            src={channel.image}
                                                                            className="mw-100" />
                                                                    </div>
                                                                    <div className="d-flex flex-grow-1">
                                                                        <div className="text-dark font-weight-bold mr-2">
                                                                            {channel.payment_channel}
                                                                        </div>
                                                                        {
                                                                            channel.archived && (
                                                                                <span className="label label-pill label-danger label-inline font-weight-normal">Archived</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className="mr-2">
                                                                    <span className="switch switch-sm switch-outline switch-icon switch-brand">
                                                                      <label>
                                                                          <input type="checkbox" id="status" name="status"
                                                                                 onChange={e => _switcherStatusPaymentChannel(e, channel.id)}
                                                                                 defaultChecked={channel.status === 'Active'} disabled={loading} />
                                                                          <span />
                                                                        </label>
                                                                    </span>
                                                                    </div>
                                                                    <button className="btn btn-sm btn-clean btn-icon"
                                                                            data-toggle="modal" data-target="#editPaymentChannel"
                                                                            onClick={() => {
                                                                                setData({
                                                                                    ...channel,
                                                                                    payment_type_id: {value: type.id, label: type.payment_type},
                                                                                });
                                                                                setPreview(channel.image);
                                                                                clearErrors();}}>
                                                                        <i className="flaticon-settings-1 text-primary" />
                                                                    </button>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    ))
                                                :
                                                    <>
                                                        There's no payment channel.
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Modal trigger={"addPaymentChannel"} title={"Add Payment Channel"} size={"modal-lg"}>
                <FormPaymentChannel {...{
                    submitHandler,
                    payment_type,
                    data,
                    setData,
                    errors,
                    processing,
                    submitLabel:"Create",
                    preview,
                    setPreview,
                    hidden,
                    selectPaymentTypeHandler
                }}/>
            </Modal>
            <Modal trigger={"editPaymentChannel"} title={`Edit Payment Channel : ${data.payment_channel}`} size={"modal-lg"}>
                <FormPaymentChannel {...{
                    submitHandler:updateHandler,
                    payment_type,
                    data,
                    setData,
                    errors,
                    processing,
                    submitLabel:"Update",
                    preview,
                    setPreview,
                    hidden,
                    selectPaymentTypeHandler
                }}/>
            </Modal>
        </>
    )
}

PaymentChannelIndex.layout = (page) => <App children={page}/>
