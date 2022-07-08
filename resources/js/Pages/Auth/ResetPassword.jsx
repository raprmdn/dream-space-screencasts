import React from 'react';
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import Guest from "../../Layouts/Guest";

export default function ResetPassword({request}) {
    const {data, setData, errors, post, processing} = useForm({
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
        <>
            <Head title="Dream Space - Reset Password"/>
            <div className="login-form">
                <div className="text-center mb-10 mb-lg-20">
                    <h3 className="font-size-h1">Reset Password</h3>
                    <p className="text-muted font-weight-bold">Enter your new password to get back your account.</p>
                </div>
                <form onSubmit={submitHandler} className="form" autoComplete="off">
                    <input type="hidden" name="token" defaultValue={data.token}/>
                    <div className="form-group">
                        <input
                            className={`form-control form-control-solid h-auto py-5 px-6 ${errors.email ? 'is-invalid' : ''}`}
                            type="email" placeholder="Email"
                            name="email" id="email"
                            defaultValue={data.email} onChange={changeHandler}/>
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            className={`form-control form-control-solid h-auto py-5 px-6 ${errors.password ? 'is-invalid' : ''}`}
                            type="password" placeholder="Password"
                            name="password" id="password"
                            value={data.password} onChange={changeHandler}/>
                        {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-solid h-auto py-5 px-6"
                               type="password" placeholder="Confirm password"
                               name="password_confirmation" id="password_confirmation"
                               value={data.password_confirmation} onChange={changeHandler}/>
                    </div>
                    <div className="form-group d-flex flex-wrap flex-center">
                        <button type="submit" className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                disabled={processing}>
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

ResetPassword.layout = (page) => <Guest children={page}/>
