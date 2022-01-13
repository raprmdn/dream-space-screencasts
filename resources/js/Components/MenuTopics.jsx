import React from 'react';
import {Link, usePage} from "@inertiajs/inertia-react";

export default function MenuTopics() {
    const { topics } = usePage().props;

    return (
        <div className="container d-flex flex-column flex-column-fluid mt-n16 mb-5">
            <div className="card">
                <div className="d-flex align-items-center justify-content-center flex-wrap px-5 py-5 px-md-10 py-md-9">
                    {
                        topics.map((topic, index) => (
                            <Link key={index} className="btn btn-lg btn-hover-bg-light text-uppercase font-size-1 letter-spacing-sm font-weight-bolder px-3 px-md-6 mr-1 mr-md-2"
                               href={route('topics.show', topic.slug)}>
                                {topic.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
