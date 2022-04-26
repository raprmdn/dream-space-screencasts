import React from 'react';

export default function MidtransResponseLineItem({label, value}) {
    return (
        <div className="col-6 col-md-4">
            <div className="mb-8 d-flex flex-column">
                <span className="text-dark font-weight-bold mb-4">{label}</span>
                <span className="text-muted font-weight-bolder font-size-lg">{value ? value : '-'}</span>
            </div>
        </div>
    )
}
