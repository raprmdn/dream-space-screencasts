import React from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Link} from "@inertiajs/inertia-react";

export default function ListTopics({topic}) {
    return (
        <>
            <div className="col-lg-3">
                <Link href={route('topics.show', topic.slug)}>
                    <div className="d-flex align-items-center mb-5 bg-light-white bg-hover-white-o-3 rounded p-5 shadow-sm">
                        <span className="symbol symbol-35 overflow-hidden">
                            <LazyLoadImage
                                effect="blur"
                                src={topic.picture}
                                width={50}
                                height={50}
                                alt={topic.slug}
                                className="w-100" />
                        </span>
                        <div className="d-flex flex-column text-left pl-3">
                            <span className="text-dark font-weight-bolder font-size-lg mb-1">{topic.name}</span>
                            <span className="text-dark-50 font-weight-bold font-size-xs">
                                {topic.series_count} Series • {topic.videos_count} Videos
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
