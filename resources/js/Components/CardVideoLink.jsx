import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function CardVideoLink({video}) {
    return (
        <Link href={"#"} className="d-flex align-items-center bg-hover-light-o-2 border border-1 rounded p-5 mb-4">
            <div className="symbol symbol-circle mr-5">
                <span className="symbol-label font-size-h5">{video.episode}</span>
            </div>
            <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                <span className="text-dark mb-1 font-size-lg font-weight-bolder">{video.title}</span>
                <div>
                    <span className="label label-light label-pill label-inline font-weight-bold">Episode {video.episode}</span>
                    <span className="label label-dot label-sm bg-dark opacity-50 mx-1"/>
                    <span className="label label-light label-pill label-inline font-weight-bold">{video.runtime.runtime_formatted} minutes</span>
                    {
                        video.newest && (
                            <>
                                <span className="label label-dot label-sm bg-dark opacity-50 mx-1"/>
                                <span className="label label-light label-pill label-inline font-weight-bold">Newest video</span>
                            </>
                        )
                    }
                </div>
            </div>
            {
                !video.is_free ? <i className="flaticon2-start-up icon-2x text-primary" /> : <></>
            }
        </Link>
    )
}
