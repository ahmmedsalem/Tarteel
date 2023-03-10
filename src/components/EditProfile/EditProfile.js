import Joi from 'joi';
import { useEffect, useState } from "react";
import { Translate } from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import useTranslate from "../../hooks/use-translate";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, setAuth } from "../../utils/Auth";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import { modalsActions } from "../../store/Modals/Modals";
import Loader from "../Loader/Loader";
import { authActions } from "../../store/Auth/Auth";
import { isValidFileUploaded } from '../../utils/FileValidation';

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const img = require("../../assets/images/personal.png");
    const { isLoading, error, sendRequest } = useHTTP();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(img);
    const [newAvatar, setNewAvatar] = useState(img);
    const [avatarErr, setAvatarErr] = useState('');
    const [token, setToken] = useState('');
    const [nameErr, setNameErr] = useState('');
    // const [emailErr, setEmailErr] = useState('');
    const [formErr, setFormErr] = useState('');
    const auth = getAuth();
    // const loadXHR = (url) => {
    //     return new Promise(function (resolve, reject) {
    //         try {
    //             var xhr = new XMLHttpRequest();
    //             xhr.open("GET", url);
    //             xhr.responseType = "blob";
    //             xhr.onerror = function () { reject("Network error.") };
    //             xhr.onload = function () {
    //                 if (xhr.status === 200) { resolve(xhr.response) }
    //                 else { reject("Loading error:" + xhr.statusText) }
    //             };
    //             xhr.send();
    //         }
    //         catch (err) { reject(err.message) }
    //     });
    // }
    useEffect(() => {
        if (auth.loggedUser.name) {
            setName(auth.loggedUser.name);
            setEmail(auth.loggedUser.email);
            setAvatar(auth.loggedUser.avatar);
            setNewAvatar(auth.loggedUser.avatar);
        }
        setToken(auth.token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onEditProfileHandler = (e) => {
        e.preventDefault();
        if (name) {
            let formdata = new FormData();
            formdata.append('name', name);
            // formdata.append('email', email);
            if (avatar !== newAvatar) {
                formdata.append('avatar', avatar);
            }
            sendRequest(
                {
                    url: 'profile',
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formdata
                },
                data => {
                    setAuth({ user: data.data });
                    dispatch(modalsActions.closeEditProfileModal(data.data));
                    dispatch(authActions.setAuth({ user: data.data }));
                    // console.log()
                    if (searchParams.get('status')) {
                        navigate(`/`);
                    }
                },
                err => {
                    setFormErr('somethingWrong');

                }
            );
        }
    }

    const onAvatarChange = (e) => {
        if (!e?.target?.files[0]) return;
        const avatarCurrentErr = isValidFileUploaded(e.target.files[0], 'image');
        if (!avatarCurrentErr) {
            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                setNewAvatar(evt.target.result);
            });
            FR.readAsDataURL(e.target.files[0]);
            let file = e.target.files[0];
            setAvatar(file);
        }
        setAvatarErr(avatarCurrentErr);
    }

    const onChangeName = (e) => {
        e.target.value = e.target.value.replace('  ', ' ');
        const schema = Joi.object({
            name: Joi.string().pattern(/^([a-zA-Z\u0621-\u064A]{3,10}[ ]?){1,4}$/).required()
        })
        const nameError = schema.validate({ name: e.target.value });
        if (nameError.error) {
            setNameErr('name');
        } else {
            setNameErr('');
        }
        setName(e.target.value);
    }

    // const onChangeEmail = (e) => {
    //     const schema = Joi.object({
    //         email: Joi.string().trim().email({ tlds: false, allowUnicode: false }).required()
    //     })
    //     const nameError = schema.validate({ email: e.target.value });
    //     if (nameError.error) {
    //         setEmailErr('email');
    //     } else {
    //         setEmailErr('');
    //     }
    //     setEmail(e.target.value.trim());
    // }

    return (
        <Modal>
            {isLoading && <Loader />}
            <form onSubmit={onEditProfileHandler}>
                <div className="edit-profile">
                    <div className="edit-profile-img">
                        <img src={newAvatar || img} alt="..." />
                        <div className="edit-profile-img-upload" onClick={() => document.getElementById('upload-img').click()}><Translate id="button.editImg" /></div>
                        <input accept="image/*" value={''} onChange={onAvatarChange} type='file' id="upload-img" />
                    </div>
                    <ErrorMessage message={avatarErr} />
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.name" /></label>
                        <input name="name" placeholder={useTranslate('input.placeholder.name')} value={name} onChange={onChangeName} type="text" className="trans-input" required />
                        <ErrorMessage message={nameErr} />
                    </div>
                    {/* <div className="edit-profile-input-group">
                        <label><Translate id="input.label.email" /></label>
                        <input name="email" placeholder={useTranslate('input.placeholder.email')} value={email} onChange={onChangeEmail} type="text" className="trans-input" required />
                        <ErrorMessage message={emailErr} />
                    </div> */}
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button" disabled={ nameErr || !name }><Translate id="button.save" /></button>
                        <ErrorMessage message={formErr} />
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default EditProfile;