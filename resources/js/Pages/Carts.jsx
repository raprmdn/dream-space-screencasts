import React, {useState} from 'react';
import App from "../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";

export default function Carts() {
    const { carts } = usePage().props
    const [ loading, setLoading ] = useState(false)

    const remove = (e, series) => {
        e.preventDefault()
        Inertia.post(route('remove.carts'),{
            series_id: series,
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            },
        })
    }

    const saves = (e, series) => {
        e.preventDefault()
        Inertia.post(route('saves'),{
            series_id: series,
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    return (
        <>
            <Head title="Dream Space - Carts"/>
            <Breadcrumb
                titleHeading="My Carts"
                item1="Profile"
                item2="Carts" linkItem2={route('carts')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            {
                                carts.data.map((series) => (
                                    <div key={series.id} className="card card-custom gutter-b">
                                        <div className="card-body">
                                            <div className="d-block d-md-flex">
                                                <div className="text-center d-md-flex flex-shrink-0 mr-7 mt-lg-0 mt-3">
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={series.series.series_thumbnail}
                                                        width={250}
                                                        height={150}
                                                        alt={series.series.slug} className="rounded-lg d-block"/>
                                                </div>
                                                <div className="flex-grow-1">
                                                    {
                                                        series.series.topics.map((topic) => (
                                                            <Link href={route('topics.show', topic.slug)} key={topic.id}>
                                                                <small><u>{topic.name}</u> &nbsp;</small>
                                                            </Link>
                                                        ))
                                                    }
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                                                        <div className="d-flex align-items-cente mr-3">
                                                            <Link href={route('series.show', series.series.slug)}
                                                                  className="text-dark-75 text-hover-primary font-weight-bolder font-size-h4-md font-size-h4">
                                                                {series.series.title}
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex d-md-inline-flex align-items-center">
                                                            {
                                                                series.series.is_discount && (
                                                                    <span className="text-muted"><s>Rp. {series.series.price},-</s></span>
                                                                )
                                                            }
                                                            &nbsp; &nbsp;
                                                            <span className="font-weight-bold text-dark-75">
                                                                Rp. {series.price.price_formatted},-
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <div className="mt-5 pt-md-20">
                                                            {
                                                                series.series.is_watch_later
                                                                ? <button onClick={(e) => saves(e, series.series.id)}
                                                                          className="btn btn-link-dark mr-3" disabled={loading}><u>Remove from watchlist</u></button>
                                                                : <button onClick={(e) => saves(e, series.series.id)}
                                                                          className="btn btn-link-dark mr-3" disabled={loading}  ><u>Add to watchlist</u></button>
                                                            }
                                                            <button onClick={(e) => remove(e, series.series.id)}
                                                                    className="btn btn-link-dark" disabled={loading}><u>Remove</u>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-lg-3">
                            <div className="card card-custom">
                                <div className="card-body">
                                    <h3 className="font-weight-bolder font-size-h2 mb-15">
                                        <span className="text-dark-75">Carts Summary ({carts.data.length})</span>
                                    </h3>
                                    <div className="d-flex mb-3">
                                        <span className="text-dark-50 flex-root font-weight-bold">Price</span>
                                        <span className="text-dark flex-root font-weight-bold text-right">Rp. {carts.cart_summary.price},-</span>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <span className="text-dark-50 flex-root font-weight-bold">Sale Discount</span>
                                        <span className="text-danger flex-root font-weight-bold text-right blink_me">- Rp. {carts.cart_summary.sale_discount},-</span>
                                    </div>
                                    <div className="separator separator-solid mb-5"/>
                                    <div className="d-flex mb-5">
                                        <span className="text-dark-50 flex-root font-weight-bold">Subtotal</span>
                                        <span className="text-primary flex-root font-weight-bolder text-right">Rp. {carts.cart_summary.subtotal_formatted},-</span>
                                    </div>
                                    <button className="btn btn-primary btn-block font-weight-bold mr-5">Select Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Carts.layout = (page) => <App children={page}/>
