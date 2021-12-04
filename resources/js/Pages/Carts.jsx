import React from 'react';
import App from "../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";

export default function Carts() {
    const { carts } = usePage().props.auth
    const remove = (e, series) => {
        e.preventDefault()
        Inertia.post(route('remove.carts'),{
            series_id: series,
        }, {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Dream Space - Carts"/>
            <Breadcrumb
                titleHeading="Carts"
                item1="Profile"
                item2="Carts" linkItem2={route('carts')}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="flex-row-fluid">
                        <div className="card card-custom gutter-b">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label font-weight-bolder font-size-h3 text-dark">My Cart</span>
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Series</th>
                                            <th className="text-center">Qty</th>
                                            <th className="text-right">Price</th>
                                            <th />
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            carts.data.map((series) => (
                                                <tr key={series.series.id}>
                                                    <td className="d-flex align-items-center font-weight-bolder">
                                                        <div className="symbol symbol-60 flex-shrink-0 mr-4">
                                                            <div className="symbol-label">
                                                                <LazyLoadImage
                                                                    effect="blur"
                                                                    src={series.series.series_thumbnail}
                                                                    width={60}
                                                                    height={60}
                                                                    alt={series.series.slug} className="rounded-sm"/>
                                                            </div>
                                                        </div>
                                                        <Link href={route('series.show', series.series.slug)} className="text-dark text-hover-primary">{series.series.title} &nbsp;</Link>
                                                        {
                                                            series.series.is_discount && (<div className="label label-danger label-inline font-weight-bold">Discount</div>)
                                                        }
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <span className="mr-2 font-weight-bolder">1</span>
                                                    </td>
                                                    <td className="text-right align-middle font-weight-bolder font-size-h5">Rp. {series.price.price_formatted},-</td>
                                                    <td className="text-right align-middle">
                                                        <button onClick={(e) => remove(e, series.series.id)} type="button" className="btn btn-danger font-weight-bolder font-size-sm">Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan={2} />
                                            <td className="font-weight-bolder font-size-h4 text-right">Total</td>
                                            <td className="font-weight-bolder font-size-h4 text-right">Rp. {carts.total_price.price_formatted},-</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} className="border-0 text-right pt-10">
                                                <a href="#" className="btn btn-success font-weight-bolder px-8">Proceed to Checkout</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
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
