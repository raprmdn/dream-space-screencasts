import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import SmallPagination from "../../../Components/SmallPagination";
import Modal from "../../../Components/Modal";
import FormAssignRoleUser from "../../../Components/Forms/FormAssignRoleUser";
import SearchFilter from "../../../Components/SearchFilter";
import Breadcrumb from "../../../Components/Breadcrumb";

export default function Show(props) {
    const { role } = usePage().props
    const { data: users, meta: { links, from } } = props.users
    const { data, setData, post, errors, clearErrors, processing, reset } = useForm({
        email: ''
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const removeHandler = (e, user) => {
        e.preventDefault()
        post(route('roles.remove', [role[0], user]))
    }
    const storeHandler = (e) => {
        e.preventDefault()
        post(route('roles.assign', role[0]), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                window.$('#assignRole').modal('hide')
            }
        })
    }
    return (
        <>
            <Head title="Dream Space | Roles"/>
            <Breadcrumb
                titleHeading="Roles"
                item1="Dashboard"
                item2="User Management"
                item3="Roles" linkItem3={route('roles.index')}
                item4={role[0].name}
            />
            <div className="d-flex flex-column-fluid flex-xl-row mb-11">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="flex-column flex-lg-row-auto w-100 w-lg-300px">
                            <div className="card card-custom gutter-b shadow-lg">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h4 className="font-weight-boldest text-dark-75 my-2">{role[0].name}</h4>
                                    </div>
                                </div>
                                <div className="card-body py-5">
                                    <div className="d-flex flex-column text-dark-50">
                                        {
                                            role[0].permissions.map((permission) =>  (
                                                <div className="d-flex align-items-center py-2" key={permission.id}>
                                                    <span className="svg-icon svg-icon-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                              <polygon points="0 0 24 0 24 24 0 24" />
                                                              <path d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z" fill="#000000" fillRule="nonzero" />
                                                              <path d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999)" />
                                                            </g>
                                                          </svg>
                                                        <span className="ml-1">{permission.name}</span>
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-lg-row-fluid ml-lg-10">
                            <div className="card card-custom gutter-b shadow-lg">
                                <div className="card-header border-0 py-5">
                                    <h3 className="card-title font-weight-bolder text-dark">
                                        Users Assigned ({role[0].users_count})
                                    </h3>
                                    <div className="card-toolbar">
                                        <SearchFilter placeholder={"Search users . . ."} identifier={role[0]}/>
                                        <a href="#" className="btn btn-light-primary font-weight-bolder font-size-sm ml-3"
                                           data-toggle="modal" data-target="#assignRole" onClick={() => {reset(); clearErrors()}}>
                                            Assign Role User
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body py-0">
                                    <div className="table-responsive">
                                        <table className="table table-head-custom table-vertical-center">
                                            <thead>
                                            <tr className="text-left">
                                                <th className="pl-0" style={{width: '50px'}}>#</th>
                                                <th style={{width: '350px'}}>Name</th>
                                                <th style={{width: '350px'}}>Email</th>
                                                <th style={{width: '250px'}}>Joined</th>
                                                <th className="pr-0 text-right" style={{minWidth: '150px'}}>action</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-dark-50">
                                            {
                                                users.length > 0 ?
                                                    users.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <td className="pl-0 py-7">
                                                                { from + index}
                                                            </td>
                                                            <td>
                                                                <span className="font-weight-bolder text-dark-50">{user.name}</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-weight-bolder text-dark-50">{user.email}</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-weight-bolder text-dark-50">{user.joined}</span>
                                                            </td>
                                                            <td className="pr-0 text-right">
                                                                <div className="btn-group">
                                                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                                                                    <div className="dropdown-menu" >
                                                                        <Link className="dropdown-item" href="#">View</Link>
                                                                        <Link as="button" onClick={(e) => removeHandler(e, user)} className="dropdown-item">Remove Role</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan={5} className="text-center p-7 font-weight-bolder">No records found in table</td>
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
                </div>
            </div>
            <Modal trigger={"assignRole"} title={"Assign Role User"}>
                <FormAssignRoleUser
                    {...{
                        data,
                        submitHandler:storeHandler,
                        changeHandler,
                        submitLabel:"Assign",
                        errors,
                        processing
                    }}/>
            </Modal>
        </>
    )
}

Show.layout = (page) => <App children={page}/>
