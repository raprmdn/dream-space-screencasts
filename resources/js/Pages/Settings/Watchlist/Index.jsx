import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";
import SeriesBannerMeta from "../../../Components/SeriesBannerMeta";

export default function Index() {
    const { data:watchlists } = usePage().props.watchlist

    const _removeFromWatchlist = (e, series) => {
        e.preventDefault()
        Inertia.post(route('saves'),{
            series_id: series,
        }, {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Dream Space - Watchlist"/>
            <Breadcrumb
                titleHeading="Watchlist"
                item1="Settings" linkItem1={route('profile.settings')}
                item2="Watchlist" linkItem2={route('watchlist.index')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    {
                        watchlists.length > 0
                        ?
                            <div className="row">
                                <div className="col-lg-12">
                                    {
                                        watchlists.map((series) => (
                                            <div key={series.id} className="card card-custom gutter-b shadow">
                                                <div className="card-body">
                                                    <div className="d-block d-md-flex flex-row-reverse">
                                                        <div className="text-center d-md-flex flex-shrink-0 mt-lg-0 mt-3">
                                                            <LazyLoadImage
                                                                effect="blur"
                                                                src={series.thumbnail}
                                                                height={210}
                                                                alt={series.slug} className="mw-100 rounded-lg d-block"/>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            {
                                                                series.topics.map((topic) => (
                                                                    <Link href={route('topics.show', topic.slug)} key={topic.id} className="font-weight-bold">
                                                                        <u>{topic.name}</u> &nbsp;
                                                                    </Link>
                                                                ))
                                                            }
                                                            <div className="d-flex align-items-center flex-wrap mt-3">
                                                                <div className="d-flex">
                                                                    <Link href={route('series.show', series.slug)}
                                                                          className="text-dark-75 text-hover-primary font-weight-boldest font-size-h2-md font-size-h4">
                                                                        {series.title}
                                                                    </Link>
                                                                </div>
                                                                <div className="d-flex mt-5 mr-5">
                                                                    <p className="text-muted"
                                                                       align="justify" style={{whiteSpace: 'pre-line'}}>
                                                                        {series.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex">
                                                                <SeriesBannerMeta icon={'flaticon2-layers'} label={series.levels} />
                                                                <SeriesBannerMeta icon={'flaticon2-open-text-book'} label={`${series.episodes} episodes`} />
                                                                <SeriesBannerMeta icon={'far fa-clock'} label={
                                                                    <>
                                                                        <span>{series.runtime.h !== 0 ? `${series.runtime.h}h ` : ''}</span>
                                                                        <span>{series.runtime.m !== 0 ? `${series.runtime.m}m ` : ''}</span>
                                                                        <span>{series.runtime.s}s </span>
                                                                    </>
                                                                }/>
                                                            </div>
                                                            <div className="d-flex mt-5">
                                                                <Link href={route('watch.video', [series.slug, 1])} className="d-flex btn btn-success btn-sm mr-3 align-items-center">
                                                                    <i className="fas fa-play icon-1x mr-2 ml-2"/>
                                                                    Start Series
                                                                </Link>
                                                                <button onClick={(e) => _removeFromWatchlist(e, series.id)}
                                                                        className="d-flex btn btn-icon btn-danger btn-sm align-items-center">
                                                                    <i className="flaticon2-delete icon-1x"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        :
                            <div className="card card-custom shadow">
                                <div className="card-body p-0">
                                    <div className="text-center pt-20">
                                        <h3 className="font-weight-bolder mb-5">
                                            Nothing yet!
                                        </h3>
                                        <Link href={route('series')} className="font-size-lg text-muted font-weight-bold mb-5">
                                            <u>Browse the Series</u>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <img src="/assets/media/svg/illustrations/login-visual-5.svg" alt="Watchlist Empty"
                                             className="mw-100 max-h-300px"/>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
