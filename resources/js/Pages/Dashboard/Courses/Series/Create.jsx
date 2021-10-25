import React from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import FormSeries from "../../../../Components/Forms/FormSeries";

export default function Create() {
    const { topics: topicsData } = usePage().props
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        topics: [],
        description: '',
        price: '',
        discount_price: '',
        levels: '',
        status: '',
        episodes: '',
        preview_series: '',
        source_code: '',
        project_demo: '',
        thumbnail: '',
        is_discount: false,
        is_free: false,
        archived_at: false
    })

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('series.store'), {
            onStart: () => {
                KTApp.block('#block_ui_form', {
                    overlayColor: '#000000',
                    state: 'danger',
                    message: 'Please wait...'
                })
            },
            onFinish: () => {
                KTApp.unblock('#block_ui_form')
            }
        })
    }

    return (
        <>
            <Head title="Dream Space | Create Series"/>
            <Breadcrumb
                titleHeading="Series"
                item1="Dashboard"
                item2="Courses"
                item3="Series" linkItem3={route('series.index')}
                item4="Create"
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Create Series
                            </h3>
                            <div className="card-toolbar">
                                <Link href={route('series.index')} className="btn btn-primary font-weight-bold">
                                    <i className="flaticon2-left-arrow-1 icon-1x"/> Back
                                </Link>
                            </div>
                        </div>
                        <FormSeries {...
                            {
                                topicsData,
                                data,
                                setData,
                                errors,
                                submitLabel:"Submit",
                                submitHandler,
                                processing
                            }
                        }/>
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = (page) => <App children={page}/>
