import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import SubHeader from "../../../Components/SubHeader";
import Modal from "../../../Components/Modal";
import FormRoles from "../../../Components/Forms/FormRoles";

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
                                                Total user with this role : 7
                                            </div>
                                            <div className="d-flex flex-column text-dark-50">
                                                {
                                                    role.permissions.map((permission, index) => (
                                                        <div className="d-flex align-items-center py-2" key={index}>
                                                            <span className="bullet bg-primary mr-3" />{permission.name}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="card-footer flex-wrap py-5">
                                            <a href="" className="btn btn-light btn-active-primary my-1 mr-2 font-weight-bold">View Role</a>
                                            <button onClick={() => setData({...role, permissions: role.permissions.map(val => val.id)})} className="btn btn-light btn-active-light-primary my-1 font-weight-bold"
                                                    data-toggle="modal" data-target="#editRoleModal">Edit Role
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
