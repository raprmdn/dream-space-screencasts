import React from 'react';
import {Link, Head} from "@inertiajs/inertia-react";

export default function Guest({children, title}) {
    return (
        <div className="vh-100 d-flex">
            <Head title={title}>
                <meta name="description" content="Login Dream Space for joining Robust Platform for Developer." />
                <link href="/assets/css/pages/login/classic/login-5.css" rel="stylesheet" type="text/css" />
            </Head>
            <div className="d-flex flex-column flex-root">
                <div className="login login-5 login-signin-on d-flex flex-row-fluid">
                    <div className="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" style={{backgroundImage: 'url(/assets/media/bg/bg-2.jpg)'}}>
                        <div className="login-form text-center text-white p-7 position-relative overflow-hidden">
                            <div className="d-flex flex-center mb-15">
                                <Link href="/">
                                    <img src="/assets/media/logos/logo-letter-13.png" className="max-h-75px" alt="" />
                                </Link>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
