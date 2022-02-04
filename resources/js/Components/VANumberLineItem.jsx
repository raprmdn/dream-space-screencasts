import React from 'react';

export default function VANumberLineItem({label, number, ...props}) {
    return (
        <div className="mb-6">
            <div className="text-dark-50">{label}</div>
            <span className="font-weight-bolder font-size-h5">
                {number}
                <button {...props}
                        className="btn btn-icon btn-xs far fa-copy icon-md mb-2"/>
            </span>
        </div>
    )
}
