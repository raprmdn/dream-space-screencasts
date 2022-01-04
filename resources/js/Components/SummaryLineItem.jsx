import React from 'react';

export default function SummaryLineItem({label, textType, blinked = false, labelPrice}) {
    return (
        <div className="d-flex mb-3">
            <span className="text-dark-50 flex-root font-weight-bold">
                {label}
            </span>
            <span className={`${textType} flex-root font-weight-bold text-right ${blinked && ('blink_me')}`}>
                {labelPrice}
            </span>
        </div>
    )
}
