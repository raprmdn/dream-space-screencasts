import React, {useEffect} from 'react';
import Header from "../Components/Layouts/Header";
import {Head, usePage} from "@inertiajs/inertia-react"
import Footer from "../Components/Layouts/Footer";
import HeaderMobile from "../Components/Layouts/HeaderMobile";
import BannerFooter from "../Components/Layouts/BannerFooter";
import {toast, Toaster} from "react-hot-toast";

export default function App({children, title}) {
    const { flash, auth } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message)
    }, [flash])
    return (
        <>
            <Head title={title}/>
            <HeaderMobile/>
            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-row flex-column-fluid page">
                    <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                        <Header/>
                        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                            {flash.type && <Toaster position="top-right"/>}
                            {children}
                        </div>
                        {auth.user !== null
                            ? <></>
                            : <BannerFooter/>
                        }
                        <Footer/>
                    </div>
                </div>
            </div>
            <div id="kt_scrolltop" className="scrolltop">
              <span className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <rect fill="#000000" opacity="0.3" x={11} y={10} width={2} height={10} rx={1} />
                    <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" fill="#000000" fillRule="nonzero" />
                  </g>
                </svg>
              </span>
            </div>
        </>
    )
}
