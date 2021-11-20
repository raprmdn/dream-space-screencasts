import React from 'react';
import App from "../../Layouts/App";
import {Head, usePage} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";
import CourseCard from "../../Components/CourseCard";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function List({topic}) {
    const { data: series, meta:{ links, from } } = usePage().props.series
    return (
        <>
            <Head title={`Dream Space - ${topic.name}`}/>
            <Jumbotron>
                <div className="container row d-flex align-items-center align-center">
                    <div className="col-lg-8">
                        <div className="d-flex flex-column">
                            <h1 className="text-white font-weight-boldest mb-10">Explore Topic
                                <span style={{background: 'linear-gradient(to right, #06b6d4 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                <span> {topic.name}!</span>
                            </span>
                            </h1>
                            <p className="font-weight-bold font-size-h5 text-muted">
                                Di bawah ini merupakan Series yang berkaitan dengan Topic <span className="text-white"><b>{topic.name}</b></span> yang tersedia pada Platform
                                <span className="text-white"> <b>Dream Space Screencasts</b>. </span>
                                Pasti-nya akan berguna untuk menambah keterampilan maupun pengalaman Anda.
                            </p>
                            <p className="font-weight-bold font-size-h5 text-muted">Setiap Topic yang tersedia diharapkan dapat
                                mempermudah Anda untuk memutuskan apa yang akan Anda harus pelajari selanjutnya.</p>
                            <p className="font-weight-bold font-size-h5 text-muted">Tips dan teknik apapun itu yang telah
                                Anda pelajari, jangan ragu untuk selalu memperbarui kemampuan sesuai keinginan Anda, karena itu akan sangat
                                bermanfaat bagi Anda untuk menggapai Masa Depan yang diinginkan.
                            </p>
                            <div className="row m-0 pt-5 mb-5">
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
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
                                                        width={350}
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
                                                    <a href="#" className="btn btn-success btn-shadow-hover btn-block font-weight-bold btn-pill">
                                                        Preview
                                                    </a>
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
                </div>
            </div>
        </>
    )
}

List.layout = (page) => <App children={page}/>