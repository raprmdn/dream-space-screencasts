import React from 'react';
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";

function CommentCard({comment, highlighted = false, ...props}) {
    const { auth } = usePage().props
    const isAdmin = auth.roles === 'administrator'

    const likeToggleHandler = (e, id) => {
        e.preventDefault();
        Inertia.post(route('comment.like', id), {}, {
            only: ['errors', 'comments', 'highlighted_comments'],
            preserveState: true,
            preserveScroll: true,
        })
    };

    const pinCommentHandler = (e, id) => {
        e.preventDefault();
        Inertia.post(route('comment.pin'), {
            comment_id: id
        }, {
            only: ['errors', 'comments', 'highlighted_comments'],
            preserveState: true,
            preserveScroll: true,
        })
    };

    const disableReplyHandler = (e, id) => {
        e.preventDefault()
        Inertia.post(route('comment.disable-reply'), {
            comment_id: id
        }, {
            only: ['errors', 'comments', 'highlighted_comments'],
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <div className="gutter-b">
            <div className="timeline timeline-3">
                <div className="timeline-items">
                    <div className="timeline-item border-left-0">
                        <div className="timeline-media" style={{width: 40, height: 40}}>
                            <div className="d-flex align-items-center">
                                <LazyLoadImage
                                    effect="blur"
                                    src={
                                        comment.user.profile_picture ? comment.user.profile_picture : '/assets/media/default-avatar.png'
                                    }
                                    width={40}
                                    height={40}
                                    alt={comment.user.name}
                                />
                            </div>
                        </div>
                        <div className={`timeline-content ml-n8 pseudo-before-none ${highlighted ? ('border border-primary bg-primary-o-20') : ('bg-white')}`}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="mr-2">
                                    <a href="#" className="text-dark-75 text-hover-primary font-size-lg font-weight-bolder">{comment.user.name}</a>
                                    <small className="text-muted ml-2">{comment.commented} {comment.edited && ('(edited)')}</small>
                                    {
                                        highlighted && (
                                            <span className="label label-primary label-inline label-sm font-weight-bold ml-2">HIGHLIGHTED COMMENT</span>
                                        )
                                    }
                                </div>
                                {
                                    comment.actions && (
                                        <div className="dropdown ml-2">
                                            <a href="#" className="text-hover-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ki ki-more-hor icon-sm" />
                                            </a>
                                            <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right">
                                                <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                    <li className="navi-item mx-2 my-1">
                                                        <button className="btn btn-block navi-link" data-toggle="modal" data-target="#comment_edit"
                                                                onClick={() => props.onClickEditComment({
                                                                    id: comment.id,
                                                                    comment: comment.comment,
                                                                })}>
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li className="navi-item mx-2 my-1">
                                                        <button className="btn btn-block navi-link"
                                                                onClick={() => {
                                                                    props.onClickDelete(comment.id);
                                                                }}>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="p-0">
                                <ReactMarkdown children={comment.comment}
                                               components={CodeBlock}
                                               remarkPlugins={[remarkGfm]}/>
                            </div>
                            <div className="d-flex align-items-center ml-n2">
                                {
                                    comment.can_reply && (
                                        <button className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2"
                                                data-toggle="modal" data-target="#comment_reply"
                                                onClick={() => {
                                                    props.onClickReply({
                                                        parent_id: comment.id,
                                                        reply_to: comment.user.name
                                                    })
                                                }}>
                                            <div className="d-flex align-items-center">
                                                <i className="far fa-comment-alt icon-nm mr-1" />
                                                {comment.replies_count}
                                            </div>
                                        </button>
                                    )
                                }
                                <button className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger font-weight-bolder rounded font-size-sm p-2"
                                        onClick={(e) => likeToggleHandler(e, comment.id)}>
                                    <div className="d-flex align-items-center">
                                        {
                                            comment.liked ?
                                                <>
                                                    <i className="fas fa-heart text-danger icon-nm mr-1" /> {comment.likes_count}
                                                </>
                                            :
                                                <>
                                                    <i className="far fa-heart icon-nm mr-1" /> {comment.likes_count}
                                                </>
                                        }
                                    </div>
                                </button>
                                {
                                    isAdmin && (
                                        <button className="btn btn-icon"
                                                onClick={(e) => pinCommentHandler(e, comment.id)}>
                                            {
                                                highlighted ?
                                                    <i className="la la-thumbtack text-danger"></i>
                                                :
                                                    <i className="la la-thumbtack"></i>
                                            }
                                        </button>
                                    )
                                }
                                {
                                    isAdmin && (
                                        <button className="btn btn-icon"
                                                onClick={(e) => disableReplyHandler(e, comment.id)}>
                                            {
                                                comment.can_reply ?
                                                    <i className="la la-comment-slash"></i>
                                                :
                                                    <i className="la la-comment"></i>
                                            }
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        {
                            comment.replies.map((reply) => (
                                <span key={reply.id}>
                                    <div className="timeline-reply">
                                        <div className="timeline-item border-left-0">
                                            <div className="timeline-media" style={{width: 40, height: 40}}>
                                                <div className="d-flex align-items-center">
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={
                                                            reply.user.profile_picture ? reply.user.profile_picture : '/assets/media/default-avatar.png'
                                                        }
                                                        width={40}
                                                        height={40}
                                                        alt={reply.user.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="timeline-content ml-n8 pseudo-before-none bg-white">
                                                <div className="d-flex align-items-center justify-content-between mb-3 mt-2">
                                                    <div className="mr-2">
                                                        <a href="#" className="text-dark-75 text-hover-primary font-size-lg font-weight-bolder">{reply.user.name}</a>
                                                        <small className="text-muted ml-2">{reply.commented} {reply.edited && ('(edited)')}</small>
                                                    </div>
                                                    {
                                                        reply.actions && (
                                                            <div className="dropdown ml-2">
                                                                <a href="#" className="text-hover-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ki ki-more-hor icon-sm" />
                                                                </a>
                                                                <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right">
                                                                    <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                                        <li className="navi-item mx-2 my-1">
                                                                            <button className="btn btn-block navi-link" data-toggle="modal" data-target="#comment_edit"
                                                                                    onClick={() => props.onClickEditComment({
                                                                                        id: reply.id,
                                                                                        comment: reply.comment,
                                                                                    })}>
                                                                                    Edit
                                                                            </button>
                                                                        </li>
                                                                        <li className="navi-item mx-2 my-1">
                                                                            <button className="btn btn-block navi-link"
                                                                                    onClick={() => {
                                                                                        props.onClickDelete(reply.id);
                                                                                    }}>
                                                                                Delete
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="p-0">
                                                    <ReactMarkdown children={reply.comment}
                                                                   components={CodeBlock}
                                                                   remarkPlugins={[remarkGfm]}/>
                                                </div>
                                                <div className="d-flex align-items-center ml-n2">
                                                    <button className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-n2"
                                                            data-toggle="modal" data-target="#comment_reply"
                                                            onClick={() =>{
                                                                props.onClickReply({
                                                                    parent_id: comment.id,
                                                                    reply_to: reply.user.name,
                                                                    mentioned_username: `[@${reply.user.name}](${URL}/${reply.user.username})`,
                                                                    mentioned_user_id: reply.user.id,
                                                                })
                                                            }}>
                                                        <div className="d-flex align-items-center">
                                                            <i className="far fa-comment-alt icon-nm" />
                                                        </div>
                                                    </button>
                                                    <button className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger font-weight-bolder rounded font-size-sm p-2"
                                                            onClick={(e) => likeToggleHandler(e, reply.id)}>
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                reply.liked ?
                                                                    <>
                                                                        <i className="fas fa-heart text-danger icon-nm mr-1" /> {reply.likes_count}
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <i className="far fa-heart icon-nm mr-1" /> {reply.likes_count}
                                                                    </>
                                                            }
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(CommentCard)
