import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function BannerFooter() {
    return (
        <div>
            <div className="container positon-relative zindex-1 mb-n15 mb-lg-n20">
                <div className="d-flex align-items-stretch justify-content-between flex-wrap flex-md-nowrap rounded-lg shadow position-relative zindex-2" style={{background: 'linear-gradient(90deg, #20AA3E 0%, #03A588 100%)'}}>
                    <div className="d-flex flex-column justify-content-start align-items-start my-2 me-5 px-10 pt-6 pb-0 p-lg-10">
                        <div className="font-size-h2 text-white mb-2">
                            <span className="font-weight-bolder">Think About The Future,</span>
                            <span className="font-weight-light"> Stay Connected With Us.</span>
                        </div>
                        <div className="font-size-h6 font-weight-normal text-white opacity-75" style={{color: '#A8EAC9'}}>
                            Let's start the journey by joining our robust platform and learn more!
                        </div>
                    </div>
                    <div className="subscribe-form d-flex align-items-center m-0 bgi-no-repeat bgi-position-y-bottom bgi-position-x-right p-8 p-lg-12">
                        <Link href={route('register')} className="btn btn-lg btn-outline border-2 btn-outline-white flex-shrink-0 my-2">Join and become students!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
