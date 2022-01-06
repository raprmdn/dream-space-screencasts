import React from 'react';
import App from "../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Jumbotron from "../../Components/Jumbotron";
import CourseCard from "../../Components/CourseCard";
import 'react-lazy-load-image-component/src/effects/blur.css';
import SmallPagination from "../../Components/SmallPagination";

export default function Index() {
    const { data: series, meta:{ links } } = usePage().props.series
    return (
        <>
            <Head title="Dream Space - Series"/>
            <Jumbotron>
                <div className="container row d-flex align-items-center align-center">
                    <div className="col-12 col-xl-8 py-10">
                        <div className="d-flex flex-column">
                            <h1 className="text-white font-weight-boldest mb-10">Explore
                                <span style={{background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                    <span> Series</span>
                                </span>
                            </h1>
                            <p className="font-weight-bold font-size-h5 text-muted">
                                Di bawah ini merupakan Series yang tersedia pada Platform <span className="text-white"><b> Dream Space Screencasts</b>. </span>
                                Pasti-nya akan berguna untuk menambah keterampilan maupun pengalaman Anda.
                            </p>
                            <p className="font-weight-bold font-size-h5 text-muted">Jika Anda bingung ingin memulainya dari mana,
                                Anda bisa melihat pada Menu <Link href={route('topics')} className="text-white text-hover-info"><b>Topics</b>. </Link>
                            </p>
                            <p className="font-weight-bold font-size-h5 text-muted">Tips dan teknik apapun itu yang telah
                                Anda pelajari, jangan ragu untuk selalu memperbarui kemampuan sesuai keinginan Anda, karena itu akan sangat
                                bermanfaat bagi Anda untuk menggapai Masa Depan yang diinginkan.
                            </p>
                            <div className="row m-0 pt-5 mb-5">
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-xl-flex col-xl-4">
                        {
                            series.slice(0, 1).map((course) => (
                                <div key={course.id}>
                                    <div className="card card-custom card-stretch gutter-b bg-transparent shadow-sm">
                                        <div className="card-body d-flex flex-column">
                                            <div className="text-center text-white">
                                                <span>
                                                    <LazyLoadImage
                                                        src={course.thumbnail}
                                                        effect="blur"
                                                        height={200}
                                                        alt={course.slug}
                                                        className="mw-100 rounded-lg" />
                                                </span>
                                                <div className="mt-2">
                                                    <span className="font-weight-boldest font-size-h3 m-0 mb-1">
                                                        {course.title}
                                                    </span>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-muted">
                                                        <small>Added {course.created_at}</small>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Link href={route('series.show', course.slug)} className="btn btn-success btn-shadow-hover btn-block font-weight-bold btn-pill">
                                                        Preview
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="row">
                        {
                            series.map((course) => (
                                <CourseCard key={course.id} course={course}/>
                            ))
                        }
                    </div>
                    <SmallPagination links={links}/>
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
