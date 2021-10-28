import React from 'react';
import Select from "react-select";
import NumberFormat from 'react-number-format';

export default function FormVideos({seriesData, data, setData, submitHandler, errors, processing, submitLabel}) {
    const options = seriesData.map(series => ({value: series.id, label: series.title}))

    return (
        <div id="block_ui_form">
            <form className="form" onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <label className="font-weight-bold">Select Series</label>
                        <span className="text-danger"> * </span>
                        <Select
                            id="series"
                            name="series"
                            value={data.series}
                            onChange={(e) => setData('series', e)}
                            options={options}
                            placeholder="Select Series"
                        />
                        {errors.series && (<span className="text-danger font-size-sm mb-n5">{errors.series}</span>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Video Title</label>
                        <span className="text-danger"> * </span>
                        <input type="text" id="title" name="title"
                               value={data.title} onChange={e => setData('title', e.target.value)}
                               className={`form-control ${errors.title && ('is-invalid')}`}
                               placeholder="Enter a video title" />
                        {errors.title && (<div className="invalid-feedback mb-n5">{errors.title}</div>)}
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-4">
                            <label className="font-weight-bold">Video Source URL</label>
                            <span className="text-danger"> * </span>
                            <input type="text" id="source" name="source"
                                   value={data.source} onChange={e => setData('source', e.target.value)}
                                   className={`form-control ${errors.source && ('is-invalid')}`}
                                   placeholder="Video source ex: sAuEeM_6zpk" />
                            {errors.source && (<div className="invalid-feedback mb-n5">{errors.source}</div>)}
                        </div>
                        <div className="col-lg-4">
                            <label className="font-weight-bold">Video Episode</label>
                            <span className="text-danger"> * </span>
                            <input type="text" id="episode" name="episode"
                                   defaultValue={data.episode} onChange={e => setData('episode', e.target.value)}
                                   className={`form-control ${errors.episode && ('is-invalid')}`}
                                   placeholder="Enter a video episode" />
                            {errors.episode && (<div className="invalid-feedback mb-n5">{errors.episode}</div>)}
                        </div>
                        <div className="col-lg-4">
                            <label className="font-weight-bold">Video Runtime</label>
                            <span className="text-danger"> * </span>
                            <NumberFormat type="text" id="runtime" name="runtime"
                                          format="##:##:##" placeholder="hh:mm:ss"
                                          value={data.runtime} onChange={e => setData('runtime', e.target.value)}
                                          className={`form-control ${errors.runtime && ('is-invalid')}`} />
                            {errors.runtime && (<div className="invalid-feedback mb-n5">{errors.runtime}</div>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="checkbox-inline">
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="is_free"
                                       id="is_free"
                                       checked={!!data.is_free}
                                       onChange={e => setData('is_free', e.target.checked)}
                                />
                                <span />Free Video?</label>
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="is_archived"
                                       id="is_archived"
                                       checked={!!data.is_archived}
                                       onChange={e => setData('is_archived', e.target.checked)}
                                />
                                <span />Archive Video</label>
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
                </div>
            </form>
        </div>
    )
}
