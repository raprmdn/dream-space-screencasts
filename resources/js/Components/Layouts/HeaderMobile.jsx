import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function HeaderMobile() {
    return (
        <>
            <div id="kt_header_mobile" className="header-mobile" style={{backgroundColor: '#13263c'}}>
                <Link href="/">
                    <img alt="Logo" src="/assets/media/logos/logo-letter-1.png" className="logo-default max-h-30px" />
                </Link>
                <div className="d-flex align-items-center">
                    <button className="btn btn-icon btn-hover-transparent-white p-0 ml-3" id="kt_header_mobile_topbar_toggle">
                      <span className="svg-icon svg-icon-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                            <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                          </g>
                        </svg>
                      </span>
                    </button>
                    <button className="btn p-0 burger-icon burger-icon-left ml-4" id="kt_header_mobile_toggle">
                        <span />
                    </button>
                </div>
            </div>
        </>
    )
}
