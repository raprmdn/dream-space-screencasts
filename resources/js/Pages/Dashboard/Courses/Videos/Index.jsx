import React from 'react';
import App from "../../../../Layouts/App";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import SearchFilter from "../../../../Components/SearchFilter";
import SmallPagination from "../../../../Components/SmallPagination";
import Modal from "../../../../Components/Modal";
import FormVideos from "../../../../Components/Forms/FormVideos";
import Swal from "sweetalert2";

export default function Index(props) {
    const { data: videos, meta:{ links, from } } = props.videos
    const { series: seriesData } = usePage().props
    const { data, setData, post, put, delete: destroy, reset, errors, clearErrors, processing } = useForm({
        series: '',
        title: '',
        source: '',
        episode: '',
        runtime: '',
        description: '',
        is_free: false,
        is_archived: false
    });

    const updateHandler = (e) => {
        e.preventDefault()
        put(route('videos.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#updateVideoModal').modal('hide')
            }
        })
    }

    const deleteHandler = (video) => {
        Swal.fire({
            title: `Are you sure want to delete the "${video.title}" video?`,
            text: `Video not delete permanently. But User won't be able to watching the Video. Please be wise.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('videos.delete', video) , {
                    preserveScroll: true,
                    resetOnSuccess: false,
                })
            }
        })
    }

    const storeHandler = (e) => {
        e.preventDefault()
        post(route('videos.store'), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#addVideoModal').modal('hide')
            }
        })
    }


    return (
        <>
            <Head title="Dream Space | Videos"/>
            <Breadcrumb
                titleHeading="Videos"
                item1="Dashboard"
                item2="Courses"
                item3="Videos" linkItem3={route('videos.index')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Videos
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search videos . . ."}/>
                                <a href="#" className="btn btn-primary font-weight-bold ml-2"
                                   data-toggle="modal" data-target="#addVideoModal"
                                   onClick={() => {reset(); clearErrors();}}>
                                    <i className="flaticon2-plus icon-1x"/> Add Video
                                </a>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '5px'}}>#</th>
                                        <th style={{minWidth : '150px'}}>Title</th>
                                        <th style={{minWidth : '100px'}}>Series</th>
                                        <th style={{minWidth : '100px'}}>Source</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Runtime</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Episode</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Free</th>
                                        <th className="text-center" style={{minWidth : '70px'}}>Archived</th>
                                        <th style={{minWidth : '120px'}}>Created</th>
                                        <th className="pr-0 text-right" style={{minWidth: '100px'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        videos.length > 0 ?
                                            videos.map((video, index) => (
                                                <tr key={video.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{video.title}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            {video.series.title}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            <a href={`https://youtu.be/${video.source}`}
                                                               className="text-primary font-weight-bold mb-1"
                                                               target="_blank">
                                                                {video.source}
                                                            </a>
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">
                                                            {video.runtime.runtime_formatted}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold text-success">
                                                            {video.episode}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            {video.is_free ?
                                                                (<i className="flaticon2-check-mark text-success"/>)
                                                                :
                                                                (<i className="flaticon2-cancel text-danger"/>)
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            {video.is_archived ?
                                                                (<i className="flaticon2-check-mark text-success"/>)
                                                                :
                                                                (<i className="flaticon2-cancel text-danger"/>)
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{video.created_at}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <div className="btn-group">
                                                            <button onClick={() => {
                                                                        setData({
                                                                            ...video,
                                                                            runtime: video.runtime.runtime_unformatted,
                                                                            series: {value: video.series.id, label: video.series.title}
                                                                        });
                                                                        clearErrors();}
                                                                    }
                                                                    className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="modal" data-target="#updateVideoModal">
                                                                <i className="flaticon-settings-1 text-primary" />
                                                            </button>
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip" title="Delete"
                                                                    onClick={() => deleteHandler(video)}>
                                                                <i className="flaticon2-trash text-danger icon-1x" />
                                                            </button>
                                                            <button className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip" title="View">
                                                                <i className="fas fa-share text-muted" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={10} className="text-center p-7 font-weight-bolder">No records found in table</td>
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
            <Modal trigger={"addVideoModal"} title={"Add new Video"} size={"modal-lg"}>
                <FormVideos
                    {...{
                        seriesData,
                        data,
                        setData,
                        submitHandler:storeHandler,
                        errors,
                        processing,
                        submitLabel:"Submit"
                    }}
                />
            </Modal>
            <Modal trigger={"updateVideoModal"} title={`Update videos : ${data.title}`} size={"modal-lg"}>
                <FormVideos
                    {...{
                        seriesData,
                        data,
                        setData,
                        submitHandler:updateHandler,
                        errors,
                        processing,
                        submitLabel:"Update"
                    }}
                />
            </Modal>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
