import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function Timeline({activity, user}) {
    const _headingActivity = (activity) => {
        if (activity.type === 'comment_on_video') {
            return <>
                <Link href={route('profile.show', user.username)}>{user.name}</Link>
                <span className="text-dark-75"> {activity.heading} </span>
                <Link href={activity.feedable.video.url}>{activity.feedable.video.title}</Link>
                <span className="text-dark-75"> video.</span>
            </>;
        } else if (activity.type === 'replied_to_comment') {
            return <>
                <Link href={route('profile.show', user.username)}>{user.name}</Link>
                <span className="text-dark-75"> {activity.heading} a </span>
                <Link href={activity.feedable.user.url}>{activity.feedable.user.name}</Link>
                <span className="text-dark-75"> comment, on </span>
                <Link href={activity.feedable.video.url}>{activity.feedable.video.title}</Link>
                <span className="text-dark-75"> video.</span>
            </>;
        } else if (activity.type === 'liked_comment') {
            return <>
                <Link href={route('profile.show', user.username)}>{user.name}</Link>
                <span className="text-dark-75"> {activity.heading} </span>
                <Link href={activity.feedable.user.url}>{activity.feedable.user.name}</Link>
                <span className="text-dark-75"> comment, on </span>
                <Link href={activity.feedable.video.url}>{activity.feedable.video.title}</Link>
                <span className="text-dark-75"> video.</span>
            </>;
        }
    }

    return (
        <>
            <div className="timeline-media">
                <i className={`${activity.icon} text-primary`}/>
            </div>
            <div className="timeline-content">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="mr-2 mt-2">
                        <span className="font-weight-bold">
                            {_headingActivity(activity)}
                        </span>
                        <small className="text-muted ml-3">{activity.diffForHumans}</small>
                    </div>
                </div>
                <div className="p-0">
                    <ReactMarkdown children={activity.feedable.body}
                                   components={CodeBlock}
                                   remarkPlugins={[remarkGfm]}/>
                </div>
            </div>
        </>
    )
}
