import React from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import {Inertia} from "@inertiajs/inertia";

export default function Show() {
    const { auth } = usePage().props
    const { data: series } = usePage().props.series
    const latestVideo = series.videos[series.videos.length - 1] ?? null;

    const saves = (e) => {
        e.preventDefault()
        Inertia.post(route('saves'),{
            series_id: series.id,
        }, {
            preserveScroll: true,
        })
    }

    const addToCarts = (e) => {
        e.preventDefault()
        Inertia.post(route('add.carts'),{
            series_id: series.id,
        }, {
            preserveScroll: true,
        })
    }

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
                                    <span className="text-muted font-weight-bold">
                                        {
                                            series.discount.discount_unformatted
                                            ?
                                                <>Rp. {series.discount.discount_formatted},-</>
                                            :
                                                <>
                                                    {
                                                        series.price.price_unformatted
                                                        ?
                                                            <>Rp. {series.price.price_formatted},-</>
                                                        :
                                                            <>Free Series</>
                                                    }
                                                </>

                                        }
                                    </span>
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
                                <div className="d-lg-flex mt-6">
                                    <Link href={"#"} className="btn btn-success font-weight-bold mr-5">
                                        <i className="fas fa-play-circle mr-1"/>
                                        Start
                                    </Link>
                                {
                                    auth.user !== null && (
                                        <>
                                            {
                                                !series.viewing_status.is_free && (
                                                    series.viewing_status.is_buyable && (
                                                        series.viewing_status.is_exists_in_carts
                                                        ?
                                                            <button onClick={addToCarts} className="btn btn-danger font-weight-bold mr-5">
                                                                <i className="flaticon-shopping-basket mr-1"/>
                                                                Added to Carts
                                                            </button>
                                                        :
                                                            <button onClick={addToCarts} className="btn btn-light font-weight-bold mr-5">
                                                                <i className="flaticon-shopping-basket mr-1"/>
                                                                Add to Carts
                                                            </button>
                                                    )
                                                )
                                            }
                                            {
                                                series.viewing_status.is_watch_later
                                                ?
                                                    <button onClick={saves} className="btn btn-danger font-weight-bold mr-5">
                                                        <i className="fas fa-bookmark mr-1"/>
                                                        Added to Watchlist
                                                    </button>
                                                :
                                                    <button onClick={saves} className="btn btn-light font-weight-bold mr-5">
                                                        <i className="far fa-bookmark mr-1"/>
                                                        Add to Watchlist
                                                    </button>
                                            }
                                        </>
                                    )
                                }
                                </div>
                            <div className="row m-0 pt-5 mb-5">
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-flex">
                        {
                            latestVideo && (
                                <div>
                                    <div className="card card-custom card-stretch gutter-b bg-transparent shadow-sm">
                                        <div className="card-body d-flex flex-column">
                                            <div className="text-center text-white">
                                            <span className="font-weight-boldest"
                                                  style={{fontSize: '6rem', background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                                {latestVideo.episode}
                                            </span>
                                                <div className="mt-2">
                                                <span className="font-weight-boldest font-size-h3 m-0 mb-1">
                                                    {latestVideo.title}
                                                </span>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-muted">
                                                        <span>Latest Episode in this Series <br/></span>
                                                        <small>Added {latestVideo.created_at}</small>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Link href={"#"} className="btn btn-success btn-shadow-hover btn-block font-weight-bold btn-pill">
                                                        Watch
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            {
                                series.status === 'Development' && (
                                    <div className="alert alert-custom alert-warning alert-shadow fade show gutter-b"
                                         role="alert">
                                        <div className="alert-icon">
                                            <i className="flaticon-exclamation"/>
                                        </div>
                                        <div className="alert-text font-weight-bolder">This series is still in development.</div>
                                    </div>
                                )
                            }
                            {
                                series.videos.length > 0
                                ?
                                    <div className="card card-custom card-stretch gutter-b">
                                        <div className="card-body pt-7">
                                            {
                                                series.videos.length > 8
                                                    ?
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
                                                                            <span className="label label-light label-pill label-inline font-weight-bold">{video.runtime.runtime_formatted} minutes</span>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        video.newest && (<span className="label label-success label-pill label-inline font-weight-bold mr-2">Newest</span>)
                                                                    }
                                                                    {
                                                                        !video.is_free ? <i className="flaticon2-start-up icon-2x text-primary" /> : <></>
                                                                    }
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div>
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
                                                                            <span className="label label-light label-pill label-inline font-weight-bold">{video.runtime.runtime_formatted} minutes</span>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        video.newest && (<span className="label label-success label-pill label-inline font-weight-bold mr-2">Newest</span>)
                                                                    }
                                                                    {
                                                                        !video.is_free ? <i className="flaticon2-start-up icon-2x text-primary" /> : <></>
                                                                    }
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                :
                                    <div className="alert alert-custom alert-warning alert-shadow fade show gutter-b"
                                         role="alert">
                                        <div className="alert-icon">
                                            <i className="flaticon-exclamation"/>
                                        </div>
                                        <div className="alert-text font-weight-bolder">Videos are available coming soon.
                                        </div>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
