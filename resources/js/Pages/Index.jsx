import React from 'react';
import App from "../Layouts/App";
import {Head} from "@inertiajs/inertia-react"
import Jumbotron from "../Components/Jumbotron";
import MenuTopics from "../Components/MenuTopics";
import CourseCard from "../Components/CourseCard";
import SectionFeature from "../Components/SectionFeature";

export default function Index() {
    return (
        <div>
            <Head title="Dream Space"/>
            <Jumbotron>
                <div className="text-center mb-5 mb-lg-10 py-10 py-lg-20">
                    <h1 className="text-white lh-base font-weight-bolder fs-2x fs-lg-3x mb-15">Build An Outstanding Move
                        <br />with
                        <span style={{background: 'linear-gradient(to right, #12CE5D 0%, #FFD80C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    <span>A Robust Platform for Developer!</span>
                </span>
                    </h1>
                    <a href="#" className="btn btn-primary font-size-h6 font-weight-bolder py-3 px-6">Browse Courses</a>
                </div>
            </Jumbotron>
            <MenuTopics/>
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <SectionFeature
                        title={"Starter"}
                        description={"Temukan kelas yang diminati untuk membantu anda agar dapat menemukan pengalaman yang lebih jauh."}/>
                    <div className="row">
                        <CourseCard/>
                        <CourseCard/>
                    </div>
                    <SectionFeature
                        title={"Recently Updated"}
                        description={"Penasaran terhadap apa saja courses terbaru? berikut di bawah ini adalah courses yang baru saja diperbarui."}/>
                    <div className="row">
                        <CourseCard/>
                    </div>
                    <SectionFeature
                        title={"Top Courses"}
                        description={"Courses yang paling banyak diminati."}/>
                    <div className="row">
                        <CourseCard/>
                    </div>
                </div>

            </div>
        </div>
    )
}

Index.layout = (page) => <App children={page}/>
