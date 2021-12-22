import React from 'react';

export default function ButtonIcon({ type, icon, label, ...props}) {
    return (
        <button {...props} className={`btn btn-${type} font-weight-bold mr-5`}>
            <i className={`${icon} mr-1`}/>
            {label}
        </button>
    )
}
