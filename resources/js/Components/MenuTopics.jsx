import React from 'react';

export default function MenuTopics() {
    return (
        <div className="container d-flex flex-column flex-column-fluid mt-n16 mb-5">
            <div className="card">
                <div className="d-flex align-items-center justify-content-center flex-wrap px-5 py-5 px-md-10 py-md-9">
                    <a className="btn btn-lg btn-hover-light-primary text-uppercase font-size-1 font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Laravel</a>
                    <a className="btn btn-lg btn-hover-light-primary text-uppercase font-size-1 font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Php</a>
                    <a className="btn btn-lg btn-hover-light-primary text-uppercase font-size-1 font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">React JS</a>
                    <a className="btn btn-lg btn-hover-light-primary text-uppercase font-size-1 font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Vue JS</a>
                </div>
            </div>
        </div>
    )
}
