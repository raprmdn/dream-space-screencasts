import React from 'react';

export default function Label({labelFor = null, children}) {
    return (
        <label htmlFor={labelFor} className="font-weight-bold">
            {children}
        </label>
    )
}
