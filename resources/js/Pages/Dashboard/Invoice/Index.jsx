import React from 'react';
import App from "../../../Layouts/App";
import {Head, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";

export default function Index() {
    const { data: orders, meta:{links, from} } = usePage().props.orders

    return (
        <>
            <Head title={'Dream Space - List Orders'}/>
            <Breadcrumb
                titleHeading={'Orders'}
                item1="List Orders"
                item2="Orders" linkItem2={route('orders.list')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-bottom py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                List Orders
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search invoice number . . ."}/>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{width: '250px', minWidth: '150px'}}>Invoice</th>
                                        <th style={{width: '250px', minWidth: '150px'}}>Email</th>
                                        <th style={{minWidth: '100px'}} className="text-center">Payment Method</th>
                                        <th style={{minWidth: '100px'}} className="text-center">Gross Amount</th>
                                        <th style={{minWidth: '100px'}} className="text-center">Status</th>
                                        <th style={{minWidth: '100px'}} className="text-center">Transaction Date</th>
                                        <th className="pr-0 text-right" style={{width: '20px'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        orders.length > 0 ?
                                            orders.map((order, index) => (
                                                <tr key={order.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{order.invoice_number}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{order.invoice_to.email_user_order}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="font-weight-bold">{order.payment_channel}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">Rp. {order.total.total_formatted},-</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className={`label label-inline label-rounded ${order.status === 'SUCCESS' ? 'label-success' : 'label-danger'} font-weight-bold`}>
                                                            {order.status}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">{order.order_date}</span>
                                                    </td>
                                                    <td className="pr-0 text-center">
                                                        <div className="btn-group">
                                                            <a href={route('invoice.show', order.identifier_url)} className="btn btn-sm btn-clean btn-icon" target="_blank">
                                                                <i className="far fa-eye text-muted" />
                                                            </a>
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

Index.layout = (page) => <App children={page}/>
