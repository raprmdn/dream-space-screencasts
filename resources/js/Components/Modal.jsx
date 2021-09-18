import React from 'react';

export default function Modal({trigger, title, children}) {
    return (
        <>
            <div className="modal fade" id={trigger} data-backdrop="static" tabIndex="-1" role="dialog"
                 aria-labelledby="staticBackdrop" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="font-weight-boldest mt-2" id="modalTitle">{title}</h3>
                            <button type="button" className="close btn-icon" data-dismiss="modal" aria-label="Close">
                                <i aria-hidden="true" className="ki ki-close"/>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
