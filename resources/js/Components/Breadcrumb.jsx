import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import SubHeader from "./SubHeader";

export default function Breadcrumb({titleHeading, item1, linkItem1 = null, item2 = null, linkItem2 = null, item3 = null, linkItem3 = null, item4 = null}) {
    return (
        <>
            <SubHeader>
                <h2 className="text-white font-weight-bold my-2 mr-5">{titleHeading}</h2>
                <div className="d-flex align-items-center font-weight-bold my-2">
                    <Link href={route('home')} className="text-white text-hover-white opacity-75 hover-opacity-100">Dream Space</Link>
                    <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                    {
                        linkItem1 ?
                            <>
                                <Link href={linkItem1} className="text-white text-hover-white opacity-75 hover-opacity-100">{item1}</Link>
                            </>
                            :
                            <>
                                <span className="text-white text-hover-white opacity-75 hover-opacity-100">{item1}</span>
                            </>
                    }
                    {
                        linkItem2 ?
                            <>
                                <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                                <Link href={linkItem2} className="text-white text-hover-white opacity-75 hover-opacity-100">{item2}</Link>
                            </>
                            :
                            <>
                                <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                                <span className="text-white text-hover-white opacity-75 hover-opacity-100">{item2}</span>
                            </>
                    }
                    {
                        item3 && (
                            <>
                                <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                                <Link href={linkItem3} className="text-white text-hover-white opacity-75 hover-opacity-100">{item3}</Link>
                            </>
                        )
                    }
                    {
                        item4 && (
                            <>
                                <span className="label label-dot label-sm bg-white opacity-75 mx-3" />
                                <span className="text-white text-hover-white opacity-75 hover-opacity-100">{item4}</span>
                            </>
                        )
                    }
                </div>
            </SubHeader>
        </>
    )
}
