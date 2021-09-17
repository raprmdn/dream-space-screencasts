import React from 'react';
import {Link, usePage} from "@inertiajs/inertia-react";

export default function QuickPanelUser() {
    const { auth } = usePage().props;
    return (
        <div>
            {auth.user !== null
            ?
                <div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
                    <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
                        <h3 className="font-weight-bold m-0">User Profile</h3>
                        <a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
                            <i className="ki ki-close icon-xs text-muted" />
                        </a>
                    </div>
                    <div className="offcanvas-content pr-5 mr-n5">
                        <div className="d-flex align-items-center mt-5">
                            <div className="symbol symbol-100 mr-5">
                                <div className="symbol-label" style={{backgroundImage: 'url(/assets/media/users/300_21.jpg)'}} />
                                <i className="symbol-badge bg-success" />
                            </div>
                            <div className="d-flex flex-column">
                                <a href="#" className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">{auth.user.name}</a>
                                <div className="text-muted mt-1">{auth.user.job_title}</div>
                                <div className="navi mt-2">
                                    <a href="#" className="navi-item">
                                <span className="navi-link p-0 pb-2">
                                  <span className="navi-icon mr-1">
                                    <span className="svg-icon svg-icon-lg svg-icon-primary">
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                          <rect x={0} y={0} width={24} height={24} />
                                          <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
                                          <circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                  <span className="navi-text text-muted text-hover-primary">{auth.user.email}</span>
                                </span>
                                    </a>
                                    <Link as="button" method="post" href={route('logout')} className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">Sign Out</Link>
                                </div>
                            </div>
                        </div>
                        <div className="separator separator-dashed mt-8 mb-5" />
                        <div className="navi navi-spacer-x-0 p-0">
                            <a href="/" className="navi-item">
                                <div className="navi-link">
                                    <div className="symbol symbol-40 bg-light mr-3">
                                        <div className="symbol-label">
                                          <span className="svg-icon svg-icon-md svg-icon-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <rect x={0} y={0} width={24} height={24} />
                                                <path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#000000" />
                                                <circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
                                              </g>
                                            </svg>
                                          </span>
                                        </div>
                                    </div>
                                    <div className="navi-text">
                                        <div className="font-weight-bold">My Profile</div>
                                        <div className="text-muted">Account settings and more</div>
                                    </div>
                                </div>
                            </a>
                            <a href="/" className="navi-item">
                                <div className="navi-link">
                                    <div className="symbol symbol-40 bg-light mr-3">
                                        <div className="symbol-label">
                                          <span className="svg-icon svg-icon-md svg-icon-warning">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <rect x={0} y={0} width={24} height={24} />
                                                <rect fill="#000000" opacity="0.3" x={12} y={4} width={3} height={13} rx="1.5" />
                                                <rect fill="#000000" opacity="0.3" x={7} y={9} width={3} height={8} rx="1.5" />
                                                <path d="M5,19 L20,19 C20.5522847,19 21,19.4477153 21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 C4.55228475,3 5,3.44771525 5,4 L5,19 Z" fill="#000000" fillRule="nonzero" />
                                                <rect fill="#000000" opacity="0.3" x={17} y={11} width={3} height={6} rx="1.5" />
                                              </g>
                                            </svg>
                                          </span>
                                        </div>
                                    </div>
                                    <div className="navi-text">
                                        <div className="font-weight-bold">Watchlist</div>
                                        <div className="text-muted">Courses you've been saved.</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            : ''
            }
        </div>
    )
}
