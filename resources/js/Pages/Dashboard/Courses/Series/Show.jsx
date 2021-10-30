import React from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";

export default function Show() {
    const { data: series } = usePage().props.series
    console.log(series.videos)
    return (
        <>
            <Head title={`Dream Space - ${series.title}`}/>
            <Breadcrumb
                titleHeading="Series"
                item1="Dashboard"
                item2="Courses"
                item3="Series" linkItem3={route('series.index')}
                item4={series.title}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                {series.title}
                            </h3>
                            <div className="card-toolbar">
                                <Link href={route('series.index')} className="btn btn-primary font-weight-bold">
                                    <i className="flaticon2-left-arrow-1 icon-1x"/> Back
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center mb-10">
                                <LazyLoadImage
                                    effect="blur"
                                    src={series.thumbnail}
                                    className="rounded-lg mw-100"/>
                            </div>
                            <div className="my-5">
                                <h1 className="font-weight-boldest text-dark">{series.title}</h1>
                                <div className="d-flex font-weight-bold">
                                    {series.topics.map((topic) => (
                                        <span key={topic.id} className="label label-light-dark label-inline mr-2">{topic.name}</span>
                                    ))}
                                    <span className="ml-1"> - {series.created_at}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="text-dark-50 m-0 pt-5 font-weight-normal">
                                <p align="justify" style={{whiteSpace: 'pre-line'}}>
                                    {series.description}
                                </p>
                            </div>
                            <hr/>
                            <div className="w-auto w-lg-auto w-xxl-600px">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Slug</td>
                                            <td className="font-weight-bold text-dark">{series.slug}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Price</td>
                                            <td className="font-weight-bold text-dark">{series.price.price_unformatted ? `Rp. ${series.price.price_formatted},-` : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Discount Price</td>
                                            <td className="font-weight-bold text-dark">{series.discount.discount_unformatted ? `Rp. ${series.discount.discount_formatted},-` : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Episode</td>
                                            <td className="font-weight-bold text-dark">{series.episodes}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Levels</td>
                                            <td className="font-weight-bold text-dark">{series.levels}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Status</td>
                                            <td className="font-weight-bold text-dark">{series.status}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Series Preview</td>
                                            <td className="font-weight-bold text-dark">
                                                <a href={`https://youtu.be/${series.preview_url}`} target="_blank">{series.preview_url ? series.preview_url : '-'}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Source Code</td>
                                            <td className="font-weight-bold text-dark">
                                                <a href={series.source_code_url} target="_blank">{series.source_code_url ? series.source_code_url : '-'}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Project Demo</td>
                                            <td className="font-weight-bold text-dark">{series.demo_url ? series.demo_url : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Is Discount</td>
                                            <td className="font-weight-bold text-dark">
                                                {series.is_discount ?
                                                    (<i className="flaticon2-check-mark text-success"/>)
                                                    :
                                                    (<i className="flaticon2-cancel text-danger"/>)
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Free Series</td>
                                            <td className="font-weight-bold text-dark">
                                                {series.is_free ?
                                                    (<i className="flaticon2-check-mark text-success"/>)
                                                    :
                                                    (<i className="flaticon2-cancel text-danger"/>)
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Archived at</td>
                                            <td className="font-weight-bold text-dark">{series.archived_at ? series.archived_at : '-'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
