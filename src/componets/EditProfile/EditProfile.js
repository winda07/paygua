import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import logo from "../../img/logo.svg";
import arrow from "../../img/arrow-left.svg";
import check from "../../img/check.svg";
import user from "../../img/profile.svg";
import { Link, useHistory } from "react-router-dom";
import validation from "./validation";
import axios from "axios";
import jwt from "jwt-decode"
import Popup from "../PopupLogin/PopupLogin";
import silang from "../../img/ion.svg"
import FolderIcon from "../../img/profile.svg"
import Loading from "../Loading/Loading";
import PopupSuksesUbah from "../PopupSuksesUbah/PopupSuksesUbah"


const EditProfile = ({ formSubmit }) => {
    const at = "@"
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErros] = useState({});
    const [popupAfterUpdate, setpopupAfterUpdate] = useState(false)
    const history = useHistory();
    const [image, setImage] = useState([]);
    const [imageBG, setImageBG] = useState([])
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploadedBackground, setIsUploadedBackground] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [message, setMessage] = useState("")
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        name: "",
        username: "",
        bio: "",
        email: "",
        profilePicture: [],
        background: [],
        whatsapp: "",
        instagram: "",
        web: ""
    });
    const urlPayGua = "Paygua.com/"

    useEffect(() => {
        console.log("isClicked: ", isClicked)
        setErros(validation(data));
        setDataIsCorrect(false);
        setIsClicked(false);
    }, [])
    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
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

    const handleChange3 = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.files[0],
        });
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImageBG(e.target.result)
                setIsUploadedBackground(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user2 = jwt(token)
            axios.get("https://paygua.com/api/user/profile", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data,
                            email: result.data.data.email,
                            name: result.data.data.name,
                            username: result.data.data.username,
                            bio: result.data.data.bio,
                            profilePicture: result.data.data.profilePicture,
                            whatsapp: result.data.data.whatsapp,
                            instagram: result.data.data.instagram,
                            web: result.data.data.web,
                            background: result.data.data.background
                        })
                    } else {
                        history.push('/login')
                    }
                    console.log("whatsapp: ", data.whatsapp)

                })
        }
    }, []);

    const handleFormSubmit = (e) => {
        // e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true);
        setIsClicked(true);

        // submit
        if (dataIsCorrect) {
            setButtonLoading(true)
            const token = localStorage.getItem("token");

            const formData = new FormData();
            for (var key in data) {
                console.log(key)
                if ((key === "profilePicture" && isUploaded) || (key === "background" && isUploadedBackground)) {
                    formData.append(key, data[key]);
                } else if (key != "email" && key != "username") {
                    formData.append(key, data[key]);
                }
            }
            console.log("formData:", formData)
            const user = jwt(token);
            axios
                .put("https://paygua.com/api/user/" + user.id, formData, {
                    headers: {
                        Authorization: token
                    },
                    'maxContentLength': Infinity,
                    'maxBodyLength': Infinity
                })
                .then((result) => {
                    console.log(result)
                    if (result) {
                        if (result.data) {
                            if (result.data.status === 200) {
                                setpopupAfterUpdate(true)
                                setTimeout(() => {
                                    setpopupAfterUpdate(false)
                                }, 1000);
                                setButtonLoading(false)
                            } else {
                                setButtonPopup(true);
                                setMessage(result.data.errors.errorMessage)
                                setButtonLoading(false)
                            }
                        }
                    }
                    console.log("data:", data)
                })
                .catch((e) => {
                    alert("error");
                });
            // }
        }

    };

    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.gbrarow}>
                    <Link to="/Settings">
                        <img src={arrow} alt="logo" />
                    </Link>
                    <b className={styles.kun}>Edit Profil</b>

                    <img className={styles.check1} onClick={handleFormSubmit} src={check} alt="logo"></img>

                </div>
                <div className={styles.boxuploadBG}>
                    <div className={styles.textBG}>
                        <button className={styles.kun2}>Ganti Foto Background</button>
                    </div>
                    <div className={styles.imageupload}>
                        {!isUploadedBackground ? (
                            <>
                                <label htmlFor="upload-input1">
                                    <img className={styles.ukuranBG}
                                        src={data.background}
                                        draggable={"false"}
                                        alt="placeholder"

                                    />
                                </label>
                                <input
                                    id="upload-input1"
                                    name="background"
                                    type="file"
                                    onChange={handleChange3}
                                    accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"

                                />
                            </>
                        ) : (

                            <div>
                                <img
                                    className="close-icon"

                                    onClick={() => {
                                        setIsUploadedBackground(false);
                                        setImageBG(null);
                                    }}
                                />
                                <img className={styles.uploadImage2}
                                    id="uploaded-image"
                                    src={imageBG}
                                    draggable={false}
                                    alt="uploaded-img"
                                />

                            </div>

                        )}
                    </div>
                </div>
                <div className={styles.boxupload}>
                    <div className={styles.imageupload}>
                        {!isUploaded ? (
                            <>
                                <label htmlFor="upload-input">
                                    <img className={styles.ukuranPP}
                                        src={data.profilePicture}
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
                <p className={styles.kun1}>Ganti Foto Profile</p>
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                ></input>
                <input disabled
                    type="text"
                    name="username"
                    class={styles["form-control"]}
                    placeholder="Username"
                    id="=floatingUsername"
                    value={`paygua.com/${data.username}`}
                    onChange={handleChange}>
                </input>
                <textarea
                    type="text"
                    class={styles["form-control-bio"]}
                    id="floatingBio"
                    placeholder="Bio"
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="email"
                    class={styles["form-control"]}
                    id="floatingEmail"
                    placeholder="Email"
                    name="email"
                    disabled
                    value={data.email}
                    onChange={handleChange}
                ></input>
                <input
                    type="text"
                    pattern="\d*" inputMode="numeric"
                    class={styles["form-control"]}
                    id="floatingEmail"
                    placeholder="Nomor WhatsApp (08xxxxxx)"
                    name="whatsapp"
                    value={data.whatsapp}
                    onChange={handleChange}
                ></input>
                <div class={styles["inputContainer"]}>
                    <h5 class={styles["usernameLabel"]}>
                        {at}
                    </h5>
                    <input
                        type="text"
                        class={styles["username"]}
                        id="floatingEmail"
                        placeholder="Username Instagram"
                        name="instagram"
                        value={data.instagram}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                {/* <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingEmail"
                    placeholder="Username Instagram"
                    name="instagram"
                    value={data.instagram}
                    onChange={handleChange}
                ></input> */}
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingEmail"
                    placeholder="Link Website"
                    name="web"
                    value={data.web}
                    onChange={handleChange}
                ></input>
            </div>
            <Popup
                trigger={buttonPopup}>
                <img style={{ marginLeft: "320px", display: "flex", cursor: "pointer" }} onClick={() => {
                    setButtonPopup(false)
                }} src={silang}></img>
                <div style={{ display: "flex", textAlign: "center", justifyContent: "center", marginBottom: "20px" }}>{message}</div>
            </Popup>
            <Loading trigger={loadingPopup}></Loading>
            <PopupSuksesUbah trigger={popupAfterUpdate}>
                <img style={{ marginLeft: "310px", cursor: "pointer" }} src={silang} onClick={() => {
                    setpopupAfterUpdate(false)
                }}></img>
                <div style={{ textAlign: "center", justifyContent: "center" }}>Success</div>

            </PopupSuksesUbah>
        </div >
    );
};

export default EditProfile;
