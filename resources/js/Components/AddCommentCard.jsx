import React from 'react';

export default function AddCommentCard({modalTarget, auth, label, ...props}) {
    return (
        <div className="card card-custom card-transparent gutter-b" style={{border: '1px dashed #9CA3AF'}}>
            <button {...props} className="btn btn-link text-decoration-none text-dark-50"
                    data-toggle="modal" data-target={modalTarget}>
                <div className="card-body py-1 ml-n5">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-40 symbol-lg-35 symbol-circle mr-4">
                            {
                                auth
                                    ?
                                    (
                                        auth.profile_picture
                                            ? <img alt={`${auth.name} Avatar`} src={`/storage/${auth.profile_picture}`}/>
                                            : <img alt="Default Avatar" src="/assets/media/default-avatar.png"/>
                                    )
                                    : <img alt="Default Avatar" src="/assets/media/default-avatar.png"/>
                            }
                        </div>
                        <div>
                            {label}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}
