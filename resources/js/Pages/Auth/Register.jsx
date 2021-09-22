import React from 'react';
import Guest from "../../Layouts/Guest";
import {Link, Head, useForm} from "@inertiajs/inertia-react";

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        TOS: ''
    });
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('register'), data)
    }

    return (
        <div>
            <Head title="Dream Space | Register"/>
            <div className="mb-20">
                <h3 className="opacity-50 font-weight-normal">Sign Up</h3>
                <p className="opacity-50">Enter your credentials to create your account.</p>
            </div>
            <form className="form text-center" onSubmit={submitHandler}>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.name ? 'is-invalid' : ''}`}
                           type="text" placeholder="Full Name" name="name" id="name" autoComplete="off"
                           value={data.name} onChange={changeHandler} />
                    {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.email ? 'is-invalid' : ''}`}
                           type="email" placeholder="Email" name="email" id="email" autoComplete="off"
                           value={data.email} onChange={changeHandler} />
                    {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input className={`form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8
                                        ${errors.password ? 'is-invalid' : ''}`}
                           type="password" placeholder="Password" name="password" id="password"
                           value={data.password} onChange={changeHandler} />
                    {errors.password && (<div className="invalid-feedback mb-n5">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input className="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8"
                           type="password" placeholder="Confirm Password" name="password_confirmation" id="password_confirmation"
                           value={data.password_confirmation} onChange={changeHandler}/>
                </div>
                <div className="form-group text-left px-8">
                    <div className="checkbox-inline">
                        <label className="checkbox checkbox-outline checkbox-white opacity-60 text-white m-0">
                            <input type="checkbox" name="TOS" id="TOS"
                                   checked={data.TOS} onChange={changeHandler} required/>
                            <span />I Agree the
                            <a href="#" className="text-white font-weight-bold ml-1">terms and conditions</a>.</label>
                        {errors.TOS && (<div className="text-danger">Terms and conditions is required.</div>)}
                    </div>
                    <div className="form-text text-muted text-center" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2" disabled={processing}>
                        {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                        Sign Up
                    </button>
                </div>
            </form>
            <div className="mt-10">
                <span className="opacity-50 mr-2">Already have an account?</span>
                <Link href={route('login')} className="text-white opacity-30 font-weight-normal">Sign In</Link>
            </div>
        </div>
    )
}

Register.layout = (page) => <Guest children={page}/>
