import React from 'react';

export default function Jumbotron({children, sizeClass = 'min-h-350px min-h-lg-500px'}) {
    return (
        <div className={`d-flex flex-column flex-center w-100 ${sizeClass}`} style={{backgroundColor: '#13263c'}}>
            {children}
        </div>
    )
}
