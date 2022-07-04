import React from 'react';
import App from "../../Layouts/App";
import {Head, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import Timeline from "../../Components/Timeline";

export default function Show() {
    const { user } = usePage().props;
    const { data:activities } = usePage().props.activities;

    return (
        <>
            <Head title={`${user.username} - Dream Space`}/>
            <Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="d-flex">
                                <div className="symbol symbol-100 flex-shrink-0 mr-10">
                                    <div className="d-flex flex-column">
                                        {
                                            user.picture
                                                ? <div className="symbol-label mb-3"
                                                       style={{backgroundImage: `url("${user.picture}")`}}/>
                                                : <div className="symbol-label mb-3"
                                                       style={{backgroundImage: `url("/assets/media/default-avatar.png")`}}/>
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
                                                        ?
                                                        <i className="flaticon2-correct text-success icon-md ml-3"></i>
                                                        :
                                                        <i className="flaticon2-correct text-light-dark icon-md ml-3"></i>
                                                }
                                            </h1>
                                            <small className="text-white-50">Joined since {user.joined}</small>
                                        </div>
                                        <p className="text-white font-weight-bold mb-5">{user.job}</p>
                                        <p>
                                            {
                                                user.github && (
                                                    <a href={`https://github.com/${user.github}`}
                                                       className="btn btn-icon btn-xs btn-circle btn-light-dark mr-2"
                                                       target="_blank">
                                                        <i className="socicon-github"></i>
                                                    </a>
                                                )
                                            }
                                            {
                                                user.facebook && (
                                                    <a href={`https://www.facebook.com/${user.facebook}`}
                                                       className="btn btn-icon btn-xs btn-circle btn-facebook mr-2"
                                                       target="_blank">
                                                        <i className="socicon-facebook"></i>
                                                    </a>
                                                )
                                            }
                                            {
                                                user.twitter && (
                                                    <a href={`https://twitter.com/${user.twitter}`}
                                                       className="btn btn-icon btn-xs btn-circle btn-twitter mr-2"
                                                       target="_blank">
                                                        <i className="socicon-twitter"></i>
                                                    </a>
                                                )
                                            }
                                            {
                                                user.instagram && (
                                                    <a href={`https://www.instagram.com/${user.instagram}?ref=dream-space.com`}
                                                       className="btn btn-icon btn-xs btn-circle btn-instagram mr-2"
                                                       target="_blank">
                                                        <i className="socicon-instagram"></i>
                                                    </a>
                                                )
                                            }
                                            {
                                                user.website && (
                                                    <a href={`https://${user.website}`}
                                                       className="btn btn-icon btn-xs btn-circle btn-light-dark mr-2"
                                                       target="_blank">
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
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-6 col-lg-6">
                                    <div className="card card-custom card-stretch gutter-b card-transparent">
                                        <div
                                            className="card-body d-flex flex-column rounded bg-warning-o-35 justify-content-between">
                                            <div className="rounded text-center mb-7 pt-7">
                                                <i className="flaticon2-talk icon-5x text-warning"></i>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-size-h1 text-warning font-weight-bolder">
                                                    {user.comments_count}
                                                </h3>
                                                <small className="text-white">Comments</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6">
                                    <div className="card card-custom card-stretch gutter-b card-transparent">
                                        <div
                                            className="card-body d-flex flex-column rounded bg-danger-o-35 justify-content-between">
                                            <div className="rounded text-center mb-7 pt-7">
                                                <i className="flaticon-like icon-5x text-danger"></i>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-size-h1 text-danger font-weight-bolder">
                                                    {user.likes_count}
                                                </h3>
                                                <small className="text-white">Likes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <h1 className="font-weight-boldest text-dark mb-10 ml-25">{user.name}'s activity</h1>
                    {
                        activities.length > 0
                        ?
                            <div className="timeline timeline-3">
                                <div className="timeline-items">
                                    {
                                        activities.map((activity, index) => (
                                            <div className="timeline-item" key={index}>
                                                <Timeline activity={activity} user={user} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        :
                            <div className="text-center">
                                <div className="text-dark mb-10 font-size-h5">No activities yet</div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
