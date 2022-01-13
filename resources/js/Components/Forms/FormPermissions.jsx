import React from 'react';
import Label from "../Label";

export default function FormPermissions({data, submitHandler , changeHandler, submitLabel, errors, processing}) {
    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} className="form">
                    <div className="form-group">
                        <Label labelFor={"name"} children={"Permission Name"}/>
                        <span className="text-danger"> * </span>
                        <i className="fas fa-exclamation-circle font-size-sm"
                           data-container="body" data-toggle="tooltip" data-placement="right" title="Permission names is required to be unique."/>
                        <input type="text" id="name" name="name"
                               value={data.name} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.name ? 'is-invalid' : ''}`}
                               placeholder="Enter a permission name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"name"} children={"Guard Type"}/>
                        <i className="fas fa-exclamation-circle font-size-sm ml-1"
                           data-container="body" data-toggle="tooltip" data-placement="right" title="Guard name is default to web."/>
                        <input type="text" id="guard_name" name="guard_name"
                               value={data.guard_name} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.guard_name ? 'is-invalid' : ''}`}
                               placeholder="Enter guard name" />
                        {errors.guard_name && (<div className="invalid-feedback mb-n5">{errors.guard_name}</div>)}
                    </div>
                    <div className="text-center">
                        <button type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <button type="submit" className="btn btn-primary font-weight-bold" disabled={processing}>
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
