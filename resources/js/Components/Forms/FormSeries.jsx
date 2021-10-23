import React from 'react';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const animatedComponents = makeAnimated();

export default function FormSeries({topicsData, submitHandler, data, setData, errors, processing, submitLabel, preview, setPreview}) {

    const optionsTopics = topicsData.map(topic => ({value: topic.id, label: topic.name}))

    const changeHandler = (e) => {
        let value
        if (e.target.id === 'thumbnail') {
            value = e.target.files[0]
            setData({...data, thumbnail: value})
            let reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(value)
        }
    }

    return (
        <div id="kt_blockui_content">
            <form className="form" onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <label className="font-weight-bold">Series Title</label>
                        <span className="text-danger"> * </span>
                        <input type="text" id="title" name="title"
                               value={data.title} onChange={(e) => setData('title', e.target.value)}
                               className={`form-control ${errors.title && ('is-invalid')}`}
                               placeholder="Enter a series title" />
                        {errors.title && (<div className="invalid-feedback mb-n5">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Series Topics</label>
                        <span className="text-danger"> * </span>
                        <Select
                            closeMenuOnSelect={false}
                            id="topics"
                            name="topics"
                            components={animatedComponents}
                            value={data.topics}
                            onChange={(e) => setData('topics', e)}
                            options={optionsTopics}
                            isMulti
                            placeholder="Select topics"
                        />
                        {errors.topics && (<span className="text-danger font-size-sm mb-n5">{errors.topics}</span>)}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Series Description</label>
                        <span className="text-danger"> * </span>
                        <textarea id="description" name="description"
                                  value={data.description} onChange={(e) => setData('description', e.target.value)}
                                  className={`form-control ${errors.description && ('is-invalid')}`}
                                  placeholder="Enter a series description" rows={10}>
                                    </textarea>
                        {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Price</label>
                            <input type="number" id="price" name="price"
                                   value={data.price} onChange={(e) => setData('price', e.target.value)}
                                   className={`form-control ${errors.price && ('is-invalid')}`}
                                   min={1}
                                   placeholder="Enter a series price" />
                            {errors.price && (<div className="invalid-feedback mb-n5">{errors.price}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Discount Price</label>
                            <input type="number" id="discount_price" name="discount_price"
                                   value={data.discount_price} onChange={(e) => setData('discount_price', e.target.value)}
                                   className={`form-control ${errors.discount_price && ('is-invalid')}`}
                                   min={1}
                                   placeholder="Enter a series discount price" />
                            {errors.discount_price && (<div className="invalid-feedback mb-n5">{errors.discount_price}</div>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Level</label>
                            <span className="text-danger"> * </span>
                            <select
                                id="levels"
                                name="levels"
                                className="form-control"
                                value={data.levels}
                                onChange={(e) => setData('levels', e.target.value)}
                                placeholder="Select level"
                            >
                                <option disabled hidden value="">Select series levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            {errors.levels && (<span className="text-danger font-size-sm mb-n5">{errors.levels}</span>)}
                        </div>
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Status</label>
                            <span className="text-danger"> * </span>
                            <select
                                id="levels"
                                name="levels"
                                className="form-control"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                placeholder="Select level"
                            >
                                <option disabled hidden value="">Select series status</option>
                                <option value="Completed">Completed</option>
                                <option value="Development">Development</option>
                            </select>
                            {errors.status && (<span className="text-danger font-size-sm mb-n5">{errors.status}</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Episode</label>
                            <span className="text-danger"> * </span>
                            <input type="number" id="episodes" name="episodes"
                                   value={data.episodes} onChange={(e) => setData('episodes', e.target.value)}
                                   className={`form-control ${errors.episodes && ('is-invalid')}`}
                                   placeholder="Enter a series episode" />
                            {errors.episodes && (<div className="invalid-feedback mb-n5">{errors.episodes}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Preview</label>
                            <input type="text" id="preview_series" name="preview_series"
                                   value={data.preview_series} onChange={(e) => setData('preview_series', e.target.value)}
                                   className={`form-control ${errors.preview_series && ('is-invalid')}`}
                                   placeholder="Enter a series preview url. ex:_XyBa8QsVQU" />
                            {errors.preview_series && (<div className="invalid-feedback mb-n5">{errors.preview_series}</div>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Source Code</label>
                            <input type="text" id="source_code" name="source_code"
                                   value={data.source_code} onChange={(e) => setData('source_code', e.target.value)}
                                   className={`form-control ${errors.source_code && ('is-invalid')}`}
                                   placeholder="Enter a series source code. ex: https://github.com/Rafi1112/dream-space-screencasts" />
                            {errors.source_code && (<div className="invalid-feedback mb-n5">{errors.source_code}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <label className="font-weight-bold">Series Project Demo</label>
                            <input type="text" id="project_demo" name="project_demo"
                                   value={data.project_demo} onChange={(e) => setData('project_demo', e.target.value)}
                                   className={`form-control ${errors.project_demo && ('is-invalid')}`}
                                   placeholder="Enter a series project demo. ex: projectdemo.com" />
                            {errors.project_demo && (<div className="invalid-feedback mb-n5">{errors.project_demo}</div>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-4 d-flex justify-content-center">
                            <div className="checkbox-inline">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           name="is_discount"
                                           id="is_discount"
                                           checked={!!data.is_discount}
                                           onChange={(e) => setData('is_discount', e.target.checked)}
                                    />
                                    <span />Discount Series</label>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center">
                            <div className="checkbox-inline">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           name="is_free"
                                           id="is_free"
                                           checked={!!data.is_free}
                                           onChange={(e) => setData('is_free', e.target.checked)}
                                    />
                                    <span />Free Series</label>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center">
                            <div className="checkbox-inline">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           name="archived_at"
                                           id="archived_at"
                                           checked={!!data.archived_at}
                                           onChange={(e) => setData('archived_at', e.target.checked)}
                                    />
                                    <span />Archive Series</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Series Thumbnail</label>
                        <span className="text-danger"> * Recommended 1280 x 720</span>
                        <input type="file"
                               className="form-control"
                               id="thumbnail"
                               name="thumbnail"
                               onChange={changeHandler}
                               accept="image/*"
                        />
                        {
                            preview && (
                                <LazyLoadImage
                                    effect="blur"
                                    src={preview}
                                    height={720}
                                    className="w-100 h-100 mt-3 rounded-lg" />
                            )
                        }
                        {errors.thumbnail && (<div className="text-danger font-size-sm mb-n5">{errors.thumbnail}</div>)}
                    </div>
                </div>
                <div className="card-footer border-0 text-right">
                    <button type="submit" className="btn btn-primary btn-block font-weight-bold" disabled={processing}>
                        {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    )
}
