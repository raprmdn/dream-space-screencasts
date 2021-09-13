import React from 'react';

export default function Jumbotron({children}) {
    return (
        <div className="d-flex flex-column flex-center w-100 min-h-350px min-h-lg-500px" style={{backgroundColor: '#13263c'}}>
            {children}
        </div>
    )
}
