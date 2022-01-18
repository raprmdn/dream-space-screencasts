import React from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormAssignRoleUser({data, submitHandler , changeHandler, submitLabel, errors, processing}) {
    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} className="form">
                    <div className="form-group">
                        <Label labelFor={"email"} children={"User Email"}/>
                        <input type="email" id="email" name="email"
                               value={data.email} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.email ? 'is-invalid' : ''}`}
                               placeholder="Enter user email" />
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
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
