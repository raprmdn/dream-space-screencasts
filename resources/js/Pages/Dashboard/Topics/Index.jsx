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
    const { data: topics, meta: {links, from, per_page} } = usePage().props.topics
    const { data, setData, post, delete: destroy, errors, reset, clearErrors , processing } = useForm({
        name: '',
        description: '',
        position: '',
        picture: '',
        is_archived: false,
    });
    const [ preview, setPreview ] = useState(null)
    const changeHandler = (e) => {
        let value
        if (e.target.id === 'picture') {
            value = e.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(value)
        } else if (e.target.id === 'is_archived') {
            value = e.target.checked
        } else {
            value = e.target.value
        }
        setData({
            ...data,
            [e.target.id]: value,
        })
    }
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
            <Head title="Dream Space | Topics">
                <script>var picture1 = new KTImageInput('topic_picture')</script>
            </Head>
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
                                <a href="#" className="btn btn-light-primary font-weight-bolder font-size-sm ml-3"
                                   data-toggle="modal" data-target="#addTopicModal" onClick={() => {reset(); setPreview(null); clearErrors()}}>
                                    Add Topic
                                </a>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{minWidth: '120px'}}>Name</th>
                                        <th style={{minWidth: '100px'}}>Slug</th>
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
                                                        <div className="font-weight-bold">{topic.description.substring(0, 50)}...</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">30</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`label label-${topic.is_archived ? 'danger' : 'success'} label-pill label-inline mr-2`}>{topic.is_archived ? 'Archived' : 'Public'}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">{topic.position}</span>
                                                    </td>
                                                    <td className="pr-0 text-center">
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="modal" data-target="#updateTopicModal"
                                                                    onClick={() => {setData(topic); setPreview(topic.picture); clearErrors();}}>
                                                                <i className="la la-edit text-primary" />
                                                            </button>
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip" title="Delete"
                                                                    onClick={() => deleteHandler(topic)}>
                                                                <i className="la la-trash text-danger" />
                                                            </button>
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip" title="View">
                                                                <i className="la flaticon-eye text-muted" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={7} className="text-center p-7 font-weight-bolder">No records found in table</td>
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
                        data,
                        errors,
                        submitLabel:"Submit",
                        changeHandler,
                        processing,
                        preview
                    }}
                />
            </Modal>
            <Modal trigger={"updateTopicModal"} title={`Update Topic : ${data.name}`}>
                <FormTopic
                    {...{
                        submitHandler:updateHandler,
                        data,
                        errors,
                        submitLabel:"Update",
                        changeHandler,
                        processing,
                        preview
                    }}
                />
            </Modal>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
