import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";

export default function SeriesTrashed(props) {
    const { data: series, meta:{ links, from } } = props.series

    const deleteHandler = (series) => {

    }
    return (
        <>
            <Head title="Dream Space | Trashed"/>
            <Breadcrumb
                titleHeading="Trash Series"
                item1="Dashboard"
                item2="Trash"
                item3="Series" linkItem3={route('trash.series_index')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Series
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search series . . ."}/>
                                <Link href={route('series.create')} className="btn btn-primary font-weight-bold ml-2">
                                    <i className="flaticon2-plus icon-1x"/> Add Series
                                </Link>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '5px'}}>#</th>
                                        <th style={{minWidth : '150px'}}>Title</th>
                                        <th style={{minWidth : '100px'}}>Price</th>
                                        <th style={{minWidth : '100px'}}>Discount Price</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Videos</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Paid Series</th>
                                        <th style={{minWidth : '100px'}}>Created</th>
                                        <th className="pr-0 text-right" style={{minWidth: '100px'}}>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        series.length > 0 ?
                                            series.map((series, index) => (
                                                <tr key={series.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{series.title}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            {series.price ? `Rp. ${series.price_formatter},-` : '-'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            {series.discount ? `Rp. ${series.discount_formatter},-` : '-'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            <span className="label label-rounded label-dark">15</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            {series.is_free ?
                                                                (<i className="flaticon2-cancel text-danger"/>)
                                                                :
                                                                (<i className="flaticon2-check-mark text-success"/>)
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{series.created_at}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <div className="btn-group">
                                                            <Link preserveScroll={true}
                                                                  as="button"
                                                                  method="post"
                                                                  href={route('trash.series_restore', series)}
                                                                  className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Restore">
                                                                <i className="la la-redo-alt text-success" />
                                                            </Link>
                                                            <button onClick={() => deleteHandler(series)} className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Delete permanent">
                                                                <i className="la la-trash text-danger" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={8} className="text-center p-7 font-weight-bolder">No records found in table</td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <SmallPagination links={links}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

SeriesTrashed.layout = (page) => <App children={page}/>
