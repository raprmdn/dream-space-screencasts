import React, {useState} from 'react';
import App from "../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../Components/Breadcrumb";
import VANumberLineItem from "../Components/VANumberLineItem";
import InvoiceDetailLineItem from "../Components/InvoiceDetailLineItem";
import InvoiceSeriesItems from "../Components/InvoiceSeriesItems";
import Modal from "../Components/Modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Invoice() {
    const { data:invoice } = usePage().props.invoice
    const [ status ] = useState(invoice.status === 'PENDING')
    const [ qr_code ] = useState(invoice.qr_code.url ?? null)

    const _copy = (number) => {
        navigator.clipboard.writeText(number)
    }

    return (
        <>
            <Head title={`Dream Space - Invoice #${invoice.invoice_number}`}/>
            <Breadcrumb
                titleHeading={`Invoice #${invoice.invoice_number}`}
                item1="Profile"
                item2="Invoice"
                item3={`#${invoice.invoice_number}`}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="card shadow-lg">
                        <div className="card-body p-lg-20">
                            <div className="d-flex flex-column flex-xl-row">
                                <div className="flex-lg-row-fluid mr-xl-18 mb-10 mb-xl-10">
                                    <div className="mt-n1">
                                        <div className="d-flex justify-content-between align-center pb-10">
                                            <div className="d-flex row">
                                                <div className="ml-5 mr-2">
                                                    <img alt="Logo" src="/assets/media/startup.png" width={25} height={25} />
                                                </div>
                                                <h2 className="font-weight-boldest text-dark-75">
                                                    Dream Space
                                                </h2>
                                            </div>
                                            {
                                                status && (
                                                    <Link href={route('invoice.show', invoice.identifier_url)} className="btn btn-sm btn-outline-dark">
                                                        <i className="flaticon-refresh icon-lg"/>
                                                        Refresh Invoice
                                                    </Link>
                                                )
                                            }
                                        </div>
                                        <div className="m-0">
                                            <div className="d-flex row justify-content-between align-center">
                                                <div className="col-md-12">
                                                    <div className="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row">
                                                        <div className="font-weight-bolder font-size-h3 text-dark-65 mb-8">Invoice #{invoice.invoice_number}</div>
                                                        <div className="d-xl-flex flex-column align-items-end">
                                                            <div className="font-weight-bold text-dark-50 mb-1">
                                                                Transaction Date:
                                                            </div>
                                                            <div className="font-weight-bolder text-dark-75 font-size-h6">
                                                                {invoice.order_date}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="table-responsive mb-9">
                                                    <InvoiceSeriesItems invoice={invoice} />
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="font-weight-bold mr-10 text-dark-50 align-text-top">Total</div>
                                                        <h2 className="font-weight-boldest text-dark-75">Rp. {invoice.total.total_formatted},-</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-0">
                                    <div className="border-light-dark card-rounded h-lg-100 min-w-md-350px bg-light-o-100 p-9"
                                         style={{border: '1px dashed #2b3e5a'}}>
                                        <div className="mb-8">
                                            <div className={`label label-inline label-rounded ${invoice.status === 'SUCCESS' ? 'label-success' : 'label-danger'} font-weight-bold`}>
                                                {invoice.status}
                                            </div>
                                        </div>
                                        <h6 className="mb-8 font-weight-boldest text-dark-50 text-hover-dark">
                                            INVOICE TO
                                        </h6>
                                        <div className="mb-6">
                                            <InvoiceDetailLineItem
                                                label={'Name'}
                                                text={invoice.invoice_to.name_user_order}
                                            />
                                        </div>
                                        <div className="mb-15">
                                            <InvoiceDetailLineItem
                                                label={'Email'}
                                                text={invoice.invoice_to.email_user_order}
                                            />
                                        </div>
                                        <h6 className="mb-8 font-weight-boldest text-dark-50 text-hover-dark">
                                            PAYMENT DETAILS
                                        </h6>
                                        <div className="mb-6">
                                            <InvoiceDetailLineItem
                                                label={'Payment Method'}
                                                text={invoice.payment_channel}
                                            />
                                        </div>
                                        {
                                            invoice.virtual_number && (
                                                <VANumberLineItem onClick={() => _copy(invoice.virtual_number)}
                                                                  label={'Virtual Account Number'}
                                                                  number={invoice.virtual_number} />
                                            )
                                        }
                                        {
                                            invoice.bill_key && (
                                                <VANumberLineItem onClick={() => _copy(invoice.bill_key)}
                                                                  label={'Bill Key'}
                                                                  number={invoice.bill_key} />
                                            )
                                        }
                                        {
                                            invoice.biller_code && (
                                                <VANumberLineItem onClick={() => _copy(invoice.biller_code)}
                                                                  label={'Biller Code'}
                                                                  number={invoice.biller_code} />
                                            )
                                        }
                                        {
                                            invoice.permata_va && (
                                                <VANumberLineItem onClick={() => _copy(invoice.permata_va)}
                                                                  label={'Permata Virtual Account'}
                                                                  number={invoice.permata_va} />
                                            )
                                        }
                                        {
                                            invoice.payment_code && (
                                                <VANumberLineItem onClick={() => _copy(invoice.payment_code)}
                                                                  label={'Payment Code'}
                                                                  number={invoice.payment_code} />
                                            )
                                        }
                                        {
                                            qr_code && (
                                                <>
                                                    <div className="mb-6">
                                                        <div className="text-dark-50">QR Code</div>
                                                        <button className="btn btn-sm btn-primary mt-1"
                                                                data-toggle="modal" data-target="#qrCode">
                                                            <i className="la la-qrcode icon-lg" />
                                                            Show QR Code
                                                        </button>
                                                    </div>
                                                    <Modal trigger={"qrCode"} title={"QR Code"}>
                                                        <LazyLoadImage
                                                            effect="blur"
                                                            src={qr_code}
                                                            className="w-100" />
                                                    </Modal>
                                                </>
                                            )
                                        }
                                        <div className="mb-6">
                                            <InvoiceDetailLineItem
                                                label={'Nominal Order'}
                                                text={invoice.total.total_formatted}
                                            />
                                        </div>
                                        {
                                            status && (
                                                <div className="mb-6">
                                                    <div className="text-dark-50">Payment Instruction</div>
                                                    <p className="font-weight-bold mt-2 text-dark" align="justify" style={{whiteSpace: 'pre-line'}}>
                                                        {invoice.instruction}
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Invoice.layout = (page) => <App children={page}/>
