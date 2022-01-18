import React, {useRef} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormTopic({submitHandler, setData, data, errors, submitLabel, processing, auth, preview, setPreview}) {
    const fileInput = useRef()

    const changeHandler = (e) => {
        let value = e.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(value)
        setData('picture', value)
    }

    const removePicture = () => {
        setData('picture', null)
        setPreview(null)
        fileInput.current.value = null
    }

    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} className="form" encType="multipart/form-data">
                    <div className="form-group">
                        <Label labelFor={"name"} children={"Topic Name"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="name" name="name"
                               value={data.name}
                               onChange={e => setData('name', e.target.value)}
                               className={`form-control form-control-solid ${errors.name ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"description"} children={"Topic Description"}/>
                        <span className="text-danger"> * </span>
                        <textarea id="description" name="description"
                               value={data.description}
                                  onChange={e => setData('description', e.target.value)}
                               className={`form-control form-control-solid ${errors.description ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic description" rows={5}>
                        </textarea>
                        {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"position"} children={"Topic Position"}/>
                        <span className="text-danger"> * </span>
                        <input type="number" id="position" name="position"
                               value={data.position}
                               onChange={e => setData('position', e.target.value)}
                               className={`form-control form-control-solid ${errors.position ? 'is-invalid' : ''}`}
                               placeholder="Enter a topic position" min={1} />
                        {errors.position && (<div className="invalid-feedback mb-n5">{errors.position}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"picture"} children={"Topic Image"}/>
                        <span className="text-danger"> * </span>
                            {
                                preview && (
                                    <div className="position-relative">
                                        <div className="symbol symbol-150 my-2 rounded-lg">
                                            <LazyLoadImage
                                                effect="blur"
                                                src={preview}
                                                style={{boxShadow: `0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075)`}}
                                                className="symbol-label" />
                                            <button onClick={removePicture} className="btn btn-xs btn-icon btn-circle btn-white btn-shadow m-1 position-absolute top-0 right-0">
                                                <i className="ki ki-bold-close icon-xs text-muted" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            <input type="file"
                                   className="form-control"
                                   name="picture"
                                   id="picture"
                                   accept=".png, .jpg, .jpeg, .svg"
                                   onChange={changeHandler}
                                   ref={fileInput}
                            />
                        <span className="form-text text-muted">Allowed file types: png, jpg, jpeg, svg.</span>
                        {errors.picture && (<div className="text-danger font-size-sm mb-n5">{errors.picture}</div>)}
                    </div>
                    {
                        auth.can.includes('archive topics') &&
                        (
                            <div className="form-group">
                                <div className="checkbox-inline">
                                    <label className="checkbox">
                                        <input type="checkbox"
                                               name="is_archived"
                                               id="is_archived"
                                               checked={!!data.is_archived}
                                               onChange={e => setData('is_archived', e.target.checked)}
                                        />
                                        <span />Archive the topic?</label>
                                </div>
                            </div>
                        )
                    }
                    <div className="text-center">
                        <button type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <ButtonSubmit label={submitLabel} processing={processing}/>
                    </div>
                </form>
            </div>
        </>
    )
}
