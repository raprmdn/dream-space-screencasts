import React, {useEffect} from 'react';
import App from "../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import SubHeader from "../../../Components/SubHeader";
import Modal from "../../../Components/Modal";
import FormRoles from "../../../Components/Forms/FormRoles";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";

export default function Index() {
    const { permissions: permissionsData, roles } = usePage().props
    const { data, setData, post, put, errors, reset, processing } = useForm({
        name: '',
        guard_name: 'web',
        permissions: []
    });
    const checkedHandler = (e) => {
        let values = Number(e.target.value)
        let permissionsIds = [...data.permissions, values];
        if (data.permissions.includes(values)) {
            permissionsIds = permissionsIds.filter(id => id !== values);
        }
        setData({...data, permissions: permissionsIds});
    }
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const updateHandler = (e) => {
        e.preventDefault()
        put(route('roles.update', data),{
            data,
            preserveScroll: true,
            resetOnSuccess: false,
            onSuccess: () => {
                window.$('#editRoleModal').modal('hide')
            }
        })
    }
    const storeHandler = (e) => {
        e.preventDefault()
        post(route('roles.store'),{
            data,
            preserveScroll: true,
            resetOnSuccess: false,
            onSuccess: () => {
                window.$('#addRoleModal').modal('hide')
            }
        })
    }
    const deleteHandler = (role) => {
        Swal.fire({
            title: `Are you sure want to delete the "${role.name}" role?`,
            text: 'By deleting the role, you might break the system roles functionality.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('roles.destroy', role),{
                    preserveScroll: true,
                    resetOnSuccess: false,
                })
            }
        })
    }
    return (
        <>
            <Head title="Dream Space | Roles">
                <script src="/assets/js/scripts.bundle.js"></script>
            </Head>
            <Modal trigger={"addRoleModal"} title={"Add a Role"}>
                <FormRoles
                    {...{permissionsData, data, errors, processing, changeHandler, checkedHandler, submitLabel:"Submit", submitHandler:storeHandler }}/>
            </Modal>
            <Modal trigger={"editRoleModal"} title={`Edit Role : ${data.name}`}>
                <FormRoles
                    {...{permissionsData, data, errors, processing, changeHandler, checkedHandler, submitLabel:"Update", submitHandler:updateHandler }}/>
            </Modal>
            <SubHeader>
                <h2 className="text-white font-weight-bold my-2 mr-5">Roles</h2>
                <div className="d-flex align-items-center font-weight-bold my-2">
                    <Link href={route('home')} className="text-white text-hover-white opacity-75 hover-opacity-100">Home</Link>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">Dashboard</span>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">User Management</span>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    <span className="text-white text-hover-white opacity-75 hover-opacity-100">Roles</span>
                </div>
            </SubHeader>
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="row">
                        {
                            roles.map((role, index) => (
                                <div className="col-lg-4 mb-7" key={index}>
                                    <div className="card card-custom card-stretch shadow-lg">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h4 className="font-weight-boldest text-dark-75 my-2">{role.name}</h4>
                                            </div>
                                        </div>
                                        <div className="card-body py-5">
                                            <div className="font-weight-bold text-dark-50 mb-5">
                                                Total user with this role : {role.users_count}
                                            </div>
                                            <div className="d-flex flex-column text-dark-50">
                                                {
                                                    role.permissions.slice(0, 5).map((permission, index) =>  (
                                                        <div className="d-flex align-items-center py-2" key={index}>
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
                                                {
                                                    role.permissions.length > 5 && (
                                                        <div className="d-flex align-items-center py-2">
                                                            <span className="svg-icon svg-icon-primary">
                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                      <polygon points="0 0 24 0 24 24 0 24" />
                                                                      <path d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z" fill="#000000" fillRule="nonzero" />
                                                                      <path d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999)" />
                                                                    </g>
                                                                  </svg>
                                                                <em className="ml-1">and {role.permissions.length - 5} more...</em>
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="card-footer flex-wrap py-5 border-top-0">
                                            <Link href={route('roles.view', role)} className="btn btn-light btn-active-primary my-1 mr-2 font-weight-bold">View Role</Link>
                                            <button onClick={() => setData({...role, permissions: role.permissions.map(val => val.id)})} className="btn btn-light btn-active-light-primary my-1 mr-2 font-weight-bold"
                                                    data-toggle="modal" data-target="#editRoleModal">Edit Role
                                            </button>
                                            <button onClick={() => deleteHandler(role)}
                                                    className="btn btn-light btn-active-light-primary my-1 font-weight-bold">Delete Role
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="col-lg-4 mb-7">
                            <div className="card card-custom card-stretch shadow-lg">
                                <div className="card-body d-flex flex-center">
                                    <button onClick={() => reset()} className="btn btn-clear d-flex flex-column flex-center"
                                            data-toggle="modal" data-target="#addRoleModal">
                                        <img src="/assets/media/user-role.png" alt="add-role" className="mw-100 mh-150px mb-7" />
                                        <div className="font-weight-bolder font-size-h3 text-dark-50 text-hover-primary">Add New Role</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <App children={page}/>
