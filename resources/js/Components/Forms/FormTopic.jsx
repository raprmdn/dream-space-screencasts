import React from 'react';

export default function FormTopic({submitHandler, data, errors, submitLabel, changeHandler, processing}) {
    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} className="form" encType="multipart/form-data">
                    <div className="form-group">
                        <label className="font-weight-bold">Topic Name</label>
                        <span className="text-danger"> * </span>
                        <input type="text" id="name" name="name"
                               value={data.name} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.name ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Topic Description</label>
                        <span className="text-danger"> * </span>
                        <textarea id="description" name="description"
                               value={data.description} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.description ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic description" rows={5}>
                        </textarea>
                        {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Topic Position</label>
                        <span className="text-danger"> * </span>
                        <input type="number" id="position" name="position"
                               value={data.position} onChange={changeHandler}
                               className={`form-control form-control-solid ${errors.position ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic position" min={1} />
                        {errors.position && (<div className="invalid-feedback mb-n5">{errors.position}</div>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Topic Image</label>
                        <span className="text-danger"> * </span>
                        <div>
                            <div className="image-input image-input-outline" id="topic_picture">
                                <div className="image-input-wrapper" />
                                <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" data-original-title="Change picture">
                                    <i className="fa fa-pen icon-sm text-muted" />
                                    <input type="file"
                                           name="picture"
                                           id="picture"
                                           accept=".png, .jpg, .jpeg, .svg"
                                           onChange={changeHandler}
                                    />
                                </label>
                            </div>
                            <span className="form-text text-muted">Allowed file types: png, jpg, jpeg, svg.</span>
                        </div>
                        {errors.picture && (<div className="text-danger font-size-sm mb-n5">{errors.picture}</div>)}
                    </div>
                    <div className="form-group">
                        <div className="checkbox-inline">
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="is_archived"
                                       id="is_archived"
                                       onChange={changeHandler}
                                       checked={data.is_archived}
                                />
                                <span />Archive the topic?</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <button type="submit" className="btn btn-primary font-weight-bold" disabled={processing}>
                            {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
