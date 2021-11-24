import React from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import {LazyLoadImage} from "react-lazy-load-image-component";

export default function Show() {
    const { auth } = usePage().props
    const { data: series } = usePage().props.series
    return (
        <>
            <Head title={`Dream Space - ${series.title}`}>
                <script src="/assets/js/scripts.bundle.js"/>
            </Head>
            <Jumbotron>
                <div className="container row d-flex align-items-center align-center">
                    <div className="col-lg-8 py-10">
                        <div className="d-flex flex-column">
                            <div className="mb-3">
                                {
                                    series.topics.map((topic) => (
                                        <Link href={route('topics.show', topic.slug)}
                                           key={topic.id}
                                           className="label label-lg label-success label-pill label-inline mr-2 font-weight-bold">{topic.name}</Link>
                                    ))
                                }
                            </div>
                            <h1 className="text-white font-weight-boldest mb-7">
                                <span style={{background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                    <span>{series.title}</span>
                                </span>
                            </h1>
                            <p className="font-weight-bold font-size-h5 text-muted"
                               align="justify" style={{whiteSpace: 'pre-line'}}>
                                {series.description}
                            </p>
                            <div className="d-block d-lg-flex mt-2">
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    <i className="flaticon-price-tag pr-3"/>
                                    <span className="text-muted font-weight-bold">Rp.{series.price.price_formatted},-</span>
                                </div>
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    <i className="far fa-calendar-plus pr-3"/>
                                    <span className="text-muted font-weight-bold">{series.created_at}</span>
                                </div>
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    <i className="flaticon2-layers pr-3"/>
                                    <span className="text-muted font-weight-bold">{series.levels}</span>
                                </div>
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    <i className="flaticon2-open-text-book pr-3"/>
                                    <span className="text-muted font-weight-bold">{series.episodes} episodes</span>
                                </div>
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    <i className="far fa-clock pr-3"/>
                                    <span className="text-muted font-weight-bold">
                                        <span>{series.runtime.h !== 0 ? `${series.runtime.h}h ` : ''}</span>
                                        <span>{series.runtime.m !== 0 ? `${series.runtime.m}m ` : ''}</span>
                                        <span>{series.runtime.s}s </span>
                                    </span>
                                </div>
                                <div className="d-flex align-items-center pr-5 pt-2">
                                    {
                                        series.status === 'Completed'
                                        ?
                                        <i className="far fa-check-circle pr-3"/>
                                        :
                                        <i className="fas fa-code pr-3"/>
                                    }
                                    <span className="text-muted font-weight-bold">
                                        {series.status}
                                    </span>
                                </div>
                            </div>
                            {
                                auth.user !== null
                                ?
                                <div className="d-lg-flex mt-6">
                                    <Link href={"#"} className="btn btn-success font-weight-bold mr-5">
                                        <i className="fas fa-play-circle mr-1"/>
                                        Start
                                    </Link>
                                    <Link href={"#"} className="btn btn-light font-weight-bold mr-5">
                                        <i className="flaticon-shopping-basket mr-1"/>
                                        Add to Carts
                                    </Link>
                                    <Link href={"#"} className="btn btn-light font-weight-bold mr-5">
                                        <i className="far fa-bookmark mr-1"/>
                                        Add to Watchlist
                                    </Link>
                                </div>
                                :
                                <></>
                            }
                            <div className="row m-0 pt-5 mb-5">
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-flex">
                        <div key={series.id}>
                            <div className="card card-custom card-stretch gutter-b bg-transparent shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <div className="text-center text-white">
                                        <span>
                                            <LazyLoadImage
                                                src={series.thumbnail}
                                                effect="blur"
                                                height={200}
                                                alt={series.slug}
                                                className="mw-100 rounded-lg" />
                                        </span>
                                        <div className="mt-2">
                                            <span className="font-weight-boldest font-size-h3 m-0 mb-1">
                                                {series.title}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <div className="text-muted">
                                                <small>Added {series.created_at}</small>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link href={route('series.show', series.slug)} className="btn btn-success btn-shadow-hover btn-block font-weight-bold btn-pill">
                                                Watch
                                            </Link>
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
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-body pt-7">
                                    <div data-scroll="true" data-height="800">
                                        {
                                            series.videos.map((video) => (
                                                <Link key={video.id} href={"#"} className="d-flex align-items-center bg-hover-light-o-2 border border-1 rounded p-5 mb-4">
                                                    <div className="symbol symbol-circle mr-5">
                                                        <span className="symbol-label font-size-h5">{video.episode}</span>
                                                    </div>
                                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                                        <span className="text-dark mb-1 font-size-lg font-weight-bolder">{video.title}</span>
                                                        <div>
                                                            <span className="label label-light label-pill label-inline font-weight-bold">Episode {video.episode}</span>
                                                            <span className="label label-dot label-sm bg-dark opacity-50 mx-1"/>
                                                            <span className="label label-light label-pill label-inline font-weight-bold">{video.runtime.runtime_formatted}</span>
                                                        </div>
                                                    </div>
                                                    <i className="flaticon2-start-up icon-2x" />
                                                </Link>
                                            ))
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

Show.layout = (page) => <App children={page}/>
