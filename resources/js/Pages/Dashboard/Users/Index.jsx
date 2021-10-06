import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import SubHeader from "../../../Components/SubHeader";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";
import Breadcrumb from "../../../Components/Breadcrumb";

export default function Index() {
    const { data: users, meta: {links, from} } = usePage().props.users
    return (
        <>
            <Head title="Dream Space | Users"/>
            <Breadcrumb
                titleHeading="User Lists"
                item1="Dashboard"
                item2="User Management"
                item3="Users" linkItem3={route('users.index')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Users
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search users . . ."}/>
                                <a href="#" className="btn btn-light-primary font-weight-bolder font-size-sm ml-3"
                                   data-toggle="modal" data-target="#modalPermissions">
                                    Add User
                                </a>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{width: '400px'}}>Name</th>
                                        <th style={{width: '350px'}}>Username</th>
                                        <th style={{width: '200px'}}>Role</th>
                                        <th style={{minWidth: '170px'}}>Joined</th>
                                        <th className="pr-0 text-right" style={{minWidth: '150px'}}>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        users.length > 0 ?
                                            users.map((user, index) => (
                                                <tr key={user.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td className="pl-0">
                                                        <div className="d-flex align-items-center">
                                                            <div className="symbol symbol-circle symbol-50px overflow-hidden mr-3">
                                                                <div className="symbol-label">
                                                                    <img src="/assets/media/users/100_1.jpg" alt="Emma Smith" className="w-100" />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                <a href="" className="text-dark-75 font-weight-bold text-hover-primary mb-1">{user.name}</a>
                                                                {
                                                                    user.verified_email ? <span className="text-success">{user.email}</span> : <span className="text-danger">{user.email}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{user.username}</span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <div className="badge badge-light font-weight-bolder text-dark-50">{user.roles[0].name}</div>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{user.joined}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <div className="btn-group">
                                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                                            <div className="dropdown-menu" >
                                                                <Link className="dropdown-item" href="#">View</Link>
                                                                {/*<Link as="button" className="dropdown-item">Remove Role</Link>*/}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={6} className="text-center p-7 font-weight-bolder">No records found in table</td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <SmallPagination links={links}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
