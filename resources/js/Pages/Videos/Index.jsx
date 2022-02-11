import React, {useEffect, useState} from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import YouTube from "react-youtube";
import CardVideoLink from "../../Components/CardVideoLink";

export default function Index() {
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
                                <div className="card-body d-flex align-items-center flex-wrap py-3">
                                    <div className="mr-2 py-2">
                                        <h5 className="font-weight-bolder text-dark">
                                            {video.current_video.title}
                                        </h5>
                                        <div className="d-flex flex-wrap align-items-center mt-3 text-dark-50">
                                            <span>Episode {video.current_video.episode}</span>
                                            <span className="label label-dot bg-dark opacity-50 mx-3"/>
                                            <span>{video.current_video.runtime.runtime_formatted}</span>
                                            <span className="label label-dot bg-dark opacity-50 mx-3"/>
                                            <span>{video.current_video.created_at}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5">
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
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
