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
        <>
            <Head title="Dream Space - Register"/>
            <div className="login-form">
                <div className="text-center mb-10 mb-lg-20">
                    <h3 className="font-size-h1">Sign Up</h3>
                    <p className="text-muted font-weight-bold">Enter your credentials to create your account</p>
                </div>
                <form onSubmit={submitHandler} className="form">
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.name ? 'is-invalid' : ''}`}
                               type="text" placeholder="Fullname"
                               name="name" id="name"
                               value={data.name} onChange={changeHandler} />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.email ? 'is-invalid' : ''}`}
                               type="email" placeholder="Email"
                               name="email" id="email"
                               value={data.email} onChange={changeHandler}/>
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input className={`form-control form-control-solid h-auto py-5 px-6 ${errors.password ? 'is-invalid' : ''}`}
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
                    <div className="form-group">
                        <label className="checkbox mb-0">
                            <input type="checkbox" name="TOS" id="TOS"
                                   checked={data.TOS} onChange={changeHandler} required/>
                            <span />I Agree the
                            <Link href={"#"}>terms and conditions</Link></label>
                        {errors.TOS && (<div className="text-danger">Terms and conditions is required.</div>)}
                    </div>
                    <div className="form-group d-flex flex-wrap flex-center">
                        <button type="submit" className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4" disabled={processing}>
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            Submit
                        </button>
                        <Link href={route('login')} className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

Register.layout = (page) => <Guest children={page}/>
