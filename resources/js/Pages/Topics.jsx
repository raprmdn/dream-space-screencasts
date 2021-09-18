import React from 'react';
import App from "../Layouts/App";
import Jumbotron from "../Components/Jumbotron";
import {Head} from "@inertiajs/inertia-react"
import CourseCard from "../Components/CourseCard";
import ListTopics from "../Components/ListTopics";

export default function Topics() {
    return (
        <>
            <Head title="Dream Space | Topics"/>
            <Jumbotron>
                <div className="container">
                    <div className="d-flex flex-column">
                        <h1 className="text-white font-weight-boldest mb-10">Explore Topic Laravel Series</h1>
                        <p className="font-weight-bold font-size-h5 text-muted">Ini merupakan <i>courses</i> direkomendasikan
                            melalui Dream Space Screencasts untuk menambah keterampilan maupun pengalaman Anda
                            berdasarkan beberapa topic.</p>
                        <p className="font-weight-bold font-size-h5 text-muted">Setiap bagian ini diharapkan dapat
                            mempermudah Anda untuk memutuskan apa yang akan Anda harus pelajari selanjutnya.</p>
                        <p className="font-weight-bold font-size-h5 text-muted">Tips dan teknik apapun itu yang telah
                            Anda pelajari, jangan ragu untuk terus memperbarui kemampuan sesuai keinginan Anda.</p>
                        <div className="row m-0 pt-5 mb-5">
                            <ListTopics/>
                            <ListTopics/>
                            <ListTopics/>
                            <ListTopics/>
                            <ListTopics/>
                            <ListTopics/>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="row">
                        <CourseCard/>
                        <CourseCard/>
                        <CourseCard/>
                        <CourseCard/>
                        <CourseCard/>
                        <CourseCard/>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="d-flex flex-wrap py-2 mr-3">
                            <a href="#" className="btn btn-icon btn-light-primary mr-2 my-1"><i className="ki ki-bold-arrow-back icon-xs" /></a>
                            <a href="#" className="btn btn-icon border-0 btn-hover-primary mr-2 my-1">1</a>
                            <a href="#" className="btn btn-icon border-0 btn-hover-primary mr-2 my-1">2</a>
                            <a href="#" className="btn btn-icon border-0 btn-hover-primary active mr-2 my-1">3</a>
                            <a href="#" className="btn btn-icon border-0 btn-hover-primary mr-2 my-1">4</a>
                            <a href="#" className="btn btn-icon border-0 btn-hover-primary mr-2 my-1">5</a>
                            <a href="#" className="btn btn-icon btn-light-primary mr-2 my-1"><i className="ki ki-bold-arrow-next icon-xs" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Topics.layout = (page) => <App children={page}/>
