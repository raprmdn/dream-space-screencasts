import React, {useState} from 'react';
import App from "../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";
import SummaryLineItem from "../Components/SummaryLineItem";

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
                    {
                        carts.data.length > 0
                        ?
                            <div className="row">
                                <div className="col-lg-9">
                                    {
                                        carts.data.map((series) => (
                                            <div key={series.id} className="card card-custom gutter-b shadow">
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
                                    <div className="card card-custom shadow">
                                        <div className="card-body">
                                            <h3 className="font-weight-bolder font-size-h2 mb-10">
                                                <span className="text-dark-75">Carts Summary ({carts.data.length})</span>
                                            </h3>
                                            <SummaryLineItem label={'Price'} textType={'text-dark'}
                                                             labelPrice={`Rp. ${carts.cart_summary.price},-`} />
                                            <SummaryLineItem label={'Sale Discount'} textType={'text-danger'}
                                                             blinked={true} labelPrice={`- Rp. ${carts.cart_summary.sale_discount},-`} />
                                            <div className="separator separator-solid mb-5"/>
                                            <SummaryLineItem label={'Subtotal'} textType={'text-primary'}
                                                             labelPrice={`Rp. ${carts.cart_summary.subtotal_formatted},-`} />
                                            <button className="btn btn-primary btn-block font-weight-bold mr-5 mt-8">Select Payment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="card card-custom gutter-b shadow">
                                <div className="card-body p-0">
                                    <div className="text-center pt-20">
                                        <h3 className="font-weight-bolder mb-5">
                                            Your cart is empty.
                                        </h3>
                                        <Link href={route('series')} className="font-size-lg text-muted font-weight-bold mb-5">
                                            <u>Shop for Series</u>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <img src="/assets/media/svg/illustrations/login-visual-3.svg" alt="Cart Empty"
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

Carts.layout = (page) => <App children={page}/>
