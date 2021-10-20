import React, {useState} from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import FormSeries from "../../../../Components/Forms/FormSeries";

export default function Edit() {
    const { series, topics: topicsData } = usePage().props
    const [ preview, setPreview ] = useState(series.id ? `/storage/${series.thumbnail}` : null)
    const { data, setData, post, errors, processing } = useForm({
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
        thumbnail: series.thumbnail || '',
        is_discount: series.is_discount || false,
        is_free: series.is_free || false,
        archived_at: series.archived_at || false
    });
    const changeHandler = (e) => {
        let value
        if (e.target.id === 'thumbnail') {
            value = e.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(value)
        } else {
            value = e.target.checked
        }
        setData({
            ...data,
            [e.target.id]: value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        data._method = 'put'
        post(route('series.update', series), {
            preserveScroll: true,
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
                                changeHandler,
                                submitLabel:"Submit",
                                submitHandler,
                                processing,
                                preview
                            }
                        }/>
                    </div>
                </div>
            </div>
        </>
    )
}

Edit.layout = (page) => <App children={page}/>
