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
                    <div className="text-center mt-10 font-weight-bold text-muted">OR</div>
                    <div className="d-flex mt-5 justify-content-center align-items-center">
                        <a href={route('sso.google')} className="btn btn-outline-secondary btn-block font-weight-bold bg-hover-gray-100 px-10 py-5 my-5">
                            <span className="svg-icon svg-icon-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20" fill="none">
                                    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
                                    <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
                                    <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
                                    <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
                                </svg>
                            </span>
                            Sign In with Google
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}

Login.layout = (page) => <Guest children={page}/>
