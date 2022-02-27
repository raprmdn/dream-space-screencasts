import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function SidebarProfileSettings() {
    return (
        <>
            <div className="card card-custom gutter-b">
                <div className="card-body pt-4">
                    <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                        <div className="navi-item mb-2 mt-5">
                            <Link href={route('profile.settings')}
                                  className={`navi-link py-4 ${route().current('profile.settings') ? 'active' : ''}`}>
                                <span className="navi-icon"><i className="flaticon2-settings mr-4" /></span>
                                <span className="navi-text font-size-lg">Profile Information</span>
                            </Link>
                        </div>
                    </div>
                    <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                        <div className="navi-item mb-2">
                            <Link href={route('profile.change-password')}
                                  className={`navi-link py-4 ${route().current('profile.change-password') ? 'active' : ''}`}>
                                <span className="navi-icon"><i className="fas fa-shield-alt mr-4" /></span>
                                <span className="navi-text font-size-lg">Change Password</span>
                            </Link>
                        </div>
                    </div>
                    <div className="separator separator-solid"/>
                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                        <div className="navi-item mb-2">
                            <Link href={route('watchlist.index')}
                                  className="navi-link py-4">
                                <span className="navi-icon"><i className="fas fa-bookmark mr-4" /></span>
                                <span className="navi-text font-size-lg">Watchlist</span>
                            </Link>
                        </div>
                    </div>
                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                        <div className="navi-item mb-2">
                            <Link href={route('my-library')}
                                  className="navi-link py-4">
                                <span className="navi-icon"><i className="flaticon-medal mr-4" /></span>
                                <span className="navi-text font-size-lg">My Library</span>
                            </Link>
                        </div>
                    </div>
                    <div className="separator separator-solid"/>
                    <div className="navi navi-bold navi-hover navi-link-rounded mt-2">
                        <div className="navi-item">
                            <Link href={route('invoice.mine')}
                                  className="navi-link py-4">
                                <span className="navi-icon"><i className="flaticon-price-tag mr-4" /></span>
                                <span className="navi-text font-size-lg">Invoice</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
