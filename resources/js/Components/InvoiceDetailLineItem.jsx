import React from 'react';

export default function InvoiceDetailLineItem({label, text}) {
    return (
        <>
            <div className="text-dark-50">{label}</div>
            <div className="font-weight-bolder font-size-h5 text-dark">
                {text}
            </div>
        </>
    )
}
