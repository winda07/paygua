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



const EditProfile = ({ formSubmit }) => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [image, setImage] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [message, setMessage] = useState("")
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        name: "",
        username: "",
        bio: "",
        email: "",
        profilePicture: [],
    });
    const urlPayGua = "Paygua.com/"

    useEffect(() => {
        console.log("isClicked: ", isClicked)
        // setErros(validation(data));
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("token: ", token)
        if (token) {
            const user2 = jwt(token)
            // console.log(user2)
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
                            profilePicture: result.data.data.profilePicture
                        })
                    } else {
                        history.push('/login')
                    }
                    console.log(result.data)

                })
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
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
                if (key === "profilePicture") {
                    if (isUploaded) {
                        formData.append(key, image);
                    }
                } else if (key != "email" && key != "username") {
                    formData.append(key, data[key]);
                }
            }
            // if (token) {
            const user = jwt(token);
            // for (var pair of formData.entries()) { console.log(pair[0] + ', ' + pair[1]); }
            // console.log(formData)
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
                                history.push('/settings')
                                setButtonLoading(false)
                            } else {
                                setButtonPopup(true);
                                setMessage(result.data.errors.errorMessage)
                                setButtonLoading(false)
                            }

                        }
                    }
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
                <br></br>
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
                <div class={styles["inputContainer"]}>
                    <h5 class={styles["usernameLabel"]}>
                        {urlPayGua}
                    </h5>
                    <input
                        type="text"
                        name="username"
                        disabled
                        class={styles["username"]}
                        placeholder="Username"
                        id="=floatingUsername"
                        value={data.username}
                        onChange={handleChange}
                    ></input>
                </div>
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
            </div>
            <Popup
                trigger={buttonPopup}>
                <img style={{ marginLeft: "320px", display: "flex", cursor: "pointer" }} onClick={() => {
                    setButtonPopup(false)
                }} src={silang}></img>
                <div style={{ display: "flex", textAlign: "center", justifyContent: "center", marginBottom: "20px" }}>{message}</div>
            </Popup>
            <Loading trigger={loadingPopup}></Loading>
        </div >
    );
};

export default EditProfile;
