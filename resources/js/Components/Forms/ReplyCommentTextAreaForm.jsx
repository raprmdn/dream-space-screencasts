import React from 'react';
import {keyTab} from "../Helpers";
import ButtonSubmit from "../ButtonSubmit";

export default function ReplyCommentTextAreaForm() {
    return (
        <div className="card card-custom">
            <div className="card-header align-items-center justify-content-between px-4 py-3">
                <div className="text-left">
                    <div className="text-dark-75 font-weight-bold font-size-h5">
                        Reply comment <span className="text-primary">@Rafi Putra Ramadhan</span>
                    </div>
                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-dismiss="modal">
                        <i className="ki ki-close icon-1x" />
                    </button>
                </div>
            </div>
            {/*<form onSubmit={submitHandler}>*/}
            {/*    <div className="card-footer align-items-center">*/}
            {/*        <textarea className={`form-control border-0 p-0 ${errors.comment && 'is-invalid'}`} rows={10}*/}
            {/*                  value={data.comment} onChange={e => setData('comment', e.target.value)}*/}
            {/*                  placeholder="Type a comment." onKeyDown={keyTab} />*/}
            {/*        {errors.comment && (<div className="invalid-feedback mb-n5">{errors.comment}</div>)}*/}
            {/*        <div className="d-flex align-items-center justify-content-between mt-5">*/}
            {/*            <div className="d-flex flex-grow-1">*/}
            {/*                <div>*/}
            {/*                       <span className="switch switch-sm switch-icon">*/}
            {/*                           <label>*/}
            {/*                               <input type="checkbox" name="select"/>*/}
            {/*                               <span/>*/}
            {/*                           </label>*/}
            {/*                            <label className="ml-2 col-form-label text-muted">Markdown Preview OFF</label>*/}
            {/*                       </span>*/}
            {/*                    <div className="mt-n2">*/}
            {/*                        <small className="form-text text-muted">*/}
            {/*                            * You may use Markdown with*/}
            {/*                            <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank">*/}
            {/*                                &nbsp;GitHub-flavored*/}
            {/*                            </a> code blocks.*/}
            {/*                        </small>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <ButtonSubmit label={'Comment'} processing={processing}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
}
