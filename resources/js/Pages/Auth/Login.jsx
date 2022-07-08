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
    console.log(data)
    return (
        <>
            <Head title="Dream Space - Login"/>
            <div className="login-form login-signin">
                <div className="text-center mb-10 mb-lg-20">
                    <h3 className="font-size-h1">Sign In to Dream Space</h3>
                    <p className="text-muted font-weight-bold">Enter your credentials to login your account.</p>
                    {flash.status && (<div className="text-success">{flash.status}</div>)}
                </div>
                <form onSubmit={submitHandler} className="form" autoComplete="off">
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.email ? 'is-invalid' : ''}`}
                               type="email" placeholder="Email"
                               name="email" id="email"
                               value={data.email} onChange={changeHandler} />
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.password ? 'is-invalid' : ''}`}
                               type="password" placeholder="Password"
                               name="password" id="password"
                               value={data.password} onChange={changeHandler}/>
                        {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <Link href={route('password.request')} className="text-dark-50 text-hover-primary my-3 mr-2">Forgot Password ?</Link>
                        <button type="submit" disabled={processing}
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3">
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

Login.layout = (page) => <Guest children={page}/>
