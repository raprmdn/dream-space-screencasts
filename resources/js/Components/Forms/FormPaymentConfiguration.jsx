import React from 'react';

export default function FormPaymentConfiguration({submitHandler, blocked, data, setData, errors, processing}) {
    return (
        <form onSubmit={submitHandler}>
            <fieldset disabled={blocked}>
                <div className={`card-body ${blocked && ('bg-gray-400')}`} style={blocked ? {pointerEvents: "none", opacity: "0.5"} : {}}>
                    <div className="form-group row">
                        <label htmlFor="environment" className="col-lg-3 col-form-label font-weight-bold">Environment</label>
                        <div className="col-lg-9">
                            <select
                                id="environment"
                                name="environment"
                                className="form-control"
                                value={data.environment}
                                onChange={(e) => setData('environment', e.target.value)}
                                placeholder="Select Environment"
                            >
                                <option value="false">Sandbox / Development</option>
                                <option value="true">Production</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="merchant_id" className="col-lg-3 col-form-label font-weight-bold">Merchant ID</label>
                        <div className="col-lg-9">
                            <input type="text" id="merchant_id" name="merchant_id"
                                   className={`form-control`}
                                   onChange={(e) => setData('merchant_id', e.target.value)}
                                   value={data.merchant_id}
                                   placeholder="Enter a Merchant ID" />
                        </div>
                        {errors.merchant_id && (<div className="invalid-feedback mb-n5">{errors.merchant_id}</div>)}
                    </div>
                    <div className="form-group row">
                        <label htmlFor="client_key" className="col-lg-3 col-form-label font-weight-bold">Client Key</label>
                        <div className="col-lg-9">
                            <input type="text" id="client_key" name="client_key"
                                   className={`form-control`}
                                   onChange={(e) => setData('client_key', e.target.value)}
                                   value={data.client_key}
                                   placeholder="Enter a client key" />
                        </div>
                        {errors.client_key && (<div className="invalid-feedback mb-n5">{errors.client_key}</div>)}
                    </div>
                    <div className="form-group row">
                        <label htmlFor="server_key" className="col-lg-3 col-form-label font-weight-bold">Server Key</label>
                        <div className="col-lg-9">
                            <input type="text" id="server_key" name="server_key"
                                   className={`form-control`}
                                   onChange={(e) => setData('server_key', e.target.value)}
                                   value={data.server_key}
                                   placeholder="Enter a server key" />
                        </div>
                        {errors.server_key && (<div className="invalid-feedback mb-n5">{errors.server_key}</div>)}
                    </div>
                    <div className="form-group row">
                        <label htmlFor="sanitized" className="col-lg-3 col-form-label font-weight-bold">Sanitized</label>
                        <div className="col-lg-9 col-form-label">
                            <div className="checkbox-inline">
                                <label className="checkbox">
                                    <input type="checkbox" id="sanitized" name="sanitized"
                                           onChange={(e) => setData('sanitized', e.target.checked)}
                                           defaultChecked={data.sanitized}/>
                                    <span />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="enable_3d_secure" className="col-lg-3 col-form-label font-weight-bold">Enable 3D Secure</label>
                        <div className="col-lg-9 col-form-label">
                            <div className="checkbox-inline">
                                <label className="checkbox">
                                    <input type="checkbox" id="enable_3d_secure" name="enable_3d_secure"
                                           onChange={(e) => setData('enable_3d_secure', e.target.checked)}
                                           defaultChecked={data.enable_3d_secure}/>
                                    <span />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !blocked && (
                        <div className="card-footer d-flex justify-content-end">
                            <button type="submit"
                                    className={`btn btn-primary font-weight-bold ${processing && ('spinner spinner-sm spinner-white spinner-right')}`}
                                    disabled={processing}>
                                Update
                            </button>
                        </div>
                    )
                }
            </fieldset>
        </form>
    )
}
