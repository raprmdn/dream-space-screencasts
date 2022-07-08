import React from 'react';
import {Link, Head} from "@inertiajs/inertia-react";

export default function Guest({children, title}) {
    return (
        <div className="vh-100 d-flex">
            <Head title={title}>
                <meta name="description" content="Login Dream Space for joining Robust Platform for Developer." />
                <link href="/assets/css/pages/login/classic/login-1.css" rel="stylesheet" type="text/css" />
            </Head>
            <div className="d-flex flex-column flex-root">
                <div className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white">
                    <div className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10" style={{backgroundImage: 'url(/assets/media/bg/bg-4.jpg)'}}>
                        <div className="d-flex flex-row-fluid flex-column justify-content-between">
                            <Link href={route('home')} className="flex-column-auto mt-5 pb-lg-0 pb-10">
                                <img src="/assets/media/startup.png" className="max-h-70px" alt=""/>
                            </Link>
                            <div className="flex-column-fluid d-flex flex-column justify-content-center">
                                <h3 className="font-size-h1 mb-5 text-white">Welcome to Dream Space!</h3>
                                <p className="font-weight-lighter text-white opacity-80">Dream Space is a Robust Platform for Developer!.</p>
                            </div>
                            <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                                <div className="opacity-70 font-weight-bold text-white">© 2022 Dream Space</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
                        <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
                            <span className="font-weight-bold text-dark-50">Dont have an account yet?</span>
                            <Link href={route('register')} className="font-weight-bold ml-2">Sign Up!</Link>
                        </div>
                        <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
