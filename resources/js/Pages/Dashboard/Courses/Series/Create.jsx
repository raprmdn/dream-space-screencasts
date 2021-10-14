import React, {useEffect, useState} from 'react';
import App from "../../../../Layouts/App";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../../Components/Breadcrumb";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function Create() {
    const { topics: topicsData } = usePage().props
    const optionsTopics = topicsData.map(topic => ({
        value: topic.id,
        label: topic.name
    }))
    const optionsLevel = [
        { value: 'Beginner', label: 'Beginner'},
        { value: 'Intermediate', label: 'Intermediate'},
        { value: 'Advanced', label: 'Advanced'}
    ]
    const optionsStatus = [
        { value: 'Completed', label: 'Completed'},
        { value: 'Development', label: 'Development'},
    ]
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [ preview, setPreview ] = useState(null)
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        topics: [],
        description: '',
        price: '',
        discount_price: '',
        levels: '',
        status: '',
        episodes: '',
        preview_series: '',
        source_code: '',
        project_demo: '',
        thumbnail: '',
        is_discount: false,
        is_free: false,
        archived_at: false
    })

    useEffect(() => {
        setData({
            ...data,
            topics: selectedOption.map(obj => obj.value),
            levels: selectedLevel.value,
            status: selectedStatus.value
        })
    }, [selectedOption, selectedLevel, selectedStatus])

    const changeHandler = (e) => {
        let value
        switch (e.target.id) {
            case 'thumbnail':
                value = e.target.files[0]
                let reader = new FileReader()
                reader.onload = () => {
                    setPreview(reader.result)
                }
                reader.readAsDataURL(value)
                break;
            case 'is_discount':
            case 'is_free':
            case 'archived_at':
                value = e.target.checked
                break;
            default:
                value = e.target.value
                break;
        }
        setData({
            ...data,
            [e.target.id]: value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('series.store'), data)
    }
    return (
        <>
            <Head title="Dream Space | Create Series"/>
            <Breadcrumb
                titleHeading="Series"
                item1="Dashboard"
                item2="Courses"
                item3="Series" linkItem3={route('series.index')}
                item4="Create"
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Create Series
                            </h3>
                            <div className="card-toolbar">
                                <Link href={route('series.index')} className="btn btn-primary font-weight-bold">
                                    <i className="flaticon2-left-arrow-1 icon-1x"/> Back
                                </Link>
                            </div>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="font-weight-bold">Series Title</label>
                                <span className="text-danger"> * </span>
                                <input type="text" id="title" name="title"
                                       value={data.title} onChange={changeHandler}
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
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    isMulti
                                    options={optionsTopics}
                                    placeholder="Select topics"
                                />
                                {errors.topics && (<span className="text-danger font-size-sm mb-n5">{errors.topics}</span>)}
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Series Description</label>
                                <span className="text-danger"> * </span>
                                <textarea id="description" name="description"
                                          value={data.description} onChange={changeHandler}
                                          className={`form-control ${errors.description && ('is-invalid')}`}
                                          placeholder="Enter a series description" rows={10}>
                                </textarea>
                                {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Price</label>
                                    <input type="number" id="price" name="price"
                                           value={data.price} onChange={changeHandler}
                                           className={`form-control ${errors.price && ('is-invalid')}`}
                                           min={1}
                                           placeholder="Enter a series price" />
                                    {errors.price && (<div className="invalid-feedback mb-n5">{errors.price}</div>)}
                                </div>
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Discount Price</label>
                                    <input type="number" id="discount_price" name="discount_price"
                                           value={data.discount_price} onChange={changeHandler}
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
                                    <Select
                                        id="levels"
                                        name="levels"
                                        defaultValue={selectedLevel}
                                        onChange={setSelectedLevel}
                                        options={optionsLevel}
                                        placeholder="Select level"
                                    />
                                    {errors.levels && (<span className="text-danger font-size-sm mb-n5">{errors.levels}</span>)}
                                </div>
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Status</label>
                                    <span className="text-danger"> * </span>
                                    <Select
                                        id="status"
                                        name="status"
                                        defaultValue={selectedStatus}
                                        onChange={setSelectedStatus}
                                        options={optionsStatus}
                                        placeholder="Select status"
                                    />
                                    {errors.status && (<span className="text-danger font-size-sm mb-n5">{errors.status}</span>)}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Episode</label>
                                    <span className="text-danger"> * </span>
                                    <input type="number" id="episodes" name="episodes"
                                           value={data.episodes} onChange={changeHandler}
                                           className={`form-control ${errors.episodes && ('is-invalid')}`}
                                           placeholder="Enter a series episode" />
                                    {errors.episodes && (<div className="invalid-feedback mb-n5">{errors.episodes}</div>)}
                                </div>
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Preview</label>
                                    <input type="text" id="preview_series" name="preview_series"
                                           value={data.preview_series} onChange={changeHandler}
                                           className={`form-control ${errors.preview_series && ('is-invalid')}`}
                                           placeholder="Enter a series preview url. ex:_XyBa8QsVQU" />
                                    {errors.preview_series && (<div className="invalid-feedback mb-n5">{errors.preview_series}</div>)}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Source Code</label>
                                    <input type="text" id="source_code" name="source_code"
                                           value={data.source_code} onChange={changeHandler}
                                           className={`form-control ${errors.source_code && ('is-invalid')}`}
                                           placeholder="Enter a series source code. ex: https://github.com/Rafi1112/dream-space-screencasts" />
                                    {errors.source_code && (<div className="invalid-feedback mb-n5">{errors.source_code}</div>)}
                                </div>
                                <div className="col-lg-6">
                                    <label className="font-weight-bold">Series Project Demo</label>
                                    <input type="text" id="project_demo" name="project_demo"
                                           value={data.project_demo} onChange={changeHandler}
                                           className={`form-control ${errors.project_demo && ('is-invalid')}`}
                                           placeholder="Enter a series project demo. ex: projectdemo.com" />
                                    {errors.project_demo && (<div className="invalid-feedback mb-n5">{errors.project_demo}</div>)}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold">Series Thumbnail</label>
                                <input type="file"
                                       className="form-control"
                                       id="thumbnail"
                                       name="thumbnail"
                                       onChange={changeHandler}/>
                                <img src={preview} className="mt-1 rounded-lg" />
                                {errors.thumbnail && (<div className="text-danger font-size-sm mb-n5">{errors.thumbnail}</div>)}
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4 d-flex justify-content-center">
                                    <div className="checkbox-inline">
                                        <label className="checkbox">
                                            <input type="checkbox"
                                                   name="is_discount"
                                                   id="is_discount"
                                                   checked={!!data.is_discount}
                                                   onChange={changeHandler}
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
                                                   onChange={changeHandler}
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
                                                   onChange={changeHandler}
                                            />
                                            <span />Archive Series</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer border-0 text-right">
                            <button type="submit" className="btn btn-primary btn-block font-weight-bold" disabled={processing}>
                                {processing && (<i className="spinner spinner-sm spinner-white px-4"/>)}
                                Save
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = (page) => <App children={page}/>
