import React from 'react';

export default function SubHeader({children}) {
    return (
        <>
            <div className="subheader py-2 py-lg-12 subheader-transparent" id="kt_subheader">
                <div className="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <div className="d-flex flex-column">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
