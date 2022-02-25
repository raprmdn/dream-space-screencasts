import React, {useState} from 'react';
import App from "../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import FormProfileUpdate from "../../../Components/Forms/FormProfileUpdate";

export default function Profile() {
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
                            <div className="card card-custom gutter-b">
                                <div className="card-body pt-4">
                                    <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                                        <div className="navi-item mb-2 mt-5">
                                            <Link href={route('profile.settings')}
                                                  className={`navi-link py-4 ${route().current('profile.settings') ? 'active' : ''}`}>
                                                <span className="navi-icon"><i className="flaticon2-settings mr-4" /></span>
                                                <span className="navi-text font-size-lg">Profile Information</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="navi navi-bold navi-hover navi-link-rounded">
                                        <div className="navi-item mb-2">
                                            <Link href={route('profile.settings')}
                                                  className={`navi-link py-4`}>
                                                <span className="navi-icon"><i className="fas fa-shield-alt mr-4" /></span>
                                                <span className="navi-text font-size-lg">Change Password</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="separator separator-solid"/>
                                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                                        <div className="navi-item mb-2">
                                            <Link href={route('watchlist.index')}
                                                  className="navi-link py-4">
                                                <span className="navi-icon"><i className="fas fa-bookmark mr-4" /></span>
                                                <span className="navi-text font-size-lg">Watchlist</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                                        <div className="navi-item mb-2">
                                            <Link href={route('my-library')}
                                                  className="navi-link py-4">
                                                <span className="navi-icon"><i className="flaticon-medal mr-4" /></span>
                                                <span className="navi-text font-size-lg">My Library</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="separator separator-solid"/>
                                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                                        <div className="navi-item">
                                            <Link href={route('invoice.mine')}
                                                  className="navi-link py-4">
                                                <span className="navi-icon"><i className="flaticon-price-tag mr-4" /></span>
                                                <span className="navi-text font-size-lg">Invoice</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

Profile.layout = (page) => <App children={page}/>
