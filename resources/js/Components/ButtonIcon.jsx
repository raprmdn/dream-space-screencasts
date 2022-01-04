import React from 'react';

export default function ButtonIcon({ type, loading = false, icon, label, ...props}) {
    return (
        <button {...props} className={`btn btn-${type} font-weight-bold mr-5`} disabled={loading}>
            <i className={`${icon} mr-1`}/>
            {label}
        </button>
    )
}
