import React from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Modal from "../../../../Components/Modal";
import FormVideos from "../../../../Components/Forms/FormVideos";

export default function Show() {
    const { data: series } = usePage().props.series
    const { data, setData, post, put, delete: destroy, reset, errors, clearErrors, processing } = useForm({
        series: {value: series.id},
        title: '',
        source: '',
        episode: '',
        runtime: '',
        is_free: false,
        is_archived: false
    });

    const storeHandler = (e) => {
        e.preventDefault();
        post(route('series.add_videos_store', series.slug), {
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
                        <div className="card-body">
                            <div>
                                <div className="row justify-content-center mb-10">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={series.thumbnail}
                                        className="rounded-lg mw-100"/>
                                </div>
                                <div className="my-5">
                                    <h1 className="font-weight-boldest text-dark">{series.title}</h1>
                                    <div className="d-flex font-weight-bold">
                                        {series.topics.map((topic) => (
                                            <span key={topic.id} className="label label-light-dark label-inline mr-2">{topic.name}</span>
                                        ))}
                                        <span className="ml-1"> - {series.created_at}</span>
                                    </div>
                                </div>
                                <hr/>
                                <div className="text-dark-50 m-0 pt-5 font-weight-normal">
                                    <p align="justify" style={{whiteSpace: 'pre-line'}}>
                                        {series.description}
                                    </p>
                                </div>
                                <hr/>
                                <div className="w-auto w-lg-auto w-xxl-600px">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Slug</td>
                                            <td className="font-weight-bold text-dark">{series.slug}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Price</td>
                                            <td className="font-weight-bold text-dark">{series.price.price_unformatted ? `Rp. ${series.price.price_formatted},-` : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Discount Price</td>
                                            <td className="font-weight-bold text-dark">{series.discount.discount_unformatted ? `Rp. ${series.discount.discount_formatted},-` : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Episode</td>
                                            <td className="font-weight-bold text-dark">{series.episodes}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Levels</td>
                                            <td className="font-weight-bold text-dark">{series.levels}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Status</td>
                                            <td className="font-weight-bold text-dark">{series.status}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Series Preview</td>
                                            <td className="font-weight-bold text-dark">
                                                <a href={`https://youtu.be/${series.preview_url}`} target="_blank">{series.preview_url ? series.preview_url : '-'}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Source Code</td>
                                            <td className="font-weight-bold text-dark">
                                                <a href={series.source_code_url} target="_blank">{series.source_code_url ? series.source_code_url : '-'}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Project Demo</td>
                                            <td className="font-weight-bold text-dark">{series.demo_url ? series.demo_url : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Is Discount</td>
                                            <td className="font-weight-bold text-dark">
                                                {series.is_discount ?
                                                    (<i className="flaticon2-check-mark text-success"/>)
                                                    :
                                                    (<i className="flaticon2-cancel text-danger"/>)
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Free Series</td>
                                            <td className="font-weight-bold text-dark">
                                                {series.is_free ?
                                                    (<i className="flaticon2-check-mark text-success"/>)
                                                    :
                                                    (<i className="flaticon2-cancel text-danger"/>)
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold text-dark-50 w-150px">Archived at</td>
                                            <td className="font-weight-bold text-dark">{series.archived_at ? series.archived_at : '-'}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="font-weight-bolder text-dark">List Videos</h3>
                                <a href="#" className="btn btn-primary font-weight-bold ml-2"
                                   data-toggle="modal" data-target="#addVideoModal">
                                    <i className="flaticon2-plus icon-1x"/> Add Video
                                </a>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '5px'}}>#</th>
                                        <th style={{minWidth : '150px'}}>Title</th>
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
                                        series.videos.length > 0 ?
                                            series.videos.map((video, index) => (
                                                <tr key={video.id} className="odd">
                                                    <td className="pl-0">
                                                        { index + 1 }
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{video.title}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">
                                                            <a href={`https://youtu.be/${video.source}`}
                                                               className="text-dark-50 font-weight-bold text-hover-primary mb-1"
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
                                                    <td>
                                                        <div className="font-weight-bold text-center">
                                                            <span className="label label-rounded label-dark">{video.episode}</span>
                                                        </div>
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
                                                <td colSpan={9} className="text-center p-7 font-weight-bolder">No records found in table</td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal trigger={"addVideoModal"} title={"Add new Video"} size={"modal-lg"}>
                <FormVideos
                    {...{
                        seriesData:series,
                        data,
                        setData,
                        submitHandler:storeHandler,
                        errors,
                        processing,
                        submitLabel:"Submit"
                    }}
                />
            </Modal>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
