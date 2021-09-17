import React from 'react';
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Footer() {
    const { auth } = usePage().props;
    return (
        <div>
            <footer className="footer " style={{backgroundColor: '#13263c'}}>
                <div className="h-150px h-lg-180px" />
                <div className="container mt-n15">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <div className="rounded-lg px-10 py-8 mr-lg-15 mb-7" style={{border: '1px dashed #2b3e5a'}}>
                                <h3 className="mb-3 text-white font-weight-bolder">Having any trouble ?</h3>
                                <div className="font-size-3 text-muted">
                                    Let us to know <a className="text-dark-50 text-hover-white font-weight-bold" href="/">me@rvimys.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-2 d-flex justify-content-center justify-content-lg-start">
                            <div className="pb-10">
                                <h3 className="text-muted mb-5 mb-lg-7 font-size-4">Start Learning</h3>
                                <div className="d-flex flex-column font-size-3 font-weight-bold">
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Series</a>
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Topics</a>
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Payment</a>
                                    {auth.user !== null
                                    ?
                                        <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Watchlist</a>
                                    :
                                        <>
                                            <Link href={route('login')} className="text-dark-50 text-hover-white py-2 py-lg-3">Sign In</Link>
                                            <Link href={route('register')} className="text-dark-50 text-hover-white py-2 py-lg-3">Sign Up</Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-2 d-flex justify-content-center justify-content-lg-start">
                            <div className="pb-10">
                                <h3 className="text-muted mb-5 mb-lg-7 font-size-4">Extras</h3>
                                <div className="d-flex flex-column font-size-3 font-weight-bold">
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Documentation</a>
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Videos</a>
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Blog</a>
                                    <a href="/" className="text-dark-50 text-hover-white py-2 py-lg-3">Github</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-2 d-flex justify-content-center justify-content-lg-start">
                            <div className="pb-10">
                                <h3 className="text-muted mb-5 mb-lg-7 font-size-4">Stay Connected</h3>
                                <div className="d-flex flex-column font-size-3 font-weight-bold">
                                    <a href="/" className="d-flex align-items-center text-center text-dark-50 text-hover-white py-2 py-lg-3">
                                        {/*<img src="https://keenthemes.com/images/social-icons/facebook.svg" data-lazy-src="https://keenthemes.com/images/social-icons/facebook.svg" className="w-20px mr-4 loaded" alt="" />*/}
                                        Facebook
                                    </a>
                                    <a href="/" className="d-flex align-items-center text-center text-dark-50 text-hover-white py-2 py-lg-3">
                                        {/*<img src="https://keenthemes.com/images/social-icons/twitter.svg" data-lazy-src="https://keenthemes.com/images/social-icons/twitter.svg" className="w-20px mr-4 loaded" alt="" />*/}
                                        Twitter
                                    </a>
                                    <a href="/" className="d-flex align-items-center text-center text-dark-50 text-hover-white py-2 py-lg-3">
                                        {/*<img src="https://keenthemes.com/images/social-icons/instagram.svg" data-lazy-src="https://keenthemes.com/images/social-icons/instagram.svg" className="w-20px mr-4 loaded" alt="" />*/}
                                        Instagram
                                    </a>
                                    <a href="/" className="d-flex align-items-center text-center text-dark-50 text-hover-white py-2 py-lg-3">
                                        {/*<img src="https://keenthemes.com/images/social-icons/github.svg" data-lazy-src="https://keenthemes.com/images/social-icons/github.svg" className="w-20px mr-4 loaded" alt="" />*/}
                                        Github
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{borderTop: '1px dashed #2b3e5a'}} />
                    <div className="container py-5 py-lg-10">
                        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between">
                        <span className="font-size-6 font-weight-bolder text-white pt-1">© 2021 Dream Space.</span>
                        <div className="d-flex align-items-center justify-content-center order-1 order-md-2 mb-5 mb-md-0">
                            <a href="/" target="_blank" className="text-dark-50 text-hover-white mr-8">Support</a>
                            <a href="/" target="_blank" className="text-dark-50 text-hover-white mr-8">Docs</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
