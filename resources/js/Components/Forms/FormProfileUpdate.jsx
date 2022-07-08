import React, {useRef} from 'react';
import Label from "../Label";
import ButtonSubmit from "../ButtonSubmit";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function FormProfileUpdate({updateHandler, data, setData, errors, processing, user, preview, setPreview}) {
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
            <form onSubmit={updateHandler}>
                <div className="form-group">
                    <Label labelFor={"picture"} children={"Profile Picture"}/>
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
                    <span className="form-text text-muted">Allowed file types: png, jpg, jpeg, svg. Allowed size: 100px x 100px, 2MB</span>
                    {errors.picture && (<div className="text-danger font-size-sm mb-n5">{errors.picture}</div>)}
                </div>
                <div className="form-group row">
                    <div className="col-xl-6 mb-5 mb-xl-n5">
                        <Label labelFor={"name"} children={"Full Name"}/>
                        <span className="text-danger"> * </span>
                        <input type="text" id="name" name="name"
                               value={data.name} onChange={e => setData('name', e.target.value)}
                               className={`form-control ${errors.name && ('is-invalid')}`}
                               placeholder="Enter a full name" />
                        {errors.name && (<div className="invalid-feedback mb-n5">{errors.name}</div>)}
                    </div>
                    <div className="col-xl-6">
                        <Label labelFor={"username"} children={"Username"}/>
                        <span className="text-danger"> * </span>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">dreamspace.com/</span>
                            </div>
                            <input type="text" id="username" name="username"
                                   value={data.username} onChange={e => setData('username', e.target.value)}
                                   className={`form-control ${errors.username && ('is-invalid')}`}
                                   placeholder="Enter a username" />
                            {errors.username && (<div className="invalid-feedback mb-n5">{errors.username}</div>)}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-6">
                        <Label labelFor={"email"} children={"Email"}/>
                        {
                            user.provider
                            ?
                                <>
                                    <input type="text"
                                           value={data.email}
                                           className="form-control" readOnly={true} />
                                    <span className="form-text text-success">You're connected with google account.</span>
                                </>
                            :
                                <>
                                    <span className="text-danger"> * </span>
                                    <input type="text" id="email" name="email"
                                           value={data.email} onChange={e => setData('email', e.target.value)}
                                           className={`form-control ${errors.email && ('is-invalid')}`}
                                           placeholder="Enter a email" />
                                    <span className="form-text text-danger">By changing the email you have to verify the email again.</span>
                                </>

                        }
                        {errors.email && (<div className="invalid-feedback mb-n5">{errors.email}</div>)}
                    </div>
                    <div className="d-flex col-lg-6 align-items-center">
                        {
                            user.is_verified_email
                                ?
                                <>
                                    <span className="label label-xl label-pill label-success font-weight-bold label-inline">
                                        <i className="flaticon2-check-mark text-white mr-3"/>
                                        Verified
                                    </span>
                                </>
                                :
                                <>
                                    <span className="label label-xl label-pill label-danger font-weight-bold label-inline">
                                        <i className="flaticon2-cancel text-white mr-3"/>
                                        Unverified
                                    </span>
                                </>
                        }
                    </div>
                </div>
                <div className="form-group">
                    <Label labelFor={"description"} children={"About You"}/>
                    <textarea id="description" name="description"
                              value={data.description} onChange={e => setData('description', e.target.value)}
                              className={`form-control ${errors.description && ('is-invalid')}`}
                              placeholder="Tell me about Yourself . . ." rows={5} style={{resize: 'none'}}>
                    </textarea>
                    {errors.description && (<div className="invalid-feedback mb-n5">{errors.description}</div>)}
                </div>
                <div className="form-group row">
                    <div className="col-xl-6 mb-5 mb-xl-n5">
                        <Label labelFor={"job"} children={"Job Title"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="flaticon2-hangouts-logo text-dark"/>
                                </span>
                            </div>
                            <input type="text" id="job" name="job"
                                   value={data.job} onChange={e => setData('job', e.target.value)}
                                   className={`form-control ${errors.job && ('is-invalid')}`}
                                   placeholder="Enter your job title" />
                            {errors.job && (<div className="invalid-feedback mb-n5">{errors.job}</div>)}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <Label labelFor={"website"} children={"Website"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    https://
                                </span>
                            </div>
                            <input type="text" id="website" name="website"
                                   value={data.website} onChange={e => setData('website', e.target.value)}
                                   className={`form-control ${errors.website && ('is-invalid')}`}
                                   placeholder="Enter your website url" />
                            {errors.website && (<div className="invalid-feedback mb-n5">{errors.website}</div>)}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-6 mb-5 mb-xl-n5">
                        <Label labelFor={"github"} children={"Github"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-github text-dark"/>
                                </span>
                            </div>
                            <input type="text" id="github" name="github"
                                   value={data.github} onChange={e => setData('github', e.target.value)}
                                   className={`form-control ${errors.github && ('is-invalid')}`}
                                   placeholder="Enter your github url" />
                            {errors.github && (<div className="invalid-feedback mb-n5">{errors.github}</div>)}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <Label labelFor={"twitter"} children={"Twitter"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-twitter text-dark"/>
                                </span>
                            </div>
                            <input type="text" id="twitter" name="twitter"
                                   value={data.twitter} onChange={e => setData('twitter', e.target.value)}
                                   className={`form-control ${errors.twitter && ('is-invalid')}`}
                                   placeholder="Enter your twitter url" />
                            {errors.twitter && (<div className="invalid-feedback mb-n5">{errors.twitter}</div>)}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-6 mb-5 mb-xl-n5">
                        <Label labelFor={"instagram"} children={"Instagram"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-instagram text-dark"/>
                                </span>
                            </div>
                            <input type="text" id="instagram" name="instagram"
                                   value={data.instagram} onChange={e => setData('instagram', e.target.value)}
                                   className={`form-control ${errors.instagram && ('is-invalid')}`}
                                   placeholder="Enter your instagram url" />
                            {errors.instagram && (<div className="invalid-feedback mb-n5">{errors.instagram}</div>)}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <Label labelFor={"facebook"} children={"Facebook"}/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-facebook text-dark"/>
                                </span>
                            </div>
                            <input type="text" id="facebook" name="facebook"
                                   value={data.facebook} onChange={e => setData('facebook', e.target.value)}
                                   className={`form-control ${errors.facebook && ('is-invalid')}`}
                                   placeholder="Enter your facebook url" />
                            {errors.facebook && (<div className="invalid-feedback mb-n5">{errors.facebook}</div>)}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <ButtonSubmit label={'Update Profile'} processing={processing}/>
                </div>
            </form>
        </>
    )
}
