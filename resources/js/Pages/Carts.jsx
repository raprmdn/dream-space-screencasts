import React, {useState} from 'react';
import App from "../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";
import SummaryLineItem from "../Components/SummaryLineItem";
import Modal from "../Components/Modal";

export default function Carts() {
    const { carts } = usePage().props
    const { data:payment_type } = usePage().props.payment_type
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
                                            <button className="btn btn-primary btn-block font-weight-bold mr-5 mt-8"
                                                    data-toggle="modal" data-target="#selectPayment">Select Payment</button>
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
            <Modal trigger={"selectPayment"} title={"Select Payment Method"} size={"modal-lg"}>
                <div className="card-body bg-gray-100">
                    <div className="accordion accordion-solid accordion-panel accordion-svg-toggle" id="paymentSelection">
                        {
                            payment_type.map((type) => (
                                <div key={type.id} className="card shadow shadow-sm">
                                    <div className="card-header" id="headingThree8">
                                        <div className="card-title collapsed" data-toggle="collapse" data-target={`#${type.identifier}`}>
                                            <div className="d-flex flex-column card-label">
                                                {type.payment_type}
                                                <small className="text-muted">{type.description}</small>
                                                {
                                                    type.status === 'Inactive' && (
                                                        <small className="text-danger">{type.payment_type} saat ini sedang tidak dapat digunakan, silahkan gunakan metode pembayaran yang lain.</small>
                                                    )
                                                }
                                            </div>
                                            <span className="svg-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24" />
                                                        <path d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z" fill="#000000" fillRule="nonzero" />
                                                        <path d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999) " />
                                                    </g>
                                              </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div id={`${type.identifier}`} className="collapse" data-parent="#paymentSelection">
                                        <div className="card-body">
                                            {
                                                type.payment_channels.map((channel) => (
                                                    <div key={channel.id}>
                                                        <div className={`d-flex align-items-center border border-1 rounded p-5 mb-4
                                                             ${type.status === 'Inactive' ? 'bg-gray-100' : channel.status === 'Inactive' ? 'bg-gray-100' : ''}` }>
                                                            <div className="symbol mr-6">
                                                                <LazyLoadImage
                                                                    effect="blur"
                                                                    height={23}
                                                                    src={channel.image}
                                                                    className="mw-100" />
                                                            </div>
                                                            <div className="d-flex flex-grow-1">
                                                                <div className="text-dark font-weight-bold">
                                                                    {channel.payment_channel}
                                                                </div>
                                                            </div>
                                                            {
                                                                type.status === 'Active'
                                                                ?
                                                                    channel.status === 'Active'
                                                                    ?
                                                                        <>
                                                                            <label className="radio">
                                                                                <input type="radio" id="payment_channel"
                                                                                       name="payment_channel" value={channel.identifier_code}/>
                                                                                <span />
                                                                            </label>
                                                                        </>
                                                                    :
                                                                        <>
                                                                            <i className="fas fa-lock"/>
                                                                        </>
                                                                :
                                                                    <>
                                                                        <i className="fas fa-lock"/>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

Carts.layout = (page) => <App children={page}/>
