import React from 'react';
import {Link} from "@inertiajs/inertia-react";

function CardVideoLink({seriesSlug, video, buyable, auth, current = false}) {
    return (
        <Link href={route('watch.video', [seriesSlug, video.episode])}
              className={`d-flex align-items-center ${current && ('bg-light-light')} bg-hover-light-light border border-1 rounded p-5 mb-4`}>
            <div className="symbol symbol-circle mr-5">
                <span className={`symbol-label font-size-h5 ${current && ('bg-primary')}`}>
                    {
                        current
                        ?
                            <i className="icon-lg fas fa-play-circle text-white"/>
                        :
                            <>{video.episode}</>
                    }
                </span>
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <span className={`${current ? 'text-primary' : 'text-dark'} mb-2 font-size-lg font-weight-bold`}>{video.title}</span>
                <div>
                    <span className="label label-pill label-inline font-weight-normal">Episode {video.episode}</span>
                    <span className="label label-dot label-sm bg-dark opacity-50 mx-1"/>
                    <span className="label label-pill label-inline font-weight-normal">{video.runtime.runtime_formatted} minutes</span>
                    {
                        video.newest && (
                            <>
                                <span className="label label-dot label-sm bg-dark opacity-50 mx-1"/>
                                <span className="label label-pill label-inline font-weight-normal">Newest video</span>
                            </>
                        )
                    }
                </div>
            </div>
            {
                auth ? (
                    buyable && (
                        !video.is_free && (<i className="flaticon2-start-up icon-2x text-primary" />)
                    )
                ) : (
                    !video.is_free && (<i className="flaticon2-start-up icon-2x text-primary" />)
                )
            }
        </Link>
    )
}

export default React.memo(CardVideoLink)
