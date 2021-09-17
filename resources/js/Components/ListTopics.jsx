import React from 'react';

export default function ListTopics() {
    return (
        <>
            <div className="btn btn-outline-white d-inline-flex align-items-center btn-lg mr-5 px-8 mb-5">
                <span className="symbol symbol-30">
                    {/*<img alt="Pic" src="https://parsinta.com/vendors/laravel.svg"/>*/}
                    <img alt="Pic" src="/assets/media/users/user5.jpg"/>
                </span>
                <div className="d-flex flex-column text-right pl-3">
                    <span className="font-weight-bold font-size-lg">Laravel</span>
                </div>
            </div>
        </>
    )
}
