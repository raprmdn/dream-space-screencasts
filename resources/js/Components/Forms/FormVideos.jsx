import React, {useState} from 'react';
import Select from "react-select";
import NumberFormat from 'react-number-format';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";
import { keyTab } from "../Helpers";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../CodeBlock";
import remarkGfm from "remark-gfm";

export default function FormVideos({seriesData, data, setData, submitHandler, errors, processing, submitLabel}) {
    const [ onPreview, setOnPreview ] = useState(false)
    let options = null;
    if (route().current() !== 'series.add_videos') {
        options = seriesData.map(series => ({value: series.id, label: series.title}))
    }

    const _previewClick = () => {
        setOnPreview(!onPreview)
    }

    return (
        <div id="block_ui_form">
            <form className="form" onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        {
                            route().current() !== 'series.add_videos'
                                ?
                                (<>
                                    <Label labelFor={"series"} children={"Select Series"}/>
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
                                </>)
                                :
                            (<>
                                <Label children={"Series Title"}/>
                                <h5 className="font-weight-bolder text-dark">
                                    {seriesData.title}
                                </h5>
                            </>)
                        }

                    </div>
                    <div className="form-group">
                        <Label labelFor={"title"} children={"Video Title"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="title" name="title"
                               value={data.title} onChange={e => setData('title', e.target.value)}
                               className={`form-control ${errors.title && ('is-invalid')}`}
                               placeholder="Enter a video title" />
                        {errors.title && (<div className="invalid-feedback mb-n5">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Label labelFor={"description"} children={"Series Description"}/>
                            </div>
                            <div className="mb-1 text-dark-75">
                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                        data-toggle="modal" data-target="#preview"
                                        disabled={!data.description}
                                        onClick={_previewClick}
                                >
                                    <i className="fa fa-search icon-sm mr-1"/>
                                    Preview
                                </button>
                            </div>
                        </div>
                        {
                            !onPreview
                                ?
                                <>
                                    <textarea id="description" name="description"
                                              value={data.description ? data.description : ''} onChange={(e) => setData('description', e.target.value)}
                                              className={`form-control ${errors.description && ('is-invalid')}`}
                                              placeholder="Enter a series description" rows={10} onKeyDown={keyTab}>
                                    </textarea>
                                </>
                                :
                                <>
                                    <div className="example">
                                        <div className="example-preview">
                                            <ReactMarkdown children={data.description}
                                                           components={CodeBlock}
                                                           remarkPlugins={[remarkGfm]}/>
                                        </div>
                                    </div>
                                </>
                        }
                        <span className="form-text text-muted"> * You may use Markdown with
                            <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank">
                                &nbsp;GitHub-flavored
                            </a> code blocks.
                        </span>
                        {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-4">
                            <Label labelFor={"source"} children={"Video Source URL"}/>
                            <span className="text-danger"> * </span>
                            <input type="text" id="source" name="source"
                                   value={data.source} onChange={e => setData('source', e.target.value)}
                                   className={`form-control ${errors.source && ('is-invalid')}`}
                                   placeholder="Video source ex: sAuEeM_6zpk" />
                            {errors.source && (<div className="invalid-feedback mb-n5">{errors.source}</div>)}
                        </div>
                        <div className="col-lg-4">
                            <Label labelFor={"episode"} children={"Video Episode"}/>
                            <span className="text-danger"> * </span>
                            <input type="text" id="episode" name="episode"
                                   value={data.episode} onChange={e => setData('episode', e.target.value)}
                                   className={`form-control ${errors.episode && ('is-invalid')}`}
                                   placeholder="Enter a video episode" />
                            {errors.episode && (<div className="invalid-feedback mb-n5">{errors.episode}</div>)}
                        </div>
                        <div className="col-lg-4">
                            <Label labelFor={"runtime"} children={"Video Runtime"}/>
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
                        <ButtonSubmit label={submitLabel} processing={processing}/>
                    </div>
                </div>
            </form>
        </div>
    )
}
