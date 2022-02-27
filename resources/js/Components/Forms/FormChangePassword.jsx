import React from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormChangePassword({updateHandler, data, setData, errors, processing}) {
    return (
        <>
            <form onSubmit={updateHandler}>
                <div className="form-group">
                    <Label labelFor={"current_password"} children={"Current Password"}/>
                    <span className="text-danger"> * </span>
                    <input type="password" id="current_password" name="current_password"
                           value={data.current_password}
                           onChange={e => setData('current_password', e.target.value)}
                           className={`form-control ${errors.current_password && ('is-invalid')}`}
                           placeholder="Current Password" />
                    {errors.current_password && (<div className="invalid-feedback mb-n5">{errors.current_password}</div>)}
                </div>
                <div className="form-group">
                    <Label labelFor={"password"} children={"New Password"}/>
                    <span className="text-danger"> * </span>
                    <input type="password" id="password" name="password"
                           value={data.password}
                           onChange={e => setData('password', e.target.value)}
                           className={`form-control ${errors.password && ('is-invalid')}`}
                           placeholder="New Password" />
                    {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <Label labelFor={"password_confirmation"} children={"Password Confirmation"}/>
                    <span className="text-danger"> * </span>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                           value={data.password_confirmation}
                           onChange={e => setData('password_confirmation', e.target.value)}
                           className={`form-control ${errors.password_confirmation && ('is-invalid')}`}
                           placeholder="Password Confirmation" />
                    {errors.password_confirmation && (<div className="invalid-feedback mb-n5">{errors.password_confirmation}</div>)}
                </div>
                <div className="text-right">
                    <ButtonSubmit label={'Change Password'} processing={processing}/>
                </div>
            </form>
        </>
    )
}
