import React from 'react';
import Guest from "../../Layouts/Guest";
import {Head, Link, useForm} from "@inertiajs/inertia-react";

export default function ForgotPassword({flash}) {
    const {data, setData, errors, post, processing} = useForm({
        email: ''
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('password.request'), data)
    }
    return (
        <>
            <Head title="Dream Space - Forgot Password"/>
            <div className="login-form">
                <div className="text-center mb-10 mb-lg-20">
                    <h3 className="font-size-h1">Forgotten Password ?</h3>
                    <p className="text-muted font-weight-bold">Enter your email to reset your password</p>
                    {flash.status && (<div className="text-success">{flash.status}</div>)}
                </div>
                <form onSubmit={submitHandler} className="form">
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.email ? 'is-invalid' : ''}`}
                               type="email" placeholder="Email"
                               name="email" id="email"
                               value={data.email} onChange={changeHandler} />
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="form-group d-flex flex-wrap flex-center">
                        <button type="submit"
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4" disabled={processing}>
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            Submit
                        </button>
                        <Link href={route('login')}
                                className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4">Cancel
                        </Link>
                    </div>
                    <div/>
                </form>
            </div>
        </>
    )
}

ForgotPassword.layout = (page) => <Guest children={page}/>
