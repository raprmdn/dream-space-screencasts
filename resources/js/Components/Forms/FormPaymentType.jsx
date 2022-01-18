import React from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";

export default function FormPaymentType({submitHandler, data, setData, errors, processing, submitLabel}) {
    return (
        <form onSubmit={submitHandler}>
            <div className="card-body">
                <div className="form-group">
                    <Label labelFor={"payment_type"} children={"Payment Type"}/>
                    <span className="text-danger"> * </span>
                    <input type="text" id="payment_type" name="payment_type"
                           value={data.payment_type}
                           onChange={e => setData('payment_type', e.target.value)}
                           className={`form-control ${errors.payment_type && ('is-invalid')}`}
                           placeholder="Enter payment type" />
                    {errors.payment_type && (<div className="invalid-feedback mb-n5">{errors.payment_type}</div>)}
                </div>
                <div className="form-group">
                    <Label labelFor={"description"} children={"Payment Type Description"}/>
                    <span className="text-danger"> * </span>
                    <textarea id="description" name="description"
                              value={data.description}
                              onChange={e => setData('description', e.target.value)}
                              className={`form-control ${errors.description && ('is-invalid')}`}
                              placeholder="Enter a payment type description" rows={5}>
                            </textarea>
                    {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                </div>
                <div className="text-center">
                    <button type="button" data-dismiss="modal"
                            aria-label="Close" className="btn btn-light mr-3 font-weight-bold">Discard
                    </button>
                    <ButtonSubmit label={submitLabel} processing={processing}/>
                </div>
            </div>
        </form>
    )
}
