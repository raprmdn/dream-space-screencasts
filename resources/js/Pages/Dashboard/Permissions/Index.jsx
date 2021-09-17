import React from 'react';
import {Head, Link} from "@inertiajs/inertia-react";
import SubHeader from "../../../Components/SubHeader";
import App from "../../../Layouts/App";

export default function Index() {
    return (
        <>
            <Head title="Dream Space | Roles"/>
            <SubHeader>
                <h2 className="text-white font-weight-bold my-2 mr-5">Permissions</h2>
                <div className="d-flex align-items-center font-weight-bold my-2">
                    <Link href={route('home')} className="text-white text-hover-white opacity-75 hover-opacity-100">Home</Link>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">Dashboard</span>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">User Management</span>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">Permissions</span>
                </div>
            </SubHeader>
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    Permissions
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
