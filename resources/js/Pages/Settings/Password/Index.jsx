import React from 'react';
import App from "../../../Layouts/App";
import {Head, useForm} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SidebarProfileSettings from "../../../Components/SidebarProfileSettings";
import FormChangePassword from "../../../Components/Forms/FormChangePassword";

export default function Index() {
    const { data, setData, put, errors, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const updateHandler = (e) => {
        e.preventDefault()
        put(route('user-password.update'), {
            data,
            onSuccess: () => {
                reset()
            }
        })
    }

    return (
        <>
            <Head title="Dream Space - Change Password"/>
            <Breadcrumb
                titleHeading="Change Password"
                item1="Settings" linkItem1={route('profile.settings')}
                item2="Change Password" linkItem2={route('my-library')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3">
                            <SidebarProfileSettings/>
                        </div>
                        <div className="col-xl-9">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-header border-bottom py-5">
                                    <h3 className="card-title font-weight-bolder text-dark">
                                        Change Password
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <FormChangePassword {...{
                                        updateHandler,
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
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
