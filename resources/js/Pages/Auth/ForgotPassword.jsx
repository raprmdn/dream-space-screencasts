import React from 'react';
import Guest from "../../Layouts/Guest";
import {Head, Link, useForm} from "@inertiajs/inertia-react";

export default function ForgotPassword({flash}) {
    const { data, setData, errors, post, processing } = useForm({
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
        <div>
            <Head title="Dream Space - Forgot Password"/>
            <div className="mb-20">
                <h3 className="opacity-50 font-weight-normal">Forgotten Password ?</h3>
                <p className="opacity-50">Enter your email to reset your password</p>
                {flash.status && (<div className="text-success">{flash.status}</div>)}
            </div>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group mb-10">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.email ? 'is-invalid' : ''}`}
                           type="email" placeholder="Email" name="email" id="email"
                           value={data.email} onChange={changeHandler} />
                    {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2" disabled={processing}>
                        {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                        Request
                    </button>
                    <Link href={route('login')} className="btn btn-pill btn-outline-white opacity-70 px-15 py-3 m-2">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

ForgotPassword.layout = (page) => <Guest children={page}/>
