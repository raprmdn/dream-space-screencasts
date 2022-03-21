import React from 'react';
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CommentCard({comment}) {
    return (
        <div className="gutter-b">
            <div className="timeline timeline-3">
                <div className="timeline-items">
                    <div className="timeline-item border-left-0">
                        <div className="timeline-media">
                            <div className="d-flex align-items-center">
                                <div className="symbol symbol-40 symbol-circle mr-4">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={
                                            comment.user.profile_picture ? comment.user.profile_picture : '/assets/media/default-avatar.png'
                                        }
                                        alt={comment.user.name}
                                        className="w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="timeline-content ml-n5 pseudo-before-none bg-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="mr-2 mt-2">
                                    <a href="#" className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6">{comment.user.name}</a>
                                    <small className="text-muted ml-2">{comment.commented} {comment.edited && (' (edited)')}</small>
                                </div>
                                {
                                    comment.actions && (
                                        <div className="dropdown ml-2 mt-2">
                                            <a href="#" className="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ki ki-more-hor icon-md" />
                                            </a>
                                            <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right" style={{}}>
                                                <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">
                                                    <li className="navi-item mx-2 my-1">
                                                        <a href="#" className="navi-link">
                                                    <span className="navi-text">
                                                        Edit
                                                    </span>
                                                        </a>
                                                    </li>
                                                    <li className="navi-item mx-2 my-1">
                                                        <a href="#" className="navi-link">
                                                    <span className="navi-text">
                                                        Delete
                                                    </span>
                                                        </a>
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
                            <div className="d-flex align-items-center ml-n2 mt-n1">
                                <a href="#" className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2">
                                    <div className="d-flex align-items-center">
                                        <i className="far fa-comment-alt icon-nm mr-1" />
                                        12
                                    </div>
                                </a>
                                <a href="#" className="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger font-weight-bolder rounded font-size-sm p-2">
                                    <div className="d-flex align-items-center">
                                        <i className="far fa-heart icon-nm mr-1" />
                                        75
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/*<div className="timeline-reply">*/}
                        {/*    <div className="timeline-item border-left-0">*/}
                        {/*        <div className="timeline-media">*/}
                        {/*            <i className="flaticon2-shield text-danger" />*/}
                        {/*        </div>*/}
                        {/*        <div className="timeline-content ml-n5 pseudo-before-none bg-white">*/}
                        {/*            <div className="d-flex align-items-center justify-content-between mb-3">*/}
                        {/*                <div className="mr-2 mt-2">*/}
                        {/*                    <a href="#" className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6">Rafi Putra Ramadhan</a>*/}
                        {/*                    <small className="text-muted ml-2">3 days ago (edited)</small>*/}
                        {/*                </div>*/}
                        {/*                <div className="dropdown ml-2 mt-2">*/}
                        {/*                    <a href="#" className="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                        {/*                        <i className="ki ki-more-hor icon-md" />*/}
                        {/*                    </a>*/}
                        {/*                    <div className="dropdown-menu p-0 m-0 dropdown-menu-anim dropdown-menu-right" style={{}}>*/}
                        {/*                        <ul className="navi navi-hover navi-active navi-accent navi-link-rounded-lg">*/}
                        {/*                            <li className="navi-item mx-2 my-1">*/}
                        {/*                                <a href="#" className="navi-link">*/}
                        {/*                                              <span className="navi-text">*/}
                        {/*                                                  Edit*/}
                        {/*                                              </span>*/}
                        {/*                                </a>*/}
                        {/*                            </li>*/}
                        {/*                            <li className="navi-item mx-2 my-1">*/}
                        {/*                                <a href="#" className="navi-link">*/}
                        {/*                                              <span className="navi-text">*/}
                        {/*                                                  Delete*/}
                        {/*                                              </span>*/}
                        {/*                                </a>*/}
                        {/*                            </li>*/}
                        {/*                        </ul>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <p className="p-0">Sed ut perspiciatis unde omnis iste natus error sit*/}
                        {/*                voluptatem accusantium doloremque laudantium, totam rem aperiam,*/}
                        {/*                eaque ipsa quae ab illo inventore veritatis et quasi architecto.*/}
                        {/*                Sed ut perspiciatis unde omnis iste natus error sit*/}
                        {/*                voluptatem accusantium doloremque laudantium, totam rem aperiam,*/}
                        {/*                eaque ipsa quae ab illo inventore veritatis et quasi architecto.*/}
                        {/*            </p>*/}
                        {/*            <div className="d-flex align-items-center ml-n2 mt-n1">*/}
                        {/*                <a href="#" className="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 rounded font-weight-bolder font-size-sm p-2 mr-2">*/}
                        {/*                    <div className="d-flex align-items-center">*/}
                        {/*                        <i className="far fa-comment-alt icon-1x mr-1" />*/}
                        {/*                        12*/}
                        {/*                    </div>*/}
                        {/*                </a>*/}
                        {/*                <a href="#" className="btn btn-sm btn-text-danger btn-hover-text-dark-25 btn-hover-icon-dark-25 font-weight-bolder rounded font-size-sm p-2">*/}
                        {/*                    <div className="d-flex align-items-center">*/}
                        {/*                        <i className="fas fa-heart icon-1x text-danger mr-1" />*/}
                        {/*                        76*/}
                        {/*                    </div>*/}
                        {/*                </a>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
