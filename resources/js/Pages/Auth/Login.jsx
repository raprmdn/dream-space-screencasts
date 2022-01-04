import React from 'react';
import Guest from "../../Layouts/Guest";
import {Head, Link, useForm} from "@inertiajs/inertia-react";

export default function Login({flash}) {
    const { data, setData , post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post('/login', data)
    }
    return (
        <div>
            <Head title="Dream Space - Login"/>
            <div className="mb-20">
                <h3 className="opacity-50 font-weight-normal">Sign In To Dream Space</h3>
                <p className="opacity-50">Enter your credentials to login your account.</p>
                {flash.status && (<div className="text-success">{flash.status}</div>)}
            </div>
            <form onSubmit={submitHandler} noValidate>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.email ? 'is-invalid' : ''}`}
                           type="email" placeholder="Email" name="email" id="email"
                           value={data.email} onChange={changeHandler} />
                    {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.password ? 'is-invalid' : ''}`}
                           type="password" placeholder="Password" name="password" id="password"
                           value={data.password} onChange={changeHandler}/>
                    {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                </div>
                <div className="form-group d-flex flex-wrap justify-content-between align-items-center px-8 opacity-60">
                    <div className="checkbox-inline">
                        <label className="checkbox checkbox-outline checkbox-white text-white m-0">
                            <input type="checkbox" name="remember" id="remember" />
                            <span />Remember me</label>
                    </div>
                    <Link href={route('password.request')} className="text-white font-weight-bold">Forgot Password ?</Link>
                </div>
                <div className="form-group text-center mt-10">
                    <button type="submit" className="btn btn-pill btn-primary opacity-90 px-15 py-3" disabled={processing}>
                        {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                        Sign In
                    </button>
                </div>
            </form>
            <div className="mt-10">
                <span className="opacity-50 mr-2">Don't have an account?</span>
                <Link href={route('register')} className="text-white opacity-30 font-weight-normal">Sign Up</Link>
            </div>
        </div>
    )
}

Login.layout = (page) => <Guest children={page}/>
