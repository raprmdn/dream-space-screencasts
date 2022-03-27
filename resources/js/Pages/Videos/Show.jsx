import React, {useCallback, useEffect, useState} from 'react';
import App from "../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import YouTube from "react-youtube";
import CardVideoLink from "../../Components/CardVideoLink";
import CodeBlock from "../../Components/CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import AddCommentCard from "../../Components/AddCommentCard";
import {Inertia} from "@inertiajs/inertia";
import CommentTextAreaForm from "../../Components/Forms/CommentTextAreaForm";
import CommentCard from "../../Components/CommentCard";
import CommentPopUp from "../../Components/CommentPopUp";

export default function Show() {
    const { video, series, videos, auth, comments } = usePage().props
    const [ loadingVideo, setLoadingVideo ] = useState(true)
    const [ watchable ] = useState(!!video.current_video.source)
    const [ currentEpisode ] = useState(video.current_video.episode)

    const { data, setData, post, errors, clearErrors, reset, processing } = useForm({
        video_id: video.current_video.id,
        parent_id: '',
        reply_to: '',
        mentioned_username: '',
        mentioned_user_id: '',
        comment: ''
    });

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
            autoplay: 0,
        },
    };

    const _videoNavTitle = () => {
        let label;
        if (video.has_next) {
            label = `Next eps ${video.next_video_is.episode}. ${video.next_video_is.title}.`
        } else if (series.status === 'Development') {
            label = `Nantikan video-video terbaru dari Series "${series.title}".`
        } else {
            label = `Terima kasih, Anda telah menyelesaikan Series "${series.title}".`
        }

        return label
    }

    const onClickReply = useCallback((value) => {
        setData({
            ...data,
            parent_id: value.parent_id,
            reply_to: value.reply_to,
            mentioned_username: value.mentioned_username,
            mentioned_user_id: value.mentioned_user_id
        });
    }, []);

    const submitCommentHandler = (e) => {
        e.preventDefault()
        post(route('comment'), {
            data,
            only: ['errors', 'comments'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                clearErrors()
                reset()
                window.$('#add_comment').modal('hide')
            }
        })
    }

    const replyCommentHandler = (e) => {
        e.preventDefault()
        post(route('replies.comment'), {
            data,
            only: ['errors', 'comments'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                clearErrors()
                reset()
                window.$('#comment_reply').modal('hide')
            }
        })
    }

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

                    {/* Mobile Screen Navigator */}
                    <div className="row d-flex d-sm-none mb-8">
                        <div className="col-6">
                            <Link as={"button"} className="btn btn-white btn-hover-white p-5 mt-n17 btn-lg btn-block"
                                  href={video.has_prev && (route('watch.video', [series.slug, video.prev_to]))}
                                  disabled={!video.has_prev}>
                                <div className="d-flex symbol-group symbol-hover justify-content-center">
                                    <i className={`flaticon2-back ${video.has_prev ? 'text-dark' : 'text-muted'}`}/>
                                </div>
                            </Link>
                        </div>
                        <div className="col-6">
                            <Link as={"button"} className="btn btn-white btn-hover-white p-5 mt-n17 btn-lg btn-block"
                                  href={video.has_next && (route('watch.video', [series.slug, video.next_video_is.episode]))}
                                  disabled={!video.has_next}>
                                <div className="d-flex symbol-group symbol-hover justify-content-center">
                                    <i className={`flaticon2-next ${video.has_next ? 'text-dark' : 'text-muted'}`}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex d-sm-none card card-custom gutter-b shadow-sm">
                        <div className="d-flex card-body justify-content-center">
                            {_videoNavTitle()}
                        </div>
                    </div>
                    {/* End Mobile Screen Navigator */}

                    <div className="d-none d-sm-flex card card-custom gutter-b mt-n17 shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                            <div className="symbol-group symbol-hover py-2">
                                <Link as={"button"} className="btn btn-link"
                                      href={video.has_prev && (route('watch.video', [series.slug, video.prev_to]))}
                                      disabled={!video.has_prev}>
                                    <i className={`flaticon2-back ${video.has_prev ? 'text-dark' : 'text-muted'}`}/>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center mr-2 py-2">
                                <div className="font-weight-bolder font-size-h3-md mb-0">
                                    {_videoNavTitle()}
                                </div>
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
                            {
                                auth.user
                                    ? <AddCommentCard
                                        modalTarget={"#add_comment"}
                                        auth={auth.user}
                                        label={'Add a comment . . .'}
                                    />
                                    : <AddCommentCard
                                        modalTarget={null}
                                        auth={null}
                                        label={'Login to comment . . .'}
                                        onClick={() => Inertia.visit(route('login'))}
                                    />
                            }
                            {
                                comments.map((comment) => (
                                    <span key={comment.id}>
                                        <CommentCard comment={comment}
                                                     onClickReply={onClickReply}
                                        />
                                    </span>
                                ))
                            }
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
                {
                    auth.user && (
                        <CommentPopUp trigger={"add_comment"}>
                            <CommentTextAreaForm
                                {...{
                                    video,
                                    data,
                                    setData,
                                    submitHandler:submitCommentHandler,
                                    errors,
                                    processing,
                                    clearErrors,
                                    reset
                                }}
                            />
                        </CommentPopUp>
                    )
                }
                {
                    auth.user && (
                        <CommentPopUp trigger={"comment_reply"}>
                            <CommentTextAreaForm
                                {...{
                                    video,
                                    data,
                                    setData,
                                    submitHandler:replyCommentHandler,
                                    errors,
                                    processing,
                                    clearErrors,
                                    reset
                                }}
                            />
                        </CommentPopUp>
                    )
                }
            </div>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
