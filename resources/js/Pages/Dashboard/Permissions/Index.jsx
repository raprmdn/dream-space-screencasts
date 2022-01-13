import React from 'react';
import {Head, useForm} from "@inertiajs/inertia-react";
import App from "../../../Layouts/App";
import Modal from "../../../Components/Modal";
import FormPermissions from "../../../Components/Forms/FormPermissions";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";
import SmallPagination from "../../../Components/SmallPagination";
import SearchFilter from "../../../Components/SearchFilter";
import Breadcrumb from "../../../Components/Breadcrumb";

export default function Index(props) {
    const { data: permissions, meta: { links, from } } = props.permissions
    const { data, setData, post, put, errors, clearErrors , reset, processing  } = useForm({
        name: '',
        guard_name: 'web'
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const updateHandler = (e) => {
        e.preventDefault()
        put(route('permissions.update', data), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                window.$('#updatePermissionsModal').modal('hide')
            }
        })
    }
    const storeHandler = (e) => {
        e.preventDefault()
        post(route('permissions.store'), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                reset()
                window.$('#modalPermissions').modal('hide')
            },
        })
    }
    const deleteHandler = (permission) => {
        Swal.fire({
            title: `Are you sure want to delete the "${permission.name}" permission?`,
            text: 'By deleting the permission, you might break the system permissions functionality.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('permissions.destroy', permission) , {
                    preserveScroll: true,
                    resetOnSuccess: false,
                })
            }
        })
    }
    return (
        <>
            <Head title="Dream Space | Permissions">
                <script src="/assets/js/scripts.bundle.js"></script>
            </Head>
            <Modal trigger={"modalPermissions"} title={"Add a Permissions"}>
                <FormPermissions {...{data, errors, changeHandler, submitLabel:"Submit", submitHandler:storeHandler, processing }}/>
            </Modal>
            <Modal trigger={"updatePermissionsModal"} title={`Edit Permission : ${data.name}`}>
                <FormPermissions {...{data, errors, changeHandler, submitLabel:"Update", submitHandler:updateHandler, processing }}/>
            </Modal>
            <Breadcrumb
                titleHeading="Permissions"
                item1="Dashboard"
                item2="User Management"
                item3="Permissions" linkItem3={route('permissions.index')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Permissions
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search permissions . . ."}/>
                                <a href="#" className="btn btn-light-primary font-weight-bolder font-size-sm ml-3"
                                   data-toggle="modal" data-target="#modalPermissions" onClick={() => {reset(); clearErrors()}}>
                                    Add Permissions
                                </a>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '50px'}}>#</th>
                                        <th style={{width: '550px'}}>Permissions</th>
                                        <th style={{minWidth: '50px'}}>Guard Type</th>
                                        <th className="pr-0 text-right" style={{minWidth: '150px'}}>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        permissions.length > 0 ?
                                            permissions.map((permission, index) => (
                                                <tr key={permission.id}>
                                                    <td className="pl-0 py-7">
                                                        { from + index}
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{permission.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{permission.guard_name}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <button onClick={() => {setData(permission); clearErrors()}} data-toggle="modal" data-target="#updatePermissionsModal"
                                                                className="btn btn-icon btn-sm btn-light btn-hover-primary">
                                                            <i className="flaticon-edit text-success icon-1x" />
                                                        </button>
                                                        <button onClick={() => deleteHandler(permission)} className="btn btn-icon btn-sm btn-light btn-hover-danger mr-2 mx-3">
                                                            <i className="flaticon2-trash text-danger icon-1x" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={4} className="text-center p-7 font-weight-bolder">No records found in table</td>
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
