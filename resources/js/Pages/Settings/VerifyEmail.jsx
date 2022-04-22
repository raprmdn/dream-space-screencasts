import React from 'react';
import {Head, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../Components/Breadcrumb";
import SidebarProfileSettings from "../../Components/SidebarProfileSettings";
import App from "../../Layouts/App";
import {Inertia} from "@inertiajs/inertia";

export default function VerifyEmail() {
    const { flash } = usePage().props;

    const resendVerification = (e) => {
        e.preventDefault()
        Inertia.post(route('verification.send'), {}, {
            preserveScroll: true
        })
    }

    return (
        <>
            <Head title="Dream Space - Verify Email"/>
            <Breadcrumb
                titleHeading="Verify Email"
                item1="Settings" linkItem1={route('verification.notice')}
                item2="Verify Email" linkItem2={route('verification.notice')}
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
                                        Verify Email
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <p className="font-size-lg">
                                        Thanks for signing up! Before getting started, could you verify your email address by clicking the link in the email we sent you?
                                        If you didn't receive the email, we will gladly send you another.
                                    </p>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-info font-weight-bolder mt-5"
                                                onClick={resendVerification}>
                                            Resend Email Verification
                                        </button>
                                        {
                                            flash.status && (
                                                <p className="text-success text-sm mt-3">
                                                    A new verification link has been sent to your email address you provided during registration.
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

VerifyEmail.layout = (page) => <App children={page}/>
