import React from 'react';

export default function Alert({type, icon, message}) {
    return (
        <div className={`alert alert-custom alert-${type} alert-shadow fade show gutter-b`} role="alert">
            <div className="alert-icon">
                <i className={icon}/>
            </div>
            <div className="alert-text font-weight-bolder">{message}</div>
        </div>
    )
}
