import React, {useState} from 'react';
import App from "../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import FormProfileUpdate from "../../../Components/Forms/FormProfileUpdate";
import SidebarProfileSettings from "../../../Components/SidebarProfileSettings";

export default function Index() {
    const { user } = usePage().props
    const [ preview, setPreview ] = useState(user.picture || null)

    const { data, setData, post, errors, clearErrors, processing } = useForm({
        id: user.id || '',
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        description: user.description || '',
        job: user.job || '',
        website: user.website || '',
        github: user.github || '',
        twitter: user.twitter || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        picture: user.picture || ''
    })

    const updateHandler = (e) => {
        e.preventDefault()
        data._method = 'put'
        post(route('profile.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                clearErrors()
            }
        })
    }

    return (
        <>
            <Head title="Dream Space - Profile Information"/>
            <Breadcrumb
                titleHeading="Profile Information"
                item1="Settings" linkItem1={route('profile.settings')}
                item2="Profile Information" linkItem2={route('profile.settings')}
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
                                        Profile Information
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <FormProfileUpdate
                                        {...{
                                            updateHandler,
                                            data,
                                            setData,
                                            errors,
                                            processing,
                                            user,
                                            preview,
                                            setPreview
                                        }}
                                    />
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
