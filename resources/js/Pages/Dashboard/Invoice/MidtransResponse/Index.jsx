import React, {useState} from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import SearchFilter from "../../../../Components/SearchFilter";
import SmallPagination from "../../../../Components/SmallPagination";
import Modal from "../../../../Components/Modal";
import MidtransResponseLineItem from "../../../../Components/MidtransResponseLineItem";

export default function Index() {
    const { data, meta:{links, from} } = usePage().props.midtrans_response
    const [ response, setResponse ] = useState()
    console.log(response)

    return (
        <>
            <Head title={'Dream Space - Payment Midtrans Response'}/>
            <Breadcrumb
                titleHeading={'Payment Midtrans Response'}
                item1="List Orders"
                item2="Payment Midtrans Response" linkItem2={route('midtrans-response')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-bottom py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Payment Midtrans Response
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search order id . . ."}/>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{width: '250px', minWidth: '250px'}}>Order ID</th>
                                        <th style={{width: '250px', minWidth: '250px'}}>Transaction ID</th>
                                        <th style={{minWidth: '50px'}} className="text-center">Payment Type</th>
                                        <th style={{minWidth: '50px'}} className="text-center">Status Code</th>
                                        <th style={{minWidth: '50px'}} className="text-center">Gross Amount</th>
                                        <th className="pr-0 text-right" style={{width: '20px'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        data.length > 0 ?
                                            data.map((item, index) => (
                                                <tr key={item.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{item.order_id}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{item.transaction_id}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="font-weight-bold">{item.payment_type}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="font-weight-bold">{item.status_code}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">Rp. {item.gross_amount.formatted},-</span>
                                                    </td>
                                                    <td className="pr-0 text-center">
                                                        <div className="btn-group">
                                                            <button onClick={() => setResponse(item)} className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="modal" data-target="#showMidtransResponse">
                                                                <i className="far fa-eye text-muted" />
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
            {
                response && (
                    <Modal trigger={"showMidtransResponse"} title={`Show midtrans response for invoice #${response.order_id}`} size={"modal-lg"}>
                        <div className="card card-custom gutter-b">
                            <div className="card-body">
                                <div className="row">
                                    <MidtransResponseLineItem label="Order ID" value={response.order_id}/>
                                    <MidtransResponseLineItem label="Bank" value={response.bank}/>
                                    <MidtransResponseLineItem label="VA Number" value={response.va_number}/>
                                    <MidtransResponseLineItem label="Payment Type" value={response.payment_type}/>
                                    <MidtransResponseLineItem label="Store" value={response.store}/>
                                    <MidtransResponseLineItem label="Permata VA Number" value={response.permata_va_number}/>
                                    <MidtransResponseLineItem label="Status Code" value={response.status_code}/>
                                    <MidtransResponseLineItem label="Status Message" value={response.status_message}/>
                                    <MidtransResponseLineItem label="Transaction ID" value={response.transaction_id}/>
                                    <MidtransResponseLineItem label="Merchant ID" value={response.merchant_id}/>
                                    <MidtransResponseLineItem label="Gross Amount" value={response.gross_amount.formatted}/>
                                    <MidtransResponseLineItem label="Currency" value={response.currency}/>
                                    <MidtransResponseLineItem label="Transaction Time" value={response.transaction_time}/>
                                    <MidtransResponseLineItem label="Trasanction Status" value={response.transaction_status}/>
                                    <MidtransResponseLineItem label="Fraud Status" value={response.fraud_status}/>
                                    <MidtransResponseLineItem label="Bill Key" value={response.bill_key}/>
                                    <MidtransResponseLineItem label="Biller Code" value={response.biller_code}/>
                                    <MidtransResponseLineItem label="Payment Code" value={response.payment_code}/>
                                    <MidtransResponseLineItem label="Signature Key" value={response.signature_key}/>
                                    <MidtransResponseLineItem label="Acquirer" value={response.acquirer}/>
                                    <MidtransResponseLineItem label="Settlement Time" value={response.settlement_time}/>
                                    <MidtransResponseLineItem label="Approval Code" value={response.approval_code}/>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

Index.layout = (page) => <App children={page}/>
