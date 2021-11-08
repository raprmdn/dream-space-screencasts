import React from 'react';
import App from "../Layouts/App";
import Jumbotron from "../Components/Jumbotron";
import {Head, usePage} from "@inertiajs/inertia-react"
import ListTopics from "../Components/ListTopics";

export default function Topics() {
    const { data: topics } = usePage().props.topics
    return (
        <>
            <Head title="Dream Space - Topics"/>
            <Jumbotron>
                <div className="container">
                    <div className="d-flex flex-column">
                            <h1 className="text-white font-weight-boldest mb-10">Explore Topics</h1>
                            <p className="font-weight-bold font-size-h5 text-muted">
                                Ini merupakan <span className="text-white"><u><b>Topics</b></u></span> yang tersedia pada Platform
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
            </Jumbotron>
            <div className="d-flex flex-column-fluid mt-10">
                <div className="container">
                    <div className="row">
                        {
                            topics.map((topic) => (
                                <ListTopics key={topic.id} topic={topic}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

Topics.layout = (page) => <App children={page}/>
