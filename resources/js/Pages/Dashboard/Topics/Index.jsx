import React, {useState} from 'react';
import App from "../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";
import Modal from "../../../Components/Modal";
import FormTopic from "../../../Components/Forms/FormTopic";
import Swal from "sweetalert2";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Index() {
    const { auth } = usePage().props
    const { data: topics, meta: {links, from} } = usePage().props.topics
    const [ preview, setPreview ] = useState(null)

    const { data, setData, post, delete: destroy, errors, reset, clearErrors , processing } = useForm({
        name: '',
        description: '',
        position: '',
        picture: '',
        is_archived: false,
    });

    const updateHandler = (e) => {
        e.preventDefault()
        data._method = 'put'
        post(route('topic.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                window.$('#updateTopicModal').modal('hide')
            }
        })
    }

    const storeHandler = (e) => {
        e.preventDefault()
        post(route('topics.store'), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#addTopicModal').modal('hide')
            },
        })
    }

    const deleteHandler = (topic) => {
        Swal.fire({
            title: `Are you sure want to delete the "${topic.name}" topic?`,
            text: 'By deleting the topic, you might break the system topics functionality.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('topic.delete', topic) , {
                    preserveScroll: true,
                    resetOnSuccess: false,
                })
            }
        })
    }

    return (
        <>
            <Head title="Dream Space | Topics"/>
            <Breadcrumb
                titleHeading="Topics"
                item1="Dashboard"
                item2="Topics" linkItem2={route('topics.index')} />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Topics
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search topics . . ."}/>
                                <a href="#" className="btn btn-primary font-weight-bold font-size-sm ml-3"
                                   data-toggle="modal" data-target="#addTopicModal" onClick={() => {reset(); setPreview(null); clearErrors()}}>
                                    <i className="flaticon2-plus icon-1x"/> Add Topic
                                </a>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{minWidth: '150px'}}>Name</th>
                                        <th style={{minWidth: '120px'}}>Slug</th>
                                        <th style={{minWidth: '150px'}}>Description</th>
                                        <th style={{width: '70px'}} className="text-center">Series</th>
                                        <th style={{width: '100px', minWidth: '50px'}}>Archived</th>
                                        <th style={{width: '50px', minWidth: '50px'}}>Position</th>
                                        <th className="pr-0 text-right" style={{width: '20px'}}>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        topics.length > 0 ?
                                            topics.map((topic, index) => (
                                                <tr key={topic.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td className="pl-0">
                                                        <div className="d-flex align-items-center">
                                                            <div className="symbol symbol-50 overflow-hidden mr-3">
                                                                <div className="symbol-label">
                                                                    <LazyLoadImage
                                                                        effect="blur"
                                                                        src={topic.picture}
                                                                        width={50}
                                                                        height={50}
                                                                        alt={topic.slug}
                                                                        className="w-100" />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                <a href="" className="text-dark-75 font-weight-bold text-hover-primary">{topic.name}</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{topic.slug}</span>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold">{topic.description.substring(0, 50)}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">{topic.series_count}</span>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            <i className={topic.is_archived ?
                                                                'flaticon2-check-mark text-success icon-1x'
                                                                :
                                                                'flaticon2-cancel text-danger icon-1x'}/>
                                                        </div>
                                                    </td>
                                                    <td className="text-center font-weight-bold">
                                                        <span className="label label-rounded label-dark">{topic.position}</span>
                                                    </td>
                                                    <td className="pr-0 text-center">
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="modal" data-target="#updateTopicModal"
                                                                    onClick={() => {setData(topic); setPreview(topic.picture); clearErrors();}}>
                                                                <i className="flaticon-edit text-success icon-1x" />
                                                            </button>
                                                            {
                                                                auth.can.includes('delete topics') &&
                                                                (
                                                                    <button className="btn btn-sm btn-clean btn-icon"
                                                                            data-toggle="tooltip" title="Delete"
                                                                            onClick={() => deleteHandler(topic)}>
                                                                        <i className="flaticon2-trash text-danger icon-1x" />
                                                                    </button>
                                                                )
                                                            }
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip" title="View">
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
            <Modal trigger={"addTopicModal"} title={"Add new topic"}>
                <FormTopic
                    {...{
                        submitHandler:storeHandler,
                        setData,
                        data,
                        errors,
                        submitLabel:"Submit",
                        processing,
                        auth,
                        preview,
                        setPreview
                    }}
                />
            </Modal>
            <Modal trigger={"updateTopicModal"} title={`Update Topic : ${data.name}`}>
                <FormTopic
                    {...{
                        submitHandler:updateHandler,
                        setData,
                        data,
                        errors,
                        submitLabel:"Update",
                        processing,
                        auth,
                        preview,
                        setPreview
                    }}
                />
            </Modal>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
