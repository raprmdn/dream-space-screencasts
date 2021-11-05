import React from 'react';

export default function ListTopics() {
    return (
        <>
            <div className="col-lg-3">
                <a href="">
                    <div className="d-flex align-items-center mb-5 bg-light-white bg-hover-white-o-3 rounded p-5 shadow-sm">
                        <span className="symbol symbol-35">
                            <img alt="Pic" src="/assets/media/startup.png"/>
                        </span>
                        <div className="d-flex flex-column text-left pl-3">
                            <span className="text-dark font-weight-bolder font-size-lg mb-1">Laravel</span>
                            <span className="text-dark-50 font-weight-bold font-size-xs">
                                12 Series • 112 Videos
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}
