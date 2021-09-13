import React from 'react';

export default function SectionFeature({title, description, url = "#"}) {
    return (
        <div className="py-2 py-lg-12 container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-center flex-wrap ml-n5">
                <div className="d-flex flex-column">
                    <h2 className="text-success font-weight-bolder">{title}</h2>
                    <div className="d-flex align-items-center font-weight-bold my-2">
                        <h6 className="text-dark opacity-75 hover-opacity-100">
                            {description}
                        </h6>
                    </div>
                </div>
            </div>
            <a href={url} className="btn btn-icon btn-success btn-sm mr-2">
                <i className="fas fa-chevron-right" />
            </a>
        </div>
    )
}
