import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CourseCard({course}) {
    return (
        <div className="col-12 col-md-6 col-xl-4 mb-5">
            <div className="card card-custom card-stretch gutter-b shadow-sm">
                {
                    course.is_discount && (
                        <div className="ribbon ribbon-clip ribbon-left">
                            <div className="ribbon-target" style={{top: '12px'}}>
                                <span className="ribbon-inner bg-danger" />
                                <a href="#" className="text-white text-hover-white">
                                    Discount
                                </a>
                            </div>
                        </div>
                    )
                }
                <div className="card-body d-flex flex-column">
                    <div className="text-center">
                        <Link href={route('series.show', course.slug)}>
                            <LazyLoadImage
                                src={course.thumbnail}
                                effect="blur"
                                height={210}
                                alt={course.slug}
                                className="mw-100 rounded-lg" />
                        </Link>
                    </div>
                    <div className="align-items-center py-5">
                        {
                            course.topics.map((topic) => (
                                <Link href={route('topics.show', topic.slug)} key={topic.id}>
                                    <small>{topic.name} &nbsp;</small>
                                </Link>
                            ))
                        }
                        <Link href={route('series.show', course.slug)}
                           className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6-md m-0 mt-1"
                           style={{display: '-webkit-box',WebkitBoxOrient: 'vertical',
                               WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {course.title}
                        </Link>
                        <div className="d-flex mt-3">
                            {
                                course.discount.discount_unformatted
                                ?
                                    <>
                                        <p className="font-weight-bold text-dark-50 text-hover-dark-75">
                                            <s>Rp. {course.price.price_formatted},-</s>
                                        </p>
                                        &nbsp;
                                        <p className="font-weight-bold text-danger blink_me">
                                            Rp. {course.discount.discount_formatted},-
                                        </p>
                                    </>
                                :
                                    <>
                                        <p className="font-weight-bold text-dark-50 text-hover-dark-75">
                                            {
                                                course.price.price_unformatted
                                                ? <>Rp. {course.price.price_formatted},-</>
                                                : <>Free Series</>
                                            }
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-n5 text-dark-50">
                        <span className="align-items-center">
                          <i className="flaticon2-open-text-book icon-1x mr-1" />
                            {course.episodes} Lessons
                            {
                                course.status === 'Development' && <span className="text-danger font-weight-bold"> // {course.status}</span>
                            }
                        </span>
                        <span className="align-items-center">
                          <i className="flaticon2-hourglass-1 icon-1x mr-1" />
                            <span>
                                <span>{course.runtime.h !== 0 ? `${course.runtime.h}h ` : ''}</span>
                                <span>{course.runtime.m !== 0 ? `${course.runtime.m}m ` : ''}</span>
                                <span>{course.runtime.s}s </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
