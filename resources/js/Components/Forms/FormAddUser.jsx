import React from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormAddUser({data, setData, roles , submitHandler, errors, processing, submitLabel}) {
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <Label labelFor={"name"} children={"Full Name"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="name" name="name"
                               value={data.name} onChange={e => setData('name', e.target.value)}
                               className={`form-control ${errors.name && ('is-invalid')}`}
                               placeholder="Enter a full name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"username"} children={"Username"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="username" name="username"
                               value={data.username} onChange={e => setData('username', e.target.value)}
                               className={`form-control ${errors.username && ('is-invalid')}`}
                               placeholder="Enter a username" />
                        {errors.username && (<div className="invalid-feedback mb-n5">{errors.username}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"email"} children={"Email Address"}/>
                        <span className="text-danger"> * </span>
                        <input type="email" id="email" name="email"
                               value={data.email} onChange={e => setData('email', e.target.value)}
                               className={`form-control ${errors.email && ('is-invalid')}`}
                               placeholder="Enter a email address" />
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"password"} children={"Password"}/>
                        <span className="text-danger"> * </span>
                        <input type="password" id="password" name="password"
                               value={data.password} onChange={e => setData('password', e.target.value)}
                               className={`form-control ${errors.password && ('is-invalid')}`}
                               placeholder="Enter a password" />
                        {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"password_confirmation"} children={"Confirm Password"}/>
                        <span className="text-danger"> * </span>
                        <input type="password" id="password_confirmation" name="password_confirmation"
                               value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)}
                               className={`form-control ${errors.password_confirmation && ('is-invalid')}`}
                               placeholder="Enter a confirmation password" />
                        {errors.password_confirmation && (<div className="invalid-feedback mb-n5">{errors.password_confirmation}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"roles"} children={"Roles"}/>
                        <span className="text-danger"> * </span>
                        <select
                            id="roles"
                            name="roles"
                            className={`form-control ${errors.roles && ('is-invalid')}`}
                            value={data.roles}
                            onChange={(e) => setData('roles', e.target.value)}
                            placeholder="Select level"
                        >
                            <option disabled hidden value="">Select Roles</option>
                            {
                                roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))
                            }
                        </select>
                        {errors.roles && (<div className="invalid-feedback mb-n5">{errors.roles}</div>)}
                    </div>
                    <div className="form-group">
                        <div className="checkbox-inline">
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="verified_user"
                                       id="verified_user"
                                       checked={!!data.verified_user}
                                       onChange={e => setData('verified_user', e.target.checked)}
                                />
                                <span />Verified User Email</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <ButtonSubmit label={submitLabel} processing={processing}/>
                    </div>
                </div>
            </form>
        </>
    )
}
