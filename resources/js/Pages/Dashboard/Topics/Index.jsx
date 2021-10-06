import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";
import Modal from "../../../Components/Modal";
import FormTopic from "../../../Components/Forms/FormTopic";

export default function Index() {
    const { data: topics, meta: {links, from} } = usePage().props.topics
    const { data, setData, post, put, errors, reset, processing } = useForm({
        name: '',
        description: '',
        position: '',
        picture: '',
        is_archived: false
    });
    const changeHandler = (e) => {
        let value
        if (e.target.id === 'picture') {
            value = e.target.files[0]
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
    const storeHandler = (e) => {
        e.preventDefault()
        post(route('topics.store'), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#modalTopics').modal('hide')
            },
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
                                   data-toggle="modal" data-target="#modalTopics">
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
                                                                    <img src={topic.picture} width={50} height={50} alt={topic.slug} className="w-100" />
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
                                                            className={`label label-${topic.archived ? 'danger' : 'success'} label-pill label-inline mr-2`}>{topic.archived ? 'Archived' : 'Public'}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">{topic.position}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <div className="btn-group">
                                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                                            <div className="dropdown-menu" >
                                                                <Link className="dropdown-item" href="#">View</Link>
                                                                {/*<Link as="button" className="dropdown-item">Remove Role</Link>*/}
                                                            </div>
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
            <Modal trigger={"modalTopics"} title={"Add new topic"}>
                <FormTopic
                    {...{
                        submitHandler:storeHandler,
                        data,
                        errors,
                        submitLabel:"Submit",
                        changeHandler,
                        processing }}
                />
            </Modal>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
