import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function SmallPagination({links}) {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center mb-5">
                <div className="d-flex flex-wrap py-2 mr-3">
                    {links.map((link, key) => (
                        <span key={key}>
                            <Link as="button"
                                  className={`btn btn-icon border-0 mr-2 my-1 btn-hover-primary btn-light-primary
                                  ${link.active && 'active'}
                                  ${link.url === null ? 'btn-light-dark disabled' : ''}`}
                                  disabled={link.url === null}
                                  key={key}
                                  href={link.url}
                                  dangerouslySetInnerHTML={{__html: link.label}}/>
                        </span>
                    ))}
                </div>
            </div>
        </>
    )
}
