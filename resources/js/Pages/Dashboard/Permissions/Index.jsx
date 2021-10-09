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
                                                        <span className="font-weight-bolder font-size-lg">{permission.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bolder font-size-lg">{permission.guard_name}</span>
                                                    </td>
                                                    <td className="pr-0 text-right">
                                                        <button onClick={() => {setData(permission); clearErrors()}} data-toggle="modal" data-target="#updatePermissionsModal"
                                                                className="btn btn-icon btn-sm btn-light btn-hover-primary">
                                                            <span className="svg-icon svg-icon-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                      <rect x={0} y={0} width={24} height={24} />
                                                                      <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fillRule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)" />
                                                                      <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                                    </g>
                                                                  </svg>
                                                            </span>
                                                        </button>
                                                        <button onClick={() => deleteHandler(permission)} className="btn btn-icon btn-sm btn-light btn-hover-danger mr-2 mx-3">
                                                            <span className="svg-icon svg-icon-3">
                                                              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                  <rect x={0} y={0} width={24} height={24} />
                                                                  <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero" />
                                                                  <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3" />
                                                                </g>
                                                              </svg>
                                                            </span>
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
