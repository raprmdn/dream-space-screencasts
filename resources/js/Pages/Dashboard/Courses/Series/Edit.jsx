import React from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import FormSeries from "../../../../Components/Forms/FormSeries";
import Swal from "sweetalert2";

export default function Edit() {
    const { series, topics: topicsData } = usePage().props
    const { data, setData, post, delete: destroy, errors, processing } = useForm({
        title: series.title || '',
        topics: series.topics.map(topic => ({value: topic.id, label: topic.name})) || [],
        description: series.description || '',
        price: series.price || '',
        discount_price: series.discount_price || '',
        levels: series.levels || '',
        status: series.status || '',
        episodes: series.episodes || '',
        preview_series: series.preview_series || '',
        source_code: series.source_code || '',
        project_demo: series.project_demo || '',
        thumbnail: series.series_thumbnail || '',
        is_discount: series.is_discount || false,
        is_free: series.is_free || false,
        archived_at: series.archived_at || false
    });

    const deleteHandler = (series) => {
        Swal.fire({
            title: `Are you sure want to delete the "${series.title}" series?`,
            text: `Series not delete permanently. But User won't be able to watch the Series. Please be wise.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('series.delete', series))
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        data._method = 'put'
        post(route('series.update', series), {
            preserveScroll: true,
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
                                <button className="btn btn-danger font-weight-bold mr-3"
                                        onClick={() => deleteHandler(series)}>
                                    <i className="flaticon2-rubbish-bin-delete-button icon-1x icon-1x" /> Delete
                                </button>
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

Edit.layout = (page) => <App children={page}/>
