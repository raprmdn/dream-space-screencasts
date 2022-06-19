import React from 'react';
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Inertia} from "@inertiajs/inertia";
import {Link, usePage} from "@inertiajs/inertia-react";

function CommentCard({comment, highlighted = false, ...props}) {
    const {auth} = usePage().props
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
        <div
            className={`card card-custom gutter-b ${highlighted ? ('border border-primary bg-primary-o-20') : ('bg-white')}`}>
            <div className="card-body">
                <div>
                    <div className="d-flex align-items-center pb-4">
                        <div className="symbol symbol-40 symbol-light-success mr-5">
                            <LazyLoadImage
                                effect="blur"
                                src={
                                    comment.user.profile_picture ? comment.user.profile_picture : '/assets/media/default-avatar.png'
                                }
                                width={40}
                                height={40}
                                alt={comment.user.name}
                                className={`symbol-label`}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <Link href={route('profile.show', comment.user.username)}
                                  className="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">{comment.user.name}</Link>
                            <small className="text-muted font-weight-bold">{comment.commented}
                                {comment.edited && (' - edited')}
                                {highlighted && (' - highlighted comment')}
                            </small>
                        </div>
                        {
                            comment.actions && (
                                <div className="dropdown ml-2">
                                    <a href="#" title="Action" className="text-hover-primary" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <i className="ki ki-more-hor icon-sm"/>
                                    </a>
                                    <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right">
                                        <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                            <li className="navi-item mx-2 my-1">
                                                <button className="btn btn-block navi-link" data-toggle="modal"
                                                        data-target="#comment_edit"
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
                    <div>
                        <div className="text-dark-75 font-size-lg font-weight-normal">
                            <ReactMarkdown children={comment.comment}
                                           components={CodeBlock}
                                           remarkPlugins={[remarkGfm]}/>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                {
                                    comment.can_reply && (
                                        <button
                                            className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 bg-hover-light-primary rounded font-weight-bolder font-size-sm p-2 mr-2"
                                            data-toggle="modal" data-target="#comment_reply"
                                            onClick={() => {
                                                props.onClickReply({
                                                    parent_id: comment.id,
                                                    reply_to: comment.user.name
                                                })
                                            }} title={`${comment.replies_count} comments`}>
                                            <span className="svg-icon svg-icon-md svg-icon-dark-25 pr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     xmlnsXlink="http://www.w3.org/1999/xlink" width="24px"
                                                     height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                        <rect x={0} y={0} width={24} height={24}/>
                                                        <path
                                                            d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z"
                                                            fill="#000000"/>
                                                        <path
                                                            d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z"
                                                            fill="#000000" opacity="0.3"/>
                                                    </g>
                                                </svg>
                                            </span>
                                            {comment.replies_count}
                                        </button>
                                    )
                                }
                                <button
                                    className="btn btn-hover-icon-danger btn-sm btn-text-dark-50 bg-hover-light-danger btn-hover-text-danger rounded font-weight-bolder font-size-sm p-2 mr-2"
                                    onClick={(e) => likeToggleHandler(e, comment.id)}
                                    title={`${comment.likes_count} likes`}>
                                    <span
                                        className={`svg-icon svg-icon-md ${comment.liked ? 'svg-icon-danger' : 'svg-icon-dark-25'} pr-1`}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                             viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24"/>
                                                <path
                                                    d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
                                                    fill="#000000" fillRule="nonzero"/>
                                            </g>
                                        </svg>
                                    </span>
                                    {comment.likes_count}
                                </button>
                                {
                                    isAdmin && (
                                        <>
                                            <button
                                                className="btn btn-hover-icon-primary btn-sm btn-text-dark-50 bg-hover-light-primary btn-hover-text-primary rounded font-weight-bolder font-size-sm p-2"
                                                onClick={(e) => pinCommentHandler(e, comment.id)} title="Pin comment">
                                                    <span
                                                        className={`svg-icon svg-icon-md ${highlighted ? 'svg-icon-primary' : 'svg-icon-dark-25'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             xmlnsXlink="http://www.w3.org/1999/xlink" width="24px"
                                                             height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" strokeWidth={1} fill="none"
                                                               fillRule="evenodd">
                                                                <rect x={0} y={0} width={24} height={24}/>
                                                                <path
                                                                    d="M11.6734943,8.3307728 L14.9993074,6.09979492 L14.1213255,5.22181303 C13.7308012,4.83128874 13.7308012,4.19812376 14.1213255,3.80759947 L15.535539,2.39338591 C15.9260633,2.00286161 16.5592283,2.00286161 16.9497526,2.39338591 L22.6066068,8.05024016 C22.9971311,8.44076445 22.9971311,9.07392943 22.6066068,9.46445372 L21.1923933,10.8786673 C20.801869,11.2691916 20.168704,11.2691916 19.7781797,10.8786673 L18.9002333,10.0007208 L16.6692373,13.3265608 C16.9264145,14.2523264 16.9984943,15.2320236 16.8664372,16.2092466 L16.4344698,19.4058049 C16.360509,19.9531149 15.8568695,20.3368403 15.3095595,20.2628795 C15.0925691,20.2335564 14.8912006,20.1338238 14.7363706,19.9789938 L5.02099894,10.2636221 C4.63047465,9.87309784 4.63047465,9.23993286 5.02099894,8.84940857 C5.17582897,8.69457854 5.37719743,8.59484594 5.59418783,8.56552292 L8.79074617,8.13355557 C9.76799113,8.00149544 10.7477104,8.0735815 11.6734943,8.3307728 Z"
                                                                    fill="#000000"/>
                                                                <polygon fill="#000000" opacity="0.3"
                                                                         transform="translate(7.050253, 17.949747) rotate(-315.000000) translate(-7.050253, -17.949747) "
                                                                         points="5.55025253 13.9497475 5.55025253 19.6640332 7.05025253 21.9497475 8.55025253 19.6640332 8.55025253 13.9497475"/>
                                                            </g>
                                                      </svg>
                                                    </span>
                                            </button>
                                            <button
                                                className="btn btn-hover-icon-danger btn-sm btn-text-dark-50 bg-hover-light-danger btn-hover-text-danger rounded font-weight-bolder font-size-sm p-2"
                                                onClick={(e) => disableReplyHandler(e, comment.id)}
                                                title="Turn on/off reply">
                                                    <span
                                                        className={`svg-icon svg-icon-md ${comment.can_reply ? 'svg-icon-dark-25' : 'svg-icon-danger'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             xmlnsXlink="http://www.w3.org/1999/xlink" width="24px"
                                                             height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" strokeWidth={1} fill="none"
                                                               fillRule="evenodd">
                                                                <rect x={0} y={0} width={24} height={24}/>
                                                                <path
                                                                    d="M8,17 C8.55228475,17 9,17.4477153 9,18 L9,21 C9,21.5522847 8.55228475,22 8,22 L3,22 C2.44771525,22 2,21.5522847 2,21 L2,18 C2,17.4477153 2.44771525,17 3,17 L3,16.5 C3,15.1192881 4.11928813,14 5.5,14 C6.88071187,14 8,15.1192881 8,16.5 L8,17 Z M5.5,15 C4.67157288,15 4,15.6715729 4,16.5 L4,17 L7,17 L7,16.5 C7,15.6715729 6.32842712,15 5.5,15 Z"
                                                                    fill="#000000" opacity="0.3"/>
                                                                <path
                                                                    d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z"
                                                                    fill="#000000"/>
                                                            </g>
                                                        </svg>
                                                    </span>
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        {
                            comment.replies.map((reply) => (
                                    <span key={reply.id}>
                                        <div className="d-flex py-4">
                                            <div className="symbol symbol-40 symbol-light-success mr-5 mt-1">
                                                <LazyLoadImage
                                                    effect="blur"
                                                    src={
                                                        reply.user.profile_picture ? reply.user.profile_picture : '/assets/media/default-avatar.png'
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt={reply.user.name}
                                                    className={`symbol-label`}
                                                />
                                            </div>
                                            <div className="d-flex flex-column flex-row-fluid">
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <Link href={route('profile.show', reply.user.username)}
                                                          className="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder pr-6">{reply.user.name}</Link>
                                                    <small
                                                        className="text-muted font-weight-normal flex-grow-1 mb-1">{reply.commented} {reply.edited && ('(edited)')}</small>
                                                    {
                                                        reply.actions && (
                                                            <div className="dropdown ml-2">
                                                                <a href="#" title="Action" className="text-hover-primary"
                                                                   data-toggle="dropdown" aria-haspopup="true"
                                                                   aria-expanded="false">
                                                                    <i className="ki ki-more-hor icon-sm"/>
                                                                </a>
                                                                <div
                                                                    className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right">
                                                                    <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                                        <li className="navi-item mx-2 my-1">
                                                                            <button className="btn btn-block navi-link"
                                                                                    data-toggle="modal"
                                                                                    data-target="#comment_edit"
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
                                                <div className="text-dark-75 font-size-sm font-weight-normal pt-1">
                                                    <ReactMarkdown children={reply.comment}
                                                                   components={CodeBlock}
                                                                   remarkPlugins={[remarkGfm]}/>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {
                                                        auth.user ? (
                                                            <div>
                                                                {
                                                                    comment.can_reply && (
                                                                        <button
                                                                            className="btn btn-link-dark text-muted p-0 font-size-sm font-weight-normal mr-3"
                                                                            data-toggle="modal" data-target="#comment_reply"
                                                                            onClick={() => {
                                                                                props.onClickReply({
                                                                                    parent_id: comment.id,
                                                                                    reply_to: reply.user.name,
                                                                                    mentioned_username: `[@${reply.user.name}](${URL}/${reply.user.username})`,
                                                                                    mentioned_user_id: reply.user.id,
                                                                                })
                                                                            }}>
                                                                            reply
                                                                        </button>
                                                                    )
                                                                }
                                                                <button
                                                                    className={`btn btn-link-dark ${reply.liked ? 'text-primary' : 'text-muted'} p-0 font-size-sm font-weight-normal`}
                                                                    onClick={(e) => likeToggleHandler(e, reply.id)}>
                                                                    {reply.liked ? 'liked' : 'like'}
                                                                </button>
                                                            </div>
                                                        ) : (<div></div>)
                                                    }
                                                    {
                                                        reply.likes_count > 0 && (
                                                            <div className="d-flex mt-n7 align-items-center" title={`${reply.likes_count} likes`}>
                                                                <i className="flaticon-like text-primary mr-2"></i>
                                                                <small
                                                                    className="text-primary font-weight-bold font-size-base">{reply.likes_count}</small>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CommentCard)
