import React, {useEffect, useState} from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import YouTube from "react-youtube";
import CardVideoLink from "../../Components/CardVideoLink";
import CodeBlock from "../../Components/CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { keyTab } from "../../Components/Helpers";

export default function Show() {
    const { video, series, videos, auth } = usePage().props
    const [ loadingVideo, setLoadingVideo ] = useState(true)
    const [ watchable ] = useState(!!video.current_video.source)
    const [ currentEpisode ] = useState(video.current_video.episode)

    useEffect(() => {
        if (videos.length > 10) {
            const cardPosition = document.getElementById(`${currentEpisode}`);
            document.getElementById('scrollable').scrollTo({top: cardPosition.offsetTop - 25, behavior: 'smooth'});
        }
    }, []);

    const _onReady = () => {
        console.log('Video ready to watch.');
        setLoadingVideo(false)
    }

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <>
            <Head title={`${video.current_video.episode}. ${video.current_video.title} - ${series.title}`}/>
            <Jumbotron sizeClass="min-h-350px min-h-lg-750px">
                {
                    watchable
                    ?
                        <>
                            {
                                loadingVideo &&
                                <>
                                    <div className="text-center">
                                        <div className="spinner spinner-white spinner-lg"/>
                                    </div>
                                </>
                            }
                            <div className={`${loadingVideo && 'd-none'} container mt-n7`}>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <YouTube
                                        videoId={video.current_video.source}
                                        className={"embed-responsive-item rounded"}
                                        loading={"lazy"}
                                        opts={opts}
                                        onReady={_onReady}
                                    />
                                </div>
                            </div>
                        </>
                    :
                        <>
                            <div className="text-center mb-5 mb-lg-10 py-10 py-lg-20">
                                <h4 className="text-white lh-base font-weight-bolder mb-15">
                                    Anda harus membeli Series ini sebelum menonton-nya <i className="la la-hand-peace icon-2x text-white"/>
                                </h4>
                                <Link href={route('series.show', series.slug)} className="btn font-size-h6 text-hover-white font-weight-bold py-3 px-6 text-white">
                                    <i className="flaticon2-left-arrow-1 text-white mr-1 icon-1x"/>
                                    <u>Kembali</u>
                                </Link>
                            </div>
                        </>
                }
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="card card-custom gutter-b mt-n17 shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                            <div className="symbol-group symbol-hover py-2">
                                <Link as={"button"} className="btn btn-link"
                                      href={video.has_prev && (route('watch.video', [series.slug, video.prev_to]))}
                                      disabled={!video.has_prev}>
                                    <i className={`flaticon2-back ${video.has_prev ? 'text-dark' : 'text-muted'}`}/>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center mr-2 py-2">
                                <h3 className="font-weight-bolder mb-0">
                                    {
                                        video.has_next
                                        ?
                                            <>Next eps {video.next_video_is.episode}. {video.next_video_is.title}</>
                                        :
                                            <>Terima kasih, Anda telah menyelesaikan Series "{series.title}". </>
                                    }
                                </h3>
                            </div>
                            <div className="symbol-group symbol-hover py-2">
                                <Link as={"button"} className="btn btn-link"
                                      href={video.has_next && (route('watch.video', [series.slug, video.next_video_is.episode]))}
                                      disabled={!video.has_next}>
                                    <i className={`flaticon2-next ${video.has_next ? 'text-dark' : 'text-muted'}`}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="card card-custom gutter-b shadow-sm">
                                <div className="card-body py-3">
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="mr-2 py-2">
                                            <div className="font-size-h5 font-weight-bolder text-dark">
                                                {video.current_video.title}
                                            </div>
                                            <div className="d-flex flex-wrap align-items-center mt-3 text-dark-50">
                                                <span>Episode {video.current_video.episode}</span>
                                                <span className="label label-dot bg-dark opacity-50 mx-3"/>
                                                <span>{video.current_video.runtime.runtime_formatted}</span>
                                                <span className="label label-dot bg-dark opacity-50 mx-3"/>
                                                <span>{video.current_video.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        video.current_video.description && (
                                            <>
                                                <div className="separator separator-solid separator-border-2 my-4"/>
                                                <ReactMarkdown children={video.current_video.description}
                                                               components={CodeBlock}
                                                               remarkPlugins={[remarkGfm]}/>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="card card-custom card-transparent gutter-b" style={{border: '1px dashed #9CA3AF'}}>
                                <button className="btn btn-link text-decoration-none text-dark-50"
                                        data-toggle="modal" data-target="#add_comment">
                                    <div className="card-body py-1 ml-n5">
                                        <div className="d-flex align-items-center">
                                            <div className="symbol symbol-40 symbol-lg-35 symbol-circle mr-4">
                                                <img alt="Pic" src="/assets/media/users/100_1.jpg"/>
                                            </div>
                                            <div>
                                                Add a comment . . .
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="gutter-b">
                                <div className="timeline timeline-3">
                                    <div className="timeline-items">
                                        <div className="timeline-item border-left-0">
                                            <div className="timeline-media">
                                                <i className="flaticon2-shield text-danger" />
                                            </div>
                                            <div className="timeline-content ml-n5 pseudo-before-none bg-white">
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <div className="mr-2 mt-2">
                                                        <a href="#" className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6">Rafi Putra Ramadhan</a>
                                                        <small className="text-muted ml-2">2 hours ago</small>
                                                    </div>
                                                    <div className="dropdown ml-2 mt-2">
                                                        <a href="#" className="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="ki ki-more-hor icon-md" />
                                                        </a>
                                                        <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right" style={{}}>
                                                            <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                                <li className="navi-item mx-2 my-1">
                                                                    <a href="#" className="navi-link">
                                                                      <span className="navi-text">
                                                                          Edit
                                                                      </span>
                                                                    </a>
                                                                </li>
                                                                <li className="navi-item mx-2 my-1">
                                                                    <a href="#" className="navi-link">
                                                                      <span className="navi-text">
                                                                          Delete
                                                                      </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="p-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
                                                <div className="d-flex align-items-center ml-n2 mt-n1">
                                                    <a href="#" className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="far fa-comment-alt icon-1x mr-1" />
                                                            12
                                                        </div>
                                                    </a>
                                                    <a href="#" className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger font-weight-bolder rounded font-size-sm p-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="far fa-heart icon-1x mr-1" />
                                                            75
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="timeline-reply">
                                                <div className="timeline-item border-left-0">
                                                    <div className="timeline-media">
                                                        <i className="flaticon2-shield text-danger" />
                                                    </div>
                                                    <div className="timeline-content ml-n5 pseudo-before-none bg-white">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <div className="mr-2 mt-2">
                                                                <a href="#" className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6">Rafi Putra Ramadhan</a>
                                                                <small className="text-muted ml-2">3 days ago (edited)</small>
                                                            </div>
                                                            <div className="dropdown ml-2 mt-2">
                                                                <a href="#" className="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ki ki-more-hor icon-md" />
                                                                </a>
                                                                <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right" style={{}}>
                                                                    <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                                        <li className="navi-item mx-2 my-1">
                                                                            <a href="#" className="navi-link">
                                                                      <span className="navi-text">
                                                                          Edit
                                                                      </span>
                                                                            </a>
                                                                        </li>
                                                                        <li className="navi-item mx-2 my-1">
                                                                            <a href="#" className="navi-link">
                                                                      <span className="navi-text">
                                                                          Delete
                                                                      </span>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="p-0">Sed ut perspiciatis unde omnis iste natus error sit
                                                            voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                                            eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                                                            Sed ut perspiciatis unde omnis iste natus error sit
                                                            voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                                            eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                                                        </p>
                                                        <div className="d-flex align-items-center ml-n2 mt-n1">
                                                            <a href="#" className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="far fa-comment-alt icon-1x mr-1" />
                                                                    12
                                                                </div>
                                                            </a>
                                                            <a href="#" className="btn btn-sm btn-text-danger btn-hover-text-dark-25 btn-hover-icon-dark-25 font-weight-bolder rounded font-size-sm p-2">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="fas fa-heart icon-1x text-danger mr-1" />
                                                                    76
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="card card-custom gutter-b shadow-sm">
                                <div className="card-body d-flex align-items-center flex-wrap py-3">
                                    <div className="mr-2 py-2">
                                        <Link href={route('series.show', series.slug)}
                                              className="text-hover-primary text-dark font-size-h5 font-weight-bolder">
                                            {series.title}
                                        </Link>
                                        <div className="d-flex flex-wrap align-items-center mt-3 text-dark-50">
                                            <span>{series.episodes} episodes</span>
                                            <span className="label label-dot bg-dark opacity-50 mx-3"/>
                                            {
                                                series.topics.map((topic) => (
                                                    <div key={topic.id}>
                                                        <Link href={route('topics.show', topic.slug)}
                                                              className="text-primary">
                                                            <u>{topic.name}</u> &nbsp;
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-custom gutter-b shadow-sm">
                                <div className="card-body">
                                    {
                                        videos.length > 10
                                        ?
                                            <div className="scrollable" id="scrollable">
                                            {
                                                videos.map((video) => (
                                                    <span key={video.id} id={video.episode}>
                                                        <CardVideoLink seriesSlug={series.slug}
                                                                       video={video}
                                                                       buyable={series.viewing_status.is_buyable}
                                                                       auth={auth.user !== null}
                                                                       current={currentEpisode === video.episode}/>
                                                    </span>
                                                ))
                                            }
                                            </div>
                                        :
                                            <div>
                                            {
                                                videos.map((video) => (
                                                    <span key={video.id}>
                                                        <CardVideoLink seriesSlug={series.slug}
                                                                       video={video}
                                                                       buyable={series.viewing_status.is_buyable}
                                                                       auth={auth.user !== null}
                                                                       current={currentEpisode === video.episode}/>
                                                    </span>
                                                ))
                                            }
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal modal-sticky modal-sticky-bottom-right-custom" id="add_comment" role="dialog" data-backdrop="static">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="card card-custom">
                                <div className="card-header align-items-center justify-content-between px-4 py-3">
                                    <div className="text-left">
                                        <div className="text-dark-75 font-weight-bold font-size-h5">Add Comment on "VIDEO TITLE"</div>
                                    </div>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-dismiss="modal">
                                            <i className="ki ki-close icon-1x" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer align-items-center">
                                    <textarea className="form-control border-0 p-0" rows={10}
                                              placeholder="Type a comment." defaultValue={""} onKeyDown={keyTab} />
                                    <div className="d-flex align-items-center justify-content-between mt-5">
                                        <div className="mr-3">
                                            {/*<a href="#" className="btn btn-clean btn-icon btn-md mr-1">*/}
                                            {/*    <i className="flaticon2-photograph icon-lg" />*/}
                                            {/*</a>*/}
                                            {/*<a href="#" className="btn btn-clean btn-icon btn-md">*/}
                                            {/*    <i className="flaticon2-photo-camera icon-lg" />*/}
                                            {/*</a>*/}
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-primary btn-md text-uppercase font-weight-bold chat-send py-2 px-6">Comment</button>
                                        </div>
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

Show.layout = (page) => <App children={page}/>
