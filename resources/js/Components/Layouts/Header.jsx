import React from 'react';
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Header() {
    const { auth } = usePage().props;
    let segmentUrl = window.location.pathname;
    return (
        <>
            <div className="bgi-no-repeat" style={{backgroundColor: '#13263c'}}>
                <div id="kt_header" className="header header-fixed">
                    <div className="container d-flex align-items-stretch justify-content-between">
                        <div className="d-flex align-items-stretch mr-3">
                            <div className="header-logo">
                                <Link href="/">
                                    <img alt="Logo" src="/assets/media/logos/logo-letter-9.png" className="logo-default max-h-40px" />
                                    <img alt="Logo" src="/assets/media/logos/logo-letter-1.png" className="logo-sticky max-h-40px" />
                                </Link>
                            </div>
                            <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                                <div id="kt_header_menu" className="header-menu header-menu-left header-menu-mobile header-menu-layout-default">
                                    <ul className="menu-nav">
                                        <li className={`menu-item menu-item-open menu-item-rel ${route().current('home') ? 'menu-item-here' : ''}`}>
                                            <Link href={route('home')} className="menu-link">
                                                <span className="menu-text">Home</span>
                                            </Link>
                                        </li>
                                        {/*<li className="menu-item menu-item-submenu menu-item-rel">*/}
                                        {/*    <Link href="/" className="menu-link">*/}
                                        {/*        <span className="menu-text">Flash Sale</span>*/}
                                        {/*    </Link>*/}
                                        {/*</li>*/}
                                        <li className="menu-item menu-item-submenu menu-item-rel">
                                            <Link href="/" className="menu-link">
                                                <span className="menu-text">Series</span>
                                            </Link>
                                        </li>
                                        <li className={`menu-item menu-item-open menu-item-rel ${route().current('topics') ? 'menu-item-here' : ''}`}>
                                            <Link href={route('topics')} className="menu-link">
                                                <span className="menu-text">Topics</span>
                                            </Link>
                                        </li>
                                        {
                                            auth.can.includes('view dashboard') && (
                                                <li className={`menu-item menu-item-submenu menu-item-rel ${segmentUrl.split("/")[1] === 'p' ? 'menu-item-here' : ''}`}
                                                    data-menu-toggle="hover" aria-haspopup="true">
                                                    <Link href={route('home')} className="menu-link menu-toggle">
                                                        <span className="menu-text">Dashboard</span>
                                                        <span className="menu-desc" />
                                                        <i className="menu-arrow" />
                                                    </Link>
                                                    <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                                                        <ul className="menu-subnav">
                                                            {
                                                                auth.can.includes('courses') && (
                                                                    <li className={`menu-item menu-item-submenu ${segmentUrl.split("/")[2] === 'courses' ? 'menu-item-open menu-item-here' : ''}`}
                                                                        data-menu-toggle="hover" aria-haspopup="true">
                                                                        <a href="" className="menu-link menu-toggle">
                                                                            <div className="menu-icon">
                                                                                <i className="fas fa-video text-dark-25"/>
                                                                            </div>
                                                                            <span className="menu-text">Courses</span>
                                                                            <i className="menu-arrow" />
                                                                        </a>
                                                                        <div className="menu-submenu menu-submenu-classic menu-submenu-right">
                                                                            <ul className="menu-subnav">
                                                                                <li className={`menu-item ${route().current('series.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('series.index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Series</span>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className={`menu-item ${route().current('users.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('users.index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Videos</span>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                auth.can.includes('categories') && (
                                                                    <li className="menu-item" aria-haspopup="true">
                                                                        <Link href="/" className="menu-link">
                                                                            <div className="menu-icon">
                                                                                <i className="flaticon2-indent-dots text-dark-25"/>
                                                                            </div>
                                                                            <span className="menu-text">Categories</span>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                auth.can.includes('topics') && (
                                                                    <li className={`menu-item ${route().current('topics.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                        <Link href={route('topics.index')} className="menu-link">
                                                                            <div className="menu-icon">
                                                                                <i className="flaticon2-indent-dots text-dark-25"/>
                                                                            </div>
                                                                            <span className="menu-text">Topics</span>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                auth.can.includes('user management') && (
                                                                    <li className={`menu-item menu-item-submenu ${segmentUrl.split("/")[2] === 'user-management' ? 'menu-item-open menu-item-here' : ''}`}
                                                                        data-menu-toggle="hover" aria-haspopup="true">
                                                                        <a href="" className="menu-link menu-toggle">
                                                                              <span className="svg-icon menu-icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                                        <rect x={0} y={0} width={24} height={24}></rect>
                                                                                        <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3"></path>
                                                                                        <path d="M14.5,11 C15.0522847,11 15.5,11.4477153 15.5,12 L15.5,15 C15.5,15.5522847 15.0522847,16 14.5,16 L9.5,16 C8.94771525,16 8.5,15.5522847 8.5,15 L8.5,12 C8.5,11.4477153 8.94771525,11 9.5,11 L9.5,10.5 C9.5,9.11928813 10.6192881,8 12,8 C13.3807119,8 14.5,9.11928813 14.5,10.5 L14.5,11 Z M12,9 C11.1715729,9 10.5,9.67157288 10.5,10.5 L10.5,11 L13.5,11 L13.5,10.5 C13.5,9.67157288 12.8284271,9 12,9 Z" fill="#000000"></path>
                                                                                    </g>
                                                                                </svg>
                                                                              </span>
                                                                            <span className="menu-text">User Management</span>
                                                                            <i className="menu-arrow" />
                                                                        </a>
                                                                        <div className="menu-submenu menu-submenu-classic menu-submenu-right">
                                                                            <ul className="menu-subnav">
                                                                                <li className={`menu-item ${route().current('users.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('users.index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Users</span>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className={`menu-item ${route().current('roles.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('roles.index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Roles</span>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className={`menu-item ${route().current('permissions.index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('permissions.index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Permissions</span>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                auth.can.includes('menu management') && (
                                                                    <li className="menu-item" aria-haspopup="true">
                                                                        <Link href="/" className="menu-link">
                                                                            <span className="svg-icon menu-icon">
                                                                              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                                  <rect x={0} y={0} width={24} height={24} />
                                                                                  <rect fill="#000000" x={4} y={4} width={7} height={7} rx="1.5" />
                                                                                  <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                                                                </g>
                                                                              </svg>
                                                                            </span>
                                                                            <span className="menu-text">Menu Management</span>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                auth.can.includes('trash') && (
                                                                    <li className={`menu-item menu-item-submenu ${segmentUrl.split("/")[2] === 'trash' ? 'menu-item-open menu-item-here' : ''}`}
                                                                        data-menu-toggle="hover" aria-haspopup="true">
                                                                        <a href="" className="menu-link menu-toggle">
                                                                            <div className="menu-icon">
                                                                                <i className="flaticon2-trash"/>
                                                                            </div>
                                                                            <span className="menu-text">Trash</span>
                                                                            <i className="menu-arrow" />
                                                                        </a>
                                                                        <div className="menu-submenu menu-submenu-classic menu-submenu-right">
                                                                            <ul className="menu-subnav">
                                                                                <li className={`menu-item ${route().current('trash.topic_index') ? 'menu-item-active' : ''}`} aria-haspopup="true">
                                                                                    <Link href={route('trash.topic_index')} className="menu-link">
                                                                                        <i className="menu-bullet menu-bullet-dot">
                                                                                            <span />
                                                                                        </i>
                                                                                        <span className="menu-text">Topic</span>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </li>
                                            )

                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="topbar">
                            <div className="dropdown">
                                <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                    <div className="btn btn-icon btn-hover-transparent-white btn-lg btn-dropdown mr-1">
                                      <span className="svg-icon svg-icon-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                            <rect x={0} y={0} width={24} height={24} />
                                            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" />
                                          </g>
                                        </svg>
                                      </span>
                                    </div>
                                </div>
                                <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                                    <div className="quick-search quick-search-dropdown">
                                        <form className="quick-search-form">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <span className="svg-icon svg-icon-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                            <rect x={0} y={0} width={24} height={24} />
                                                            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" />
                                                          </g>
                                                        </svg>
                                                      </span>
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search..." />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className="quick-search-close ki ki-close icon-sm text-muted" />
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="quick-search-wrapper scroll" data-scroll="true" data-height={325} data-mobile-height={200} />
                                    </div>
                                </div>
                            </div>
                            {auth.user !== null
                                ?
                                <>
                                    <div className="dropdown">
                                        <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                            <div className="btn btn-icon btn-hover-transparent-white btn-dropdown btn-lg mr-2">
                                              <span className="svg-icon svg-icon-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                  <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                    <rect x={0} y={0} width={24} height={24} />
                                                    <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                    <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000" />
                                                  </g>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                        <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-xl dropdown-menu-anim-up">
                                            <form>
                                                <div className="d-flex align-items-center py-10 px-8 bgi-size-cover bgi-no-repeat rounded-top" style={{backgroundImage: 'url(/assets/media/misc/bg-1.jpg)'}}>
                                                    <span className="btn btn-md btn-icon bg-white-o-15 mr-4">
                                                        <i className="flaticon2-shopping-cart-1 text-success" />
                                                    </span>
                                                        <h4 className="text-white m-0 flex-grow-1 mr-3">My Cart</h4>
                                                        <button type="button" className="btn btn-success btn-sm">2 Items</button>
                                                </div>
                                                <div className="scroll scroll-push" data-scroll="true" data-height={250} data-mobile-height={200}>
                                                    <div className="separator separator-solid" />
                                                    <div className="d-flex align-items-center justify-content-between p-8">
                                                        <div className="d-flex flex-column mr-2">
                                                            <a href="#" className="font-weight-bold text-dark-75 font-size-lg text-hover-primary">SmartCleaner</a>
                                                            <span className="text-muted">Smart tool for cooking</span>
                                                            <div className="d-flex align-items-center mt-2">
                                                                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 650</span>
                                                            </div>
                                                        </div>
                                                        <a href="#" className="symbol symbol-70 flex-shrink-0">
                                                            <img src="/assets/media/stock-600x400/img-2.jpg" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="separator separator-solid" />
                                                    <div className="d-flex align-items-center justify-content-between p-8">
                                                        <div className="d-flex flex-column mr-2">
                                                            <a href="#" className="font-weight-bold text-dark-75 font-size-lg text-hover-primary">SmartCleaner</a>
                                                            <span className="text-muted">Smart tool for cooking</span>
                                                            <div className="d-flex align-items-center mt-2">
                                                                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 650</span>
                                                            </div>
                                                        </div>
                                                        <a href="#" className="symbol symbol-70 flex-shrink-0">
                                                            <img src="/assets/media/stock-600x400/img-2.jpg" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="separator separator-solid" />
                                                </div>
                                                <div className="p-8">
                                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                                        <span className="font-weight-bold text-muted font-size-sm mr-2">Total</span>
                                                        <span className="font-weight-bolder text-dark-50 text-right">$1840.00</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mb-7">
                                                        <span className="font-weight-bold text-muted font-size-sm mr-2">Sub total</span>
                                                        <span className="font-weight-bolder text-primary text-right">$5640.00</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <button type="button" className="btn btn-primary text-weight-bold">Place Order</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                            <div className="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto">
                                                <span className="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                                                <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">{auth.user.name.split(' ')[0]}</span>
                                                <span className="symbol symbol-35">
                                                <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">{auth.user.name.charAt(0)}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up w-300px mr-5">
                                            <div className="d-flex align-items-center p-8 rounded-lg">
                                                <div className="symbol symbol-50px mr-5">
                                                    <img alt="Logo" src="/assets/media/users/100_1.jpg" />
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex align-items-center font-weight-bolder">{auth.user.name}
                                                        {
                                                            !auth.user.email_verified_at &&
                                                            (
                                                                <span className="label label-light-danger label-pill" data-container="body" data-toggle="tooltip" data-placement="right" title="Please verify your email.">
                                                                    <i className="fas fa-exclamation-circle font-size-sm text-danger"/>
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                    <span className="font-weight-bold text-muted">{auth.user.email}</span>
                                                </div>
                                            </div>
                                            <div className="separator separator-solid"/>
                                            <div className="navi navi-bold navi-hover navi-link-rounded py-5">
                                                <div className="navi-item px-5">
                                                    <a href="#" className="navi-link">
                                                        <span className="navi-icon ml-n2">
                                                            <i className="far fa-user"/>
                                                        </span>
                                                        <span className="navi-text font-weight-bold">Profile</span>
                                                    </a>
                                                    <a href="#" className="navi-link">
                                                        <span className="navi-icon ml-n2">
                                                            <i className="far fa-bookmark"/>
                                                        </span>
                                                        <span className="navi-text font-weight-bold">Watchlist</span>
                                                    </a>
                                                </div>
                                                <div className="separator separator-solid my-4"/>
                                                <div className="navi-item px-5">
                                                    <a href="#" className="navi-link">
                                                            <span className="navi-icon ml-n2">
                                                                <i className="far fa-file-video"/>
                                                            </span>
                                                        <span className="navi-text font-weight-bold">Purchased Series</span>
                                                    </a>
                                                    <a href="#" className="navi-link">
                                                            <span className="navi-icon ml-n2">
                                                                <i className="fas fa-file-invoice"/>
                                                            </span>
                                                        <span className="navi-text font-weight-bold">Invoice</span>
                                                    </a>
                                                </div>
                                                <div className="separator separator-solid my-4"/>
                                                <div className="navi-item px-5">
                                                    <a href="#" className="navi-link">
                                                            <span className="navi-icon ml-n2">
                                                                <i className="flaticon2-gear"/>
                                                            </span>
                                                        <span className="navi-text font-weight-bold">Settings</span>
                                                    </a>
                                                    <Link as="button" method="post" href={route('logout')} className="navi-link btn btn-block text-left">
                                                            <span className="navi-icon ml-n2">
                                                                <i className="fas fa-sign-out-alt"/>
                                                            </span>
                                                        <span className="navi-text font-weight-bold">Sign Out</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="topbar-item">
                                    <Link href={route('login')}
                                          className="btn btn-flex btn-success font-weight-bolder d-flex ml-2">
                                        Sign In
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
