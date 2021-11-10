import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CourseCard({course}) {
    return (
        <div className="col-xl-4 mb-5">
            <div className="card card-custom card-stretch gutter-b">
                <div className="ribbon ribbon-clip ribbon-left">
                    <div className="ribbon-target" style={{top: '12px'}}>
                        <span className="ribbon-inner bg-success" />
                        <Link href="#" className="text-white text-hover-white">
                            Laravel
                        </Link>
                    </div>
                </div>
                {
                    course.is_discount && (
                        <div className="ribbon ribbon-clip ribbon-left">
                            <div className="ribbon-target" style={{top: '50px'}}>
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
                        <a href="#">
                            <LazyLoadImage
                                src={course.thumbnail}
                                effect="blur"
                                width={350}
                                height={200}
                                alt={course.slug}
                                className="mw-100 rounded-lg" />
                        </a>
                    </div>
                    <div className="align-items-center py-5">
                        <a href="#"
                           className="text-dark-75 text-hover-primary font-weight-bolder font-size-h6-md m-0"
                           style={{display: '-webkit-box',WebkitBoxOrient: 'vertical',
                               WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {course.title}
                        </a>
                        <div className="d-flex mt-3">
                            <p className="font-weight-bold text-dark-50 text-hover-dark-75">Rp. {course.price.price_formatted},-</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-n5 mt-n5 text-dark-50">
                        <span className="align-items-center">
                          <i className="flaticon2-open-text-book icon-1x mr-1" />
                            {course.episodes} Lessons
                        </span>
                        <span className="align-items-center">
                          <i className="flaticon2-hourglass-1 icon-1x mr-1" />
                          2h 10m
                        </span>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <i className="flaticon2-check-mark icon-1x text-success" />
                            <span className="font-weight-bold ml-2">
                                {course.is_free ? 'Free' : 'Paid'} Series
                            </span>
                        </div>
                    </div>
                    {
                        course.status === 'Development' && <div className="label label-danger label-inline font-weight-bold">{course.status}</div>
                    }
                </div>
            </div>
        </div>
    )
}
