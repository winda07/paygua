import React, { useState, useEffect } from "react";
import styles from "./Daftar2.module.css"
import logo from "../../img/logo.svg"
import profile from "../../img/profile.svg"
import { Link, useHistory, withRouter } from "react-router-dom";
import validation from "./validation";
import axios from "axios";
import jwt from "jwt-decode"
import { BoxUpload, ImagePreview } from "./index";
import FolderIcon from "../../img/profile.svg"
import Loading from "../Loading/Loading"

const Daftar2 = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErros] = useState({});
    const FormData = require('form-data');
    const history = useHistory();
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [typeFile, setTypeFile] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [loadingPopup, setButtonLoading] = useState(false);

    const [data, setValues] = useState({
        name: "",
        bio: "",
        profilePicture: []
    });
    const handleChange = (e) => {
        if (e.target.name === "bio" && e.target.value.length > 100) {
            setValues({
                ...data
            })
        } else if (e.target.name === "name" && e.target.value.length > 20) {
            setValues({
                ...data
            })
        } else {
            setValues({
                ...data,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleChange2 = (e) => {

        setValues({
            ...data,
            [e.target.name]: e.target.files[0],
        });
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const clean = (data) => {
        for (var propName in data) {
            if (data[propName] === null || data[propName] === undefined || data[propName] === "" || data[propName].length === 0) {
                delete data[propName]
            }
        }
        return data
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true);
        setIsClicked(true);
        // submit
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            const token = localStorage.getItem("token");
            const user = jwt(token)
            const cleanData = clean(data)
            const formData = new FormData();
            for (var key in cleanData) {
                formData.append(key, cleanData[key])
            }

            axios.put('https://paygua.com/api/user/' + user.id, formData, {
                headers: {
                    Authorization: token
                },
                'maxContentLength': Infinity,
                'maxBodyLength': Infinity
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            setButtonLoading(false)
                            history.push('/dashboard')
                        }
                    }
                    console.log(result)
                })
            console.log(typeof data.profilePicture)
        }

    };
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <header className={styles['App-header']}>
                    <Link to="/TentangKami"><img className={styles.logo} src={logo} /></Link>
                </header>
                <br></br>
                <b className={styles.judul}>Lengkapi Profil</b>
                <div className={styles.boxupload}>
                    <div className={styles.imageupload}>
                        {!isUploaded ? (
                            <>
                                <label htmlFor="upload-input">
                                    <img className={styles.ukuranPP}
                                        src={FolderIcon}
                                        draggable={"false"}
                                        alt="placeholder"
                                    />

                                </label>

                                <input
                                    id="upload-input"
                                    name="profilePicture"
                                    type="file"
                                    onChange={handleChange2}
                                    accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                />
                            </>
                        ) : (
                            <div>
                                <img
                                    className="close-icon"

                                    onClick={() => {
                                        setIsUploaded(false);
                                        setImage(null);
                                    }}
                                />
                                <img className={styles.uploadImage}
                                    id="uploaded-image"
                                    src={image}
                                    draggable={false}
                                    alt="uploaded-img"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <br></br>
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                ></input>
                <div className={styles["set"]}>{errors.name && <p className="error">{errors.name}</p>}</div>
                <textarea
                    type="text"
                    class={styles["form-control-bio"]}
                    id="floatingBio"
                    placeholder="Bio"
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                ></textarea>
                <div className={styles["set"]}>{errors.bio && <p className="error">{errors.bio}</p>}</div>
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text}  >Selesai</p>
                </div>
                <div>
                    <Loading
                        trigger={loadingPopup}></Loading>
                </div>
            </div>
        </div>
    )
}

export default Daftar2

