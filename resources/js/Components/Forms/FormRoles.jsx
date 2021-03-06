import React from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormRoles({permissionsData, data, submitHandler , changeHandler, checkedHandler, submitLabel, errors, processing}) {
    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} className="form">
                    <div className="form-group">
                        <Label labelFor={"name"} children={"Role Name"}/>
                        <span className="text-danger"> * </span>
                        <i className="fas fa-exclamation-circle font-size-sm"
                           data-container="body" data-toggle="tooltip" data-placement="right" title="Role names is required to be unique."/>
                        <input type="text" id="name" name="name"
                               value={data.name} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.name ? 'is-invalid' : ''}`}
                               placeholder="Enter a role name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"guard_name"} children={"Guard Type"}/>
                        <i className="fas fa-exclamation-circle font-size-sm ml-1"
                           data-container="body" data-toggle="tooltip" data-placement="right" title="Guard name is default to web."/>
                        <input type="text" id="guard_name" name="guard_name"
                               value={data.guard_name} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.guard_name ? 'is-invalid' : ''}`}
                               placeholder="Enter guard name" />
                        {errors.guard_name && (<div className="invalid-feedback mb-n5">{errors.guard_name}</div>)}
                    </div>
                    <div className="form-group">
                        <Label children={"Role Permissions"}/>
                        <div className="checkbox-list">
                            {
                                permissionsData.map((permission) => (
                                    <label className="checkbox" key={permission.id}>
                                        <input type="checkbox" name="permissions" id="permissions"
                                               value={permission.id}
                                               checked={data.permissions.includes(permission.id)}
                                               onChange={checkedHandler}
                                                />
                                        <span/> <div className="font-weight-bold text-dark-50">{permission.name}</div>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <ButtonSubmit label={submitLabel} processing={processing}/>
                    </div>
                </form>
            </div>
        </>
    )
}
