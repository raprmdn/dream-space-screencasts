import React from 'react';

export default function CommentPopUp({trigger, children}) {
    return (
        <div className="modal modal-sticky modal-sticky-bottom-right-custom" id={trigger} role="dialog" data-backdrop="static">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}
