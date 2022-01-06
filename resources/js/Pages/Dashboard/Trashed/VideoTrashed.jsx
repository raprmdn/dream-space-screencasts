import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";

export default function VideoTrashed(props) {
    const { data: videos, meta:{ links, from } } = props.videos

    const deleteHandler = (video) => {
        Swal.fire({
            title: `Are you sure want to delete Video "${video.title}"?`,
            text: 'You will not be able to revert this!.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('trash.videos_force', video) , {
                    preserveScroll: true,
                })
            }
        })
    }
    return (
        <>
            <Head title="Dream Space | Trashed"/>
            <Breadcrumb
                titleHeading="Trash Videos"
                item1="Dashboard"
                item2="Trash"
                item3="Videos" linkItem3={route('trash.videos_index')}
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
                                                            <Link preserveScroll={true}
                                                                  as="button"
                                                                  method="post"
                                                                  href={route('trash.videos_restore', video)}
                                                                  className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Restore">
                                                                <i className="la la-redo-alt text-success" />
                                                            </Link>
                                                            <button onClick={() => deleteHandler(video)} className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Delete permanent">
                                                                <i className="la la-trash text-danger" />
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
        </>
    )
}

VideoTrashed.layout = (page) => <App children={page}/>
