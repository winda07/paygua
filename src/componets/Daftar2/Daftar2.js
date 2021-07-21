import React, { useState, useEffect } from "react";
import styles from "./Daftar2.module.css"
import logo from "../../img/logo.svg"
import profile from "../../img/profile.svg"
import { Link, useHistory } from "react-router-dom";
import validation from "./validation";
import axios from "axios";
import jwt from "jwt-decode"
import { BoxUpload, ImagePreview } from "./index";
import FolderIcon from "../../img/profile.svg"

const Daftar2 = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [typeFile, setTypeFile] = useState("");

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            setTypeFile(e.target.files[0].type);
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const [data, setValues] = useState({
        nama: "",
        bio: "",
    });
    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true);

        // submit
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const token = localStorage.getItem("token");
            if (token) {
                const user = jwt(token);
                console.log("user");
                axios
                    .put("https://paygua.com/api/user/" + user.id, data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        if (result) {
                            if (result.data) {
                                if (result.data.status === 200) {
                                    history.push('/dashboard')
                                } else if (result.data.status === 400) {
                                    alert("Edit profil mengalami error")
                                }
                            }
                        }
                    })
                    .catch((e) => {
                        alert("error");
                    });
            }
        }

    };
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <header className={styles['App-header']}>
                    <img src={logo} alt="logo" />
                </header>
                <h3 class="h3 mb-3 fw-normal">Lengkapi Profile</h3>
                <BoxUpload>
                    <div className="image-upload">
                        {!isUploaded ? (
                            <>
                                <label htmlFor="upload-input">
                                    <img
                                        src={FolderIcon}
                                        draggable={"false"}
                                        alt="placeholder"
                                        style={{ width: 218, height: 218 }}
                                    />

                                </label>

                                <input
                                    id="upload-input"
                                    type="file"
                                    accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                    onChange={handleImageChange}
                                />
                            </>
                        ) : (
                            <ImagePreview>
                                <img
                                    className="close-icon"

                                    onClick={() => {
                                        setIsUploaded(false);
                                        setImage(null);
                                    }}
                                />
                                {typeFile.includes("video") ? (
                                    <video
                                        id="uploaded-image"
                                        src={image}
                                        draggable={false}
                                        controls
                                        autoPlay
                                        alt="uploaded-img"
                                    />
                                ) : (
                                    <img
                                        id="uploaded-image"
                                        src={image}
                                        draggable={false}
                                        alt="uploaded-img"
                                    />
                                )}
                            </ImagePreview>
                        )}
                    </div>
                </BoxUpload>
                <br></br>
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="nama"
                    value={data.nama}
                    onChange={handleChange}
                ></input>
                {errors.nama && <p className="error">{errors.nama}</p>}
                <textarea
                    type="text"
                    class={styles["form-control-bio"]}
                    id="floatingBio"
                    placeholder="Bio"
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                ></textarea>
                {errors.bio && <p className="error">{errors.bio}</p>}
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text}  >Selesai</p>
                </div>
            </div>
        </div>
        // <div className={styles.App}>
        //     <div className={styles['form-signin']}>
        //         <header className={styles['App-header']}>
        //             <img src={logo} alt="logo" />
        //         </header>
        //         <div className={styles.profile}>
        //             <img src={profile} alt="logo" />
        //         </div>
        //         <h3 class="h3 mb-3 fw-normal">Lengkapi Profile</h3>
        //         <input
        //             type="text"
        //             class={styles["form-control"]}
        //             id="floatingNama"
        //             placeholder="Nama"
        //             name="nama"
        //             value={data.nama}
        //             onChange={handleChange}
        //         ></input>
        //         {errors.nama && <p className="error">{errors.nama}</p>}
        //         <textarea
        //             type="text"
        //             class={styles["form-control-bio"]}
        //             id="floatingBio"
        //             placeholder="Bio"
        //             name="bio"
        //             value={data.bio}
        //             onChange={handleChange}
        //         ></textarea>
        //         {errors.bio && <p className="error">{errors.bio}</p>}
        //         <div className={styles.btnSubmit} onClick={handleFormSubmit}>
        //             <p className={styles.text}  >Selesai</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Daftar2