import React from 'react';

export default function SeriesBannerMeta({icon, label}) {
    return (
        <div className="d-flex align-items-center pr-5 pt-2">
            <i className={`${icon} pr-3`}/>
            <span className="text-muted font-weight-bold">{label}</span>
        </div>
    )
}
