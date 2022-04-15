import React, {useState} from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import {Inertia} from "@inertiajs/inertia";
import Alert from "../../Components/Alert";
import CardVideoLink from "../../Components/CardVideoLink";
import SeriesBannerMeta from "../../Components/SeriesBannerMeta";
import ButtonIcon from "../../Components/ButtonIcon";
import {LazyLoadImage} from "react-lazy-load-image-component";
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown'
import CodeBlock from "../../Components/CodeBlock";
import remarkGfm from 'remark-gfm'

export default function Show() {
    const { auth } = usePage().props
    const { data: series } = usePage().props.series
    const latestVideo = series.videos[series.videos.length - 1] ?? null;
    const [ loading, setLoading ] = useState(false)
    const [ player, setPlayer ] = useState(null)
    const [ fetchingYoutubeVideo, setFetchingYoutubeVideo ] = useState(true)

    const saves = (e) => {
        e.preventDefault()
        Inertia.post(route('saves'),{
            series_id: series.id,
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    const addToCarts = (e) => {
        e.preventDefault()
        Inertia.post(route('add.carts'),{
            series_id: series.id,
        }, {
            preserveScroll: true,
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    const _onReady = (e) => {
        console.log('Preview is ready to watch.');
        setFetchingYoutubeVideo(false)
        setPlayer(e.target)
    }

    const _onClickPreview = () => {
        player.playVideo();
    }

    const _onClose = () => {
        player.pauseVideo();
    }

    const _priceBannerMeta = (series) => {
        return <SeriesBannerMeta
            icon={'flaticon-price-tag'} label={
            series.discount.discount_unformatted
                ?
                <>Rp. {series.discount.discount_formatted},-</>
                :
                <>
                    {
                        series.price.price_unformatted
                            ?
                            <>Rp. {series.price.price_formatted},-</>
                            :
                            <>Free Series</>
                    }
                </>
        }/>
    }

    const _buttonNotAllowed = (label) => {
        return (
            <button
                style={{cursor: "not-allowed"}}
                disabled={true}
                className="btn btn-success btn-block font-weight-bold">{label}</button>
        )
    }

    return (
        <>
            <Head title={`Dream Space - ${series.title}`}/>
            <Jumbotron>
                <div className="container row d-flex align-items-center align-center">
                    <div className="col-lg-8 py-10">
                        <div className="d-flex flex-column">
                            <div className="mb-3">
                                {
                                    series.topics.map((topic) => (
                                        <Link href={route('topics.show', topic.slug)}
                                           key={topic.id}
                                           className="label label-lg label-success label-pill label-inline mr-2 font-weight-bold">{topic.name}</Link>
                                    ))
                                }
                            </div>
                            <h1 className="text-white font-weight-boldest mb-7">
                                <span style={{background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                    <span>{series.title}</span>
                                </span>
                            </h1>
                            <ReactMarkdown children={series.description}
                                           components={CodeBlock}
                                           remarkPlugins={[remarkGfm]}
                                           className="font-weight-bold text-muted font-size-h6"/>
                            <div className="d-lg-flex mt-2">
                                {
                                    auth.user !== null ? (
                                        series.viewing_status.is_buyable ? (
                                            _priceBannerMeta(series)
                                        ) : <SeriesBannerMeta icon={'flaticon-price-tag'} label={'Purchased'} />
                                    ) : (
                                       _priceBannerMeta(series)
                                    )

                                }
                                <SeriesBannerMeta icon={'far fa-calendar-plus'} label={series.created_at} />
                                <SeriesBannerMeta icon={'flaticon2-layers'} label={series.levels} />
                                <SeriesBannerMeta icon={'flaticon2-open-text-book'} label={`${series.episodes} episodes`} />
                                <SeriesBannerMeta icon={'far fa-clock'} label={
                                    <>
                                        <span>{series.runtime.h !== 0 ? `${series.runtime.h}h ` : ''}</span>
                                        <span>{series.runtime.m !== 0 ? `${series.runtime.m}m ` : ''}</span>
                                        <span>{series.runtime.s}s </span>
                                    </>
                                }/>
                                <SeriesBannerMeta icon={series.status === 'Completed'
                                    ? 'far fa-check-circle pr-3' : 'fas fa-code pr-3'} label={series.status} />
                            </div>
                            <div className="d-flex mt-6">
                                <Link href={route('watch.video', [series.slug, 1])} className="btn btn-success font-weight-bold mr-5">
                                    <i className="fas fa-play-circle mr-1"/>
                                    Start
                                </Link>
                            {
                                auth.user !== null && (
                                    <>
                                        {
                                            !series.viewing_status.is_free && (
                                                series.viewing_status.is_buyable && (
                                                    series.viewing_status.is_exists_in_carts
                                                    ?
                                                        <ButtonIcon
                                                            onClick={addToCarts} type={'danger'} loading={loading}
                                                            icon={'flaticon-shopping-basket'} label={'Added to Carts'} />
                                                    :
                                                        <ButtonIcon
                                                            onClick={addToCarts} type={'light'} loading={loading}
                                                            icon={'flaticon-shopping-basket'} label={'Add to Carts'} />
                                                )
                                            )
                                        }
                                        {
                                            series.viewing_status.is_watch_later
                                            ?
                                                <ButtonIcon
                                                    onClick={saves} type={'danger'} loading={loading}
                                                    icon={'fas fa-bookmark'} label={'Added to Watchlist'} />
                                            :
                                                <ButtonIcon
                                                    onClick={saves} type={'light'} loading={loading}
                                                    icon={'far fa-bookmark'} label={'Add to Watchlist'} />
                                        }
                                    </>
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-flex justify-content-center">
                        {
                            latestVideo && (
                                <>
                                    <div className="card card-custom card-stretch gutter-b bg-transparent shadow-sm">
                                        <div className="card-body d-flex flex-column">
                                            <div className="text-center text-white">
                                            <span className="font-weight-boldest"
                                                  style={{fontSize: '6rem', background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                                {latestVideo.episode}
                                            </span>
                                                <div className="mt-2">
                                                <span className="font-weight-boldest font-size-h3 m-0 mb-1">
                                                    {latestVideo.title}
                                                </span>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-muted">
                                                        <span>Latest Episode <br/></span>
                                                        <small>Added {latestVideo.created_at}</small>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Link href={route('watch.video', [series.slug, latestVideo.episode])} className="btn btn-success btn-shadow-hover btn-block font-weight-bold btn-pill">
                                                        Watch
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="d-flex flex-column-reverse flex-lg-row">
                        <div className="col-xl-8">
                            {
                                series.status === 'Development' && (
                                    <Alert
                                        type={'warning'}
                                        icon={'flaticon-exclamation'}
                                        message={'This series is still in development.'} />
                                )
                            }
                            {
                                series.videos.length > 0
                                ?
                                    <div className="card card-custom gutter-b">
                                        <div className="card-body pt-7">
                                            {
                                                series.videos.length > 10
                                                    ?
                                                    <div className="scrollable">
                                                        {
                                                            series.videos.map((video) => (
                                                                <span key={video.id}>
                                                                    <CardVideoLink seriesSlug={series.slug}
                                                                                   video={video}
                                                                                   buyable={series.viewing_status.is_buyable}
                                                                                   auth={auth.user !== null}/>
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            series.videos.map((video) => (
                                                                <span key={video.id}>
                                                                    <CardVideoLink seriesSlug={series.slug}
                                                                                   video={video}
                                                                                   buyable={series.viewing_status.is_buyable}
                                                                                   auth={auth.user !== null}/>
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                :
                                    <Alert
                                        type={'warning'}
                                        icon={'flaticon-exclamation'}
                                        message={'Videos are available coming soon.'} />
                            }
                        </div>
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <div className="text-center">
                                        <LazyLoadImage
                                            src={series.thumbnail}
                                            effect="blur"
                                            height={180}
                                            alt={series.slug}
                                            className="mw-100 rounded-lg" />
                                    </div>
                                    {
                                        series.preview_url
                                        ?
                                            <>
                                                <button onClick={_onClickPreview}
                                                        className={`btn btn-success btn-block font-weight-bold mt-5
                                                        ${fetchingYoutubeVideo && ('spinner spinner-sm spinner-white spinner-right')}`}
                                                        data-toggle="modal" data-target="#previewSeries"
                                                        disabled={fetchingYoutubeVideo}>
                                                    {fetchingYoutubeVideo ? 'Getting preview...' : 'Preview Series'}
                                                </button>
                                            </>
                                        : (_buttonNotAllowed("Preview Series"))
                                    }
                                    {
                                        series.demo_url
                                        ?
                                            <>
                                                <a href={series.demo_url}
                                                   className="btn btn-success btn-block font-weight-bold" target="_blank">
                                                    Project Demo
                                                </a>
                                            </>
                                        : (_buttonNotAllowed("Project Demo"))
                                    }
                                    {
                                        series.source_code_url
                                            ?
                                            <>
                                                <a href={series.source_code_url}
                                                   className="btn btn-success btn-block font-weight-bold" target="_blank">
                                                    Source Code
                                                </a>
                                            </>
                                            : (_buttonNotAllowed("Source Code"))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                series.preview_url && (
                    <div className="modal fade" id="previewSeries" tabIndex="-1" role="dialog"
                         aria-labelledby="staticBackdrop" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="font-weight-boldest mt-2" id="modalTitle">Preview {series.title}</h3>
                                    <button onClick={_onClose} type="button" className="close btn-icon" data-dismiss="modal" aria-label="Close">
                                        <i aria-hidden="true" className="ki ki-close"/>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <YouTube
                                            videoId={series.preview_url}
                                            className={"embed-responsive-item rounded"}
                                            onReady={_onReady}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

Show.layout = (page) => <App children={page}/>
