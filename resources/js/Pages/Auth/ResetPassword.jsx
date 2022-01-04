import React from 'react';
import {Head, useForm} from "@inertiajs/inertia-react";
import Guest from "../../Layouts/Guest";

export default function ResetPassword({request}) {
    const { data, setData, errors, post } = useForm({
        token: request.token,
        email: request.email,
        password: '',
        password_confirmation: ''
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('password.update'), data)
    }
    return (
        <div>
            <Head title="Dream Space - Reset Password"/>
            <div className="mb-20">
                <h3 className="opacity-50 font-weight-normal">Reset Password</h3>
                <p className="opacity-50">Enter your new password to get back your account.</p>
            </div>
            <form className="form text-center" onSubmit={submitHandler}>
                <input type="hidden" name="token" defaultValue={data.token} />
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.email ? 'is-invalid' : ''}`}
                           type="text" placeholder="Email" name="email" autoComplete="off" id="email"
                           defaultValue={data.email} onChange={changeHandler} />
                    {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.password ? 'is-invalid' : ''}`}
                           type="password" placeholder="Password" name="password" id="password"
                           value={data.password} onChange={changeHandler}/>
                    {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input className="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8"
                           type="password" placeholder="Confirm Password" name="password_confirmation" id="password_confirmation"
                           value={data.password_confirmation} onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2">Reset</button>
                </div>
            </form>
        </div>
    )
}

ResetPassword.layout = (page) => <Guest children={page}/>
