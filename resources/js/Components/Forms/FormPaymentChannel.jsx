import React, {useRef} from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Select from "react-select";

export default function FormPaymentChannel({submitHandler, payment_type, data, setData, errors, processing, submitLabel, preview, setPreview, hidden, selectPaymentTypeHandler}) {
    const options = payment_type.map(type => ({value: type.id, label: type.payment_type}))
    const fileInput = useRef()

    const changeHandler = (e) => {
        let value = e.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(value)
        setData('image', value)
    }

    const removePicture = () => {
        setData('image', null)
        setPreview(null)
        fileInput.current.value = null
    }

    return (
        <>
            <div className="modal-body">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="form-group">
                        <Label labelFor={"payment_type_id"} children={"Payment Type"}/>
                        <span className="text-danger"> * </span>
                        <Select
                            id="payment_type_id"
                            name="payment_type_id"
                            value={data.payment_type_id}
                            onChange={(e) => selectPaymentTypeHandler(e)}
                            options={options}
                            placeholder="Select Payment Type"
                        />
                        {errors.payment_type_id && (<span className="text-danger font-size-sm mb-n5">{errors.payment_type_id}</span>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"payment_channel"} children={"Payment Channel"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="payment_channel" name="payment_channel"
                               value={data.payment_channel}
                               onChange={e => setData('payment_channel', e.target.value)}
                               className={`form-control ${errors.payment_channel ? 'is-invalid' : ''}`}
                               placeholder="Enter a payment channel" />
                        {errors.payment_channel && (<div className="invalid-feedback mb-n5">{errors.payment_channel}</div>)}
                    </div>
                    {
                        !hidden && (
                            <>
                                <div className="form-group">
                                    <Label labelFor={"virtual_number"} children={"Virtual Number Channel"}/>
                                    <span className="text-danger"> * </span>
                                    <input type="text" id="virtual_number" name="virtual_number"
                                           value={data.virtual_number}
                                           onChange={e => setData('virtual_number', e.target.value)}
                                           className={`form-control ${errors.virtual_number ? 'is-invalid' : ''}`}
                                           placeholder="Enter a virtual number. e.g 08211XXXXXXX / 0998XXXXXXXXXXX" />
                                    {errors.virtual_number && (<div className="invalid-feedback mb-n5">{errors.virtual_number}</div>)}
                                </div>
                                <div className="form-group">
                                    <Label labelFor={"payment_channel_owner"} children={"Payment Channel Owner"}/>
                                    <span className="text-danger"> * </span>
                                    <input type="text" id="payment_channel_owner" name="payment_channel_owner"
                                           value={data.payment_channel_owner}
                                           onChange={e => setData('payment_channel_owner', e.target.value)}
                                           className={`form-control ${errors.payment_channel_owner ? 'is-invalid' : ''}`}
                                           placeholder="Enter a payment channel owner. e.g RAFI PUTRA RAMADHAN" />
                                    {errors.payment_channel_owner && (<div className="invalid-feedback mb-n5">{errors.payment_channel_owner}</div>)}
                                </div>
                            </>
                        )
                    }
                    <div className="form-group">
                        <Label labelFor={"instruction"} children={"Payment Instruction"}/>
                        <span className="text-danger"> * </span>
                        <textarea id="instruction" name="instruction"
                                  value={data.instruction}
                                  onChange={e => setData('instruction', e.target.value)}
                                  className={`form-control ${errors.instruction ? 'is-invalid' : ''}`}
                                  placeholder="Enter a payment instruction" rows={5}>
                        </textarea>
                        {errors.instruction && (<div className="invalid-feedback mb-n5">{errors.instruction}</div>)}
                    </div>
                    <div className="form-group">
                        <Label labelFor={"image"} children={"Payment Channel Image"}/>
                        <span className="text-danger"> * </span>
                        {
                            preview && (
                                <div className="position-relative">
                                    <div className="my-2 rounded-lg">
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
                               name="image"
                               id="image"
                               accept=".png, .jpg, .jpeg, .svg"
                               onChange={changeHandler}
                               ref={fileInput}
                        />
                        <span className="form-text text-muted">Allowed file types: png, jpg, jpeg, svg.</span>
                        {errors.image && (<div className="text-danger font-size-sm mb-n5">{errors.image}</div>)}
                    </div>
                    <div className="form-group">
                        <div className="checkbox-inline">
                            <label className="checkbox">
                                <input type="checkbox"
                                       name="archived"
                                       id="archived"
                                       checked={!!data.archived}
                                       onChange={e => setData('archived', e.target.checked)}
                                />
                                <span />Archive Payment Channel?</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={removePicture} type="button" data-dismiss="modal"
                                aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                        </button>
                        <ButtonSubmit label={submitLabel} processing={processing}/>
                    </div>
                </form>
            </div>
        </>
    )
}
