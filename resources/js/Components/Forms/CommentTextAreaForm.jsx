import React, {useState} from 'react';
import {keyTab} from "../Helpers";
import ButtonSubmit from "../ButtonSubmit";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../CodeBlock";
import remarkGfm from "remark-gfm";

export default function CommentTextAreaForm({video, data, setData, submitHandler, errors, processing, clearErrors, reset}) {
    const [ onPreview, setOnPreview ] = useState(false);

    return (
        <div className="card card-custom">
            <div className="card-header align-items-center justify-content-between px-4 py-3">
                <div className="text-left">
                    <div className="text-dark-75 font-weight-bold font-size-h5">
                        {
                            data.parent_id
                                ? <><i className="flaticon-reply mr-1"/> Reply to <span className="text-primary">@{data.reply_to}</span></>
                                : <>Add a comment on <span className="text-primary">{video.current_video.title}</span></>
                        }
                    </div>
                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-dismiss="modal"
                            onClick={() => {
                                reset('parent_id', 'reply_to', 'mentioned_username', 'comment', 'mentioned_user_id');
                                clearErrors();}
                            }>
                        <i className="ki ki-close icon-1x" />
                    </button>
                </div>
            </div>
            <form onSubmit={submitHandler}>
                <div className="card-body align-items-center">
                    {
                        !onPreview ?
                            <>
                                <textarea className={`form-control border-0 p-0 ${errors.comment && 'is-invalid'}`} rows={10}
                                          autoComplete={'off'} autoCorrect={'off'} autoCapitalize={'off'} spellCheck={'false'}
                                          value={data.comment}
                                          onChange={(e) => setData('comment', e.target.value)}
                                          placeholder="Type a comment." onKeyDown={keyTab} />
                                {errors.comment && (<div className="invalid-feedback mb-n5">{errors.comment}</div>)}
                            </>
                            :
                            <>
                                <div className="p-0" style={{height: 550, overflowY: 'auto'}}>
                                    <div className="example">
                                        <div className="example-preview">
                                            <ReactMarkdown children={data.comment}
                                                           components={CodeBlock}
                                                           remarkPlugins={[remarkGfm]}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                    <div className="d-flex align-items-center justify-content-between mt-5">
                        <div className="d-flex flex-grow-1">
                            <div>
                                   <span className="switch switch-sm switch-icon">
                                       <label>
                                           <input type="checkbox" name="select"
                                                  checked={!!onPreview} onChange={() => setOnPreview(!onPreview)}/>
                                           <span/>
                                       </label>
                                       {
                                           onPreview
                                               ?
                                                <label className="ml-2 col-form-label text-muted">Markdown Preview ON</label>
                                               :
                                                <label className="ml-2 col-form-label text-muted">Markdown Preview OFF</label>
                                       }
                                   </span>
                                <div className="mt-n2">
                                    <small className="form-text text-muted">
                                        * You may use Markdown with
                                        <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank">
                                            &nbsp;GitHub-flavored
                                        </a> code blocks.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                data.parent_id
                                    ? <ButtonSubmit label={'Reply'} processing={processing}/>
                                    : <ButtonSubmit label={'Comment'} processing={processing}/>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
