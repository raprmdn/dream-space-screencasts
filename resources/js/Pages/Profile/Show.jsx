import React from 'react';
import App from "../../Layouts/App";
import {Head, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";

export default function Show() {
    const { user } = usePage().props;

    return (
        <>
            <Head title={`${user.username} - Dream Space`}/>
            <Jumbotron>
                <div className="container">
                    <div className="d-flex py-10">
                        <div className="symbol symbol-100 flex-shrink-0 mr-10">
                            <div className="d-flex flex-column">
                                {
                                    user.picture
                                        ? <div className="symbol-label mb-3" style={{backgroundImage: `url("${user.picture}")`}} />
                                        : <div className="symbol-label mb-3" style={{backgroundImage: `url("/assets/media/default-avatar.png")`}} />
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                            <div className="d-flex flex-column flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="text-white font-weight-boldest d-flex align-items-center">
                                        {user.name}
                                        {
                                            user.is_verified_email
                                                ? <i className="flaticon2-correct text-success icon-md ml-3"></i>
                                                : <i className="flaticon2-correct text-light-dark icon-md ml-3"></i>
                                        }
                                    </h1>
                                    <small className="text-white-50">Joined since {user.joined}</small>
                                </div>
                                <p className="text-white font-weight-bold mb-5">{user.job}</p>
                                <p>
                                    {
                                        user.github && (
                                            <a href={`https://github.com/${user.github}`} className="btn btn-icon btn-xs btn-circle btn-light-dark mr-2" target="_blank">
                                                <i className="socicon-github"></i>
                                            </a>
                                        )
                                    }
                                    {
                                        user.facebook && (
                                            <a href={`https://www.facebook.com/${user.facebook}`} className="btn btn-icon btn-xs btn-circle btn-facebook mr-2" target="_blank">
                                                <i className="socicon-facebook"></i>
                                            </a>
                                        )
                                    }
                                    {
                                        user.twitter && (
                                            <a href={`https://twitter.com/${user.twitter}`} className="btn btn-icon btn-xs btn-circle btn-twitter mr-2" target="_blank">
                                                <i className="socicon-twitter"></i>
                                            </a>
                                        )
                                    }
                                    {
                                        user.instagram && (
                                            <a href={`https://www.instagram.com/${user.instagram}?ref=dream-space.com`} className="btn btn-icon btn-xs btn-circle btn-instagram mr-2" target="_blank">
                                                <i className="socicon-instagram"></i>
                                            </a>
                                        )
                                    }
                                    {
                                        user.website && (
                                            <a href={`https://${user.website}`} className="btn btn-icon btn-xs btn-circle btn-light-dark mr-2" target="_blank">
                                                <i className="fas fa-link"></i>
                                            </a>
                                        )
                                    }
                                </p>
                            </div>
                            <div className="d-flex mt-10">
                                <p className="text-white">
                                    {
                                        user.description
                                            ? user.description
                                            : 'We don\'t know much about this user. But we know that user is very nice person...'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
