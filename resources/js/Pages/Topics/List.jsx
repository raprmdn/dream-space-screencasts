import React from 'react';
import App from "../../Layouts/App";
import {Head} from "@inertiajs/inertia-react";
import Jumbotron from "../../Components/Jumbotron";

export default function List({topic}) {
    console.log(topic)
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
                                Di bawah ini merupakan Series yang berkaitan dengan Topic <span className="text-white"><u><b>{topic.name}</b></u></span> yang tersedia pada Platform
                                <span className="text-white"> <u><b>Dream Space Screencasts</b></u>. </span>
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
                        <div className="card card-custom card-stretch gutter-b bg-transparent shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <div className="text-center text-white">
                                    <span>
                                        <img src="/assets/media/stock-600x400/img-12.jpg" className="mw-100 rounded-lg" />
                                    </span>
                                    <div className="mt-2">
                                        <span className="font-weight-boldest font-size-h3 m-0 mb-1">
                                            Mari Kita Bangun Screencasts
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="font-weight-bold m-0 mb-1">
                                            The latest Series in {topic.name}
                                        </span>
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
                </div>
            </Jumbotron>
        </>
    )
}

List.layout = (page) => <App children={page}/>
