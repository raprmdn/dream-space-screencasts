import React from 'react';
import App from "../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import Modal from "../../../Components/Modal";
import FormPaymentType from "../../../Components/Forms/FormPaymentType";
import {Inertia} from "@inertiajs/inertia";

export default function PaymentTypeIndex() {
    const { data:payment_type } = usePage().props.payment_type

    const { data, setData, post, put, errors, delete:destroy, clearErrors, reset ,processing } = useForm({
        payment_type: '',
        description: ''
    });

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('payment.type_store'), {
           preserveScroll: true,
           onSuccess: () => {
               reset()
               window.$('#addPaymentType').modal('hide')
           }
        });
    }

    const updateHandler = (e) => {
        e.preventDefault()
        put(route('payment.type_update', data.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#updatePaymentType').modal('hide')
            }
        })
    }

    // const deleteHandler = (e, type) => {
    //     e.preventDefault()
    //     destroy(route('payment.type_destroy', type.id), {
    //         preserveScroll: true
    //     })
    // }

    const _switchingStatusHandler = (e, id) => {
        Inertia.put(route('payment.switch_status'), {
            id: id,
            status: e.target.checked
        }, {
            preserveScroll: true
        })
    }

    const _switchingArchiveHandler = (e, id) => {
        Inertia.put(route('payment.switch_archive'), {
            id: id,
            archived: e.target.checked
        }, {
            preserveScroll: true
        })
    }

    return (
        <>
            <Head title={"Dream Space - Payment Method/Type Configuration"}/>
            <Breadcrumb
                titleHeading="Payment Type"
                item1="Dashboard"
                item2="Payment"
                item3="Payment Type" linkItem3={route('payment.type_index')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Payment Type
                            </h3>
                            <div className="card-toolbar">
                                <button className="btn btn-primary font-weight-bold ml-2"
                                   data-toggle="modal" data-target="#addPaymentType"
                                        onClick={() => {reset(); clearErrors();}}>
                                    <i className="flaticon2-plus icon-1x"/> Add Payment Type
                                </button>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th style={{minWidth : '100px'}}>Payment Type</th>
                                        <th style={{minWidth : '100px'}}>Identifier</th>
                                        <th style={{minWidth : '150px'}}>Description</th>
                                        <th className="text-center" style={{minWidth : '50px'}}>Status</th>
                                        <th className="text-center" style={{minWidth : '50px'}}>Archived</th>
                                        <th className="pr-0 text-right" style={{minWidth: '50px'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        payment_type.length > 0 ?
                                            payment_type.map((type) => (
                                                <tr key={type.id} className="odd">
                                                    <td>
                                                        <span className="font-weight-bold">{type.payment_type}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{type.identifier}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{type.description}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            <span className="switch switch-sm switch-icon">
                                                              <label>
                                                                <input type="checkbox" id="status" name="status"
                                                                       onChange={e => _switchingStatusHandler(e, type.id)}
                                                                       defaultChecked={type.status === 'Active'} />
                                                                <span />
                                                              </label>
                                                            </span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            <span className="switch switch-sm switch-icon">
                                                              <label>
                                                                <input type="checkbox" id="status" name="status"
                                                                       onChange={e => _switchingArchiveHandler(e, type.id)}
                                                                       defaultChecked={type.archived} />
                                                                <span />
                                                              </label>
                                                            </span>
                                                        </span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="modal" data-target="#updatePaymentType"
                                                                    onClick={() => {setData(type); clearErrors();}}>
                                                                <i className="flaticon-settings-1 text-primary" />
                                                            </button>
                                                            {/*<button className="btn btn-sm btn-clean btn-icon"*/}
                                                            {/*        data-toggle="tooltip" title="Delete"*/}
                                                            {/*        onClick={(e) => deleteHandler(e, type)}>*/}
                                                            {/*    <i className="flaticon2-trash text-danger icon-1x" />*/}
                                                            {/*</button>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={6} className="text-center p-7 font-weight-bolder">No records found in table</td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal trigger={"addPaymentType"} title={"Add Payment Type"} size={"modal-lg"}>
                <FormPaymentType {...{
                    submitHandler,
                    data,
                    setData,
                    errors,
                    processing,
                    submitLabel:"Submit"
                }}/>
            </Modal>
            <Modal trigger={"updatePaymentType"} title={`Update Payment Type : ${data.payment_type}`} size={"modal-lg"}>
                <FormPaymentType {...{
                    submitHandler:updateHandler,
                    data,
                    setData,
                    errors,
                    processing,
                    submitLabel:"Update"
                }}/>
            </Modal>
        </>
    )
}

PaymentTypeIndex.layout = (page) => <App children={page}/>
