import React, {useEffect, useRef, useState} from 'react';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";
import Modal from "../Modal";
import CodeBlock from "../CodeBlock";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { keyTab } from "../Helpers";

const animatedComponents = makeAnimated();

export default function FormSeries({topicsData, submitHandler, data, setData, errors, processing, submitLabel}) {
    const fileInput = useRef()
    const [ previewImage, setPreviewImage ] = useState(data.thumbnail ? data.thumbnail : null)
    const [ previewDescription, setPreviewDescription ] = useState('')
    const optionsTopics = topicsData.map(topic => ({value: topic.id, label: topic.name}))
    const [ isFreeSeries, setIsFreeSeries ] = useState(!!data.is_free)
    const [ discountPlaceholder, setDiscountPlaceholder ] = useState('')

    useEffect(() => {
        if ( isFreeSeries ) {
            setDiscountPlaceholder('Discount not available, because you set free for this series.')
        } else if ( !data.is_discount ) {
            setDiscountPlaceholder('Discount not available for this series.')
        } else {
            setDiscountPlaceholder('Enter a discount price')
        }
    }, [data.is_discount, isFreeSeries])

    const changeHandler = (e) => {
        let value = e.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
            setPreviewImage(reader.result)
        }
        reader.readAsDataURL(value)
        setData('thumbnail', value)
    }

    const removePicture = () => {
        setData('thumbnail', null)
        setPreviewImage(null)
        fileInput.current.value = null
    }

    const _previewDescription = () => {
        setPreviewDescription(data.description)
    }

    const _closeModal = () => {
        setPreviewDescription('')
    }

    const freeSeriesHandler = (e) => {
        setIsFreeSeries(!isFreeSeries)
        setData({
            ...data,
            is_free: e.target.checked,
            is_discount: false,
            price: '',
            discount_price: '',
        })
    }

    return (
        <div id="block_ui_form">
            <form className="form" onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <Label labelFor={"title"} children={"Series Title"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="title" name="title"
                               value={data.title} onChange={(e) => setData('title', e.target.value)}
                               className={`form-control ${errors.title && ('is-invalid')}`}
                               placeholder="Enter a series title" />
                        {errors.title && (<div className="invalid-feedback mb-n5">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"topics"} children={"Series Topics"}/>
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
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Label labelFor={"description"} children={"Series Description"}/>
                                <span className="text-danger"> * </span>
                            </div>
                            <div className="mb-1 text-dark-75">
                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                        data-toggle="modal" data-target="#preview"
                                        disabled={!data.description}
                                        onClick={_previewDescription}>
                                    <i className="fa fa-search icon-sm mr-1"/>
                                    Preview
                                </button>
                            </div>
                        </div>
                        <textarea id="description" name="description"
                                  value={data.description} onChange={(e) => setData('description', e.target.value)}
                                  className={`form-control ${errors.description && ('is-invalid')}`}
                                  placeholder="Enter a series description" rows={10} onKeyDown={keyTab}>
                                    </textarea>
                        <span className="form-text text-muted"> * You may use Markdown with
                            <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank">
                                &nbsp;GitHub-flavored
                            </a> code blocks.
                        </span>
                        {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <div className="checkbox-list">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           name="is_free"
                                           id="is_free"
                                           checked={isFreeSeries}
                                           onChange={(e) => freeSeriesHandler(e)}
                                    />
                                    <span />Free Series
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="checkbox-list">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           name="is_discount"
                                           id="is_discount"
                                           checked={data.is_discount}
                                           disabled={isFreeSeries}
                                           onChange={(e) => setData({
                                               ...data,
                                               is_discount: e.target.checked,
                                               discount_price: '',
                                           })}
                                    />
                                    <span />Discount Series
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <Label labelFor={"price"} children={"Series Price"}/>
                            {!isFreeSeries && (<span className="text-danger"> * </span>)}
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Rp.</span>
                                </div>
                                <input type="number" id="price" name="price"
                                       value={data.price} onChange={(e) => setData('price', e.target.value)}
                                       className={`form-control ${errors.price && ('is-invalid')}`}
                                       min={1}
                                       disabled={isFreeSeries}
                                       placeholder={isFreeSeries ? 'Price is not available, because you set free for this series.' : 'Enter a series price'} />
                                {errors.price && (<div className="invalid-feedback mb-n5">{errors.price}</div>)}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Label labelFor={"discount_price"} children={"Series Discount Price"}/>
                            {data.is_discount && (<span className="text-danger"> * </span>)}
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Rp.</span>
                                </div>
                                <input type="number" id="discount_price" name="discount_price"
                                       value={data.discount_price} onChange={(e) => setData('discount_price', e.target.value)}
                                       className={`form-control ${errors.discount_price && ('is-invalid')}`}
                                       min={1}
                                       disabled={!data.is_discount || isFreeSeries}
                                       placeholder={discountPlaceholder} />
                                {errors.discount_price && (<div className="invalid-feedback mb-n5">{errors.discount_price}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <Label labelFor={"levels"} children={"Series Level"}/>
                            <span className="text-danger"> * </span>
                            <select
                                id="levels"
                                name="levels"
                                className={`form-control ${errors.levels && ('is-invalid')}`}
                                value={data.levels}
                                onChange={(e) => setData('levels', e.target.value)}
                                placeholder="Select level"
                            >
                                <option disabled hidden value="">Select series levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            {errors.levels && (<div className="invalid-feedback mb-n5">{errors.levels}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <Label labelFor={"status"} children={"Series Status"}/>
                            <span className="text-danger"> * </span>
                            <select
                                id="status"
                                name="status"
                                className={`form-control ${errors.status && ('is-invalid')}`}
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                placeholder="Select status"
                            >
                                <option disabled hidden value="">Select series status</option>
                                <option value="Completed">Completed</option>
                                <option value="Development">Development</option>
                            </select>
                            {errors.status && (<div className="invalid-feedback mb-n5">{errors.status}</div>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <Label labelFor={"episodes"} children={"Series Episode"}/>
                            <span className="text-danger"> * </span>
                            <input type="number" id="episodes" name="episodes"
                                   value={data.episodes} onChange={(e) => setData('episodes', e.target.value)}
                                   className={`form-control ${errors.episodes && ('is-invalid')}`}
                                   placeholder="Enter a series episode" />
                            {errors.episodes && (<div className="invalid-feedback mb-n5">{errors.episodes}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <Label labelFor={"preview_series"} children={"Series Preview"}/>
                            <input type="text" id="preview_series" name="preview_series"
                                   value={data.preview_series} onChange={(e) => setData('preview_series', e.target.value)}
                                   className={`form-control ${errors.preview_series && ('is-invalid')}`}
                                   placeholder="Enter a series preview url. ex: cM963tI7Q_k" />
                            {errors.preview_series && (<div className="invalid-feedback mb-n5">{errors.preview_series}</div>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-6">
                            <Label labelFor={"source_code"} children={"Series Source Code"}/>
                            <input type="text" id="source_code" name="source_code"
                                   value={data.source_code} onChange={(e) => setData('source_code', e.target.value)}
                                   className={`form-control ${errors.source_code && ('is-invalid')}`}
                                   placeholder="Enter a series source code. ex: https://github.com/raprmdn/dream-space-screencasts" />
                            {errors.source_code && (<div className="invalid-feedback mb-n5">{errors.source_code}</div>)}
                        </div>
                        <div className="col-lg-6">
                            <Label labelFor={"project_demo"} children={"Series Project Demo"}/>
                            <input type="text" id="project_demo" name="project_demo"
                                   value={data.project_demo} onChange={(e) => setData('project_demo', e.target.value)}
                                   className={`form-control ${errors.project_demo && ('is-invalid')}`}
                                   placeholder="Enter a series project demo. ex: projectdemo.com" />
                            {errors.project_demo && (<div className="invalid-feedback mb-n5">{errors.project_demo}</div>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="checkbox-list">
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="archived_at"
                                       id="archived_at"
                                       checked={!!data.archived_at}
                                       onChange={(e) => setData('archived_at', e.target.checked)}
                                />
                                <span />Archive Series
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <Label labelFor={"thumbnail"} children={"Series Thumbnail"}/>
                        <span className="text-danger"> * Recommended Thumbnail : 1280 x 720 or 1920 x 1080</span>
                        <input type="file"
                               className="form-control"
                               id="thumbnail"
                               name="thumbnail"
                               accept=".png, .jpg, .jpeg, .svg"
                               onChange={changeHandler}
                               ref={fileInput}
                        />
                        {
                            previewImage && (
                                <div className="position-relative">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={previewImage}
                                        className="my-3 rounded-lg mw-100" />
                                    <button onClick={removePicture} className="btn btn-xs btn-icon btn-circle btn-white btn-shadow position-absolute mt-3 top-0 right-0">
                                        <i className="ki ki-bold-close icon-xs text-muted" />
                                    </button>
                                </div>
                            )
                        }
                        {errors.thumbnail && (<div className="text-danger font-size-sm mb-n5">{errors.thumbnail}</div>)}
                    </div>
                </div>
                <div className="card-footer border-0 text-right">
                    <ButtonSubmit label={submitLabel} optionalClass={"btn-block"} processing={processing}/>
                </div>
            </form>
            {
                previewDescription && (
                    <Modal trigger={"preview"} title={"Preview Description"} size={"modal-xl"} onClick={_closeModal}>
                        <div className="card-body">
                            <ReactMarkdown children={previewDescription}
                                           components={CodeBlock}
                                           remarkPlugins={[remarkGfm]}/>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}
