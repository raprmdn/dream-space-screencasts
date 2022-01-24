import React from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Inertia} from "@inertiajs/inertia";

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
                item1="Profile"
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
                                                    <div className="d-block d-md-flex">
                                                        <div className="text-center d-md-flex flex-shrink-0 mr-7 mt-lg-0 mt-3">
                                                            <LazyLoadImage
                                                                effect="blur"
                                                                src={series.thumbnail}
                                                                height={210}
                                                                alt={series.slug} className="mw-100 rounded-lg d-block"/>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                                                                <div className="d-flex align-items-cente">
                                                                    <Link href={route('series.show', series.slug)}
                                                                          className="text-dark-75 text-hover-primary font-weight-bolder font-size-h4-md font-size-h4">
                                                                        {series.title}
                                                                    </Link>
                                                                </div>
                                                                <div className="d-flex align-items-center mt-5">
                                                                    <p className="text-muted"
                                                                       align="justify" style={{whiteSpace: 'pre-line'}}>
                                                                        {series.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end">
                                                                <div className="mt-5">
                                                                    <button className="btn btn-link-dark mr-3"><u>Start watching</u></button>
                                                                    <button onClick={(e) => _removeFromWatchlist(e, series.id)}
                                                                            className="btn btn-link-dark"><u>Remove</u></button>
                                                                </div>
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
                                        <img src="/assets/media/svg/illustrations/login-visual-5.svg" alt="Cart Empty"
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
