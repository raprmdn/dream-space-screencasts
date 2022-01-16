import React, {useState} from 'react';
import App from "../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import {Inertia} from "@inertiajs/inertia";
import FormPaymentConfiguration from "../../../Components/Forms/FormPaymentConfiguration";

export default function Index() {
    const { configuration } = usePage().props
    const [ switcher ] = useState(configuration ? configuration.status === 'Enable' : false )
    const [ loading, setLoading ] = useState(false)
    const [ blocked, setBlocked ] = useState(configuration ? configuration.status === 'Disable' : false)

    const { data, setData, put, errors, processing } = useForm({
        id: configuration.id ?? '',
        environment: configuration.environment ?? false,
        merchant_id: configuration.merchant_id ?? '',
        client_key: configuration.client_key ?? '',
        server_key: configuration.server_key ?? '',
        sanitized: configuration.sanitized ?? false,
        enable_3d_secure: configuration.enable_3d_secure ?? false,
    });

    const switcherHandler = (e) => {
        Inertia.put(route('payment.status_config'), {
            status: e.target.checked
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
                setBlocked(!blocked)
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        put(route('payment.config_update', data), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title={"Dream Space - Payment Configuration"}/>
            <Breadcrumb
                titleHeading="Payment Configuration"
                item1="Dashboard"
                item2="Payment"
                item3="Payment Configuration" linkItem3={route('payment.config_index')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-8">
                            <div className="card card-custom gutter-b">
                                <div className="card-header border-bottom py-5">
                                    <h3 className="card-title font-weight-bolder text-dark">
                                        Midtrans Configuration
                                    </h3>
                                    <div className="card-toolbar">
                                        <span className="switch switch-sm switch-outline switch-icon switch-brand">
                                          <label>
                                            <input type="checkbox" disabled={loading} onClick={switcherHandler} defaultChecked={switcher} name="status" />
                                            <span />
                                          </label>
                                        </span>
                                    </div>
                                </div>
                                <FormPaymentConfiguration {...{
                                    submitHandler,
                                    blocked,
                                    data,
                                    setData,
                                    errors,
                                    processing
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
