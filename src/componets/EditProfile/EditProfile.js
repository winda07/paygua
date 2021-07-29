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
import { BoxUpload, ImagePreview } from "./index"

const EditProfile = ({ formSubmit }) => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [image, setImage] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setValues] = useState({
        nama: "",
        username: "",
        bio: "",
        email: "",
        profilePicture: [],
    });
    const urlPayGua = "Paygua.com/"

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleChange2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (ee) {
                setImage(e.target.files[0]);
                setValues({
                    ...data,
                    [e.target.name]: ee.target.result,
                });
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
                    console.log(result.data)
                    setValues({
                        ...data,
                        email: result.data.data.email,
                        profilePicture: result.data.data.profilePicture
                    })
                })
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true);

        // submit
        if (dataIsCorrect) {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            for (var key in data) {
                if (key === "profilePicture") {
                    if (isUploaded) {
                        formData.append(key, image);
                    }
                } else if (key !== "email") {
                    formData.append(key, data[key]);
                }
            }
            // if (token) {
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
                            if (result.data.status === 400) {
                                alert("Edit profil mengalami error");
                            } else if (result.data.status === 200) {
                                history.push('/settings')
                                // formSubmit()
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
                    <h2 className={styles.kun}>Edit Profil</h2>
                    {/* <BoxUpload> */}

                    {/* </BoxUpload> */}


                    <img className={styles.check1} onClick={handleFormSubmit} src={check} alt="logo"></img>

                </div>
                <div className={styles.user}>
                    <img className={styles.picture} src={data.profilePicture}></img>
                </div>
                <div className="image-upload">
                    <label className={styles.profile} htmlFor="upload-input"> Ganti Foto Profile
                    </label>

                    <input
                        id="upload-input"
                        name="profilePicture"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange2}
                        accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                    />
                </div>
                <br></br>
                {/* <p className={styles.kun1}>Ganti Foto Profile</p> */}
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="nama"
                    value={data.nama}
                    onChange={handleChange}
                ></input>
                <div class={styles["inputContainer"]}>
                    <h5 class={styles["usernameLabel"]}>
                        {urlPayGua}
                    </h5>
                    <input
                        type="text"
                        name="username"
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
        </div>
    );
};

export default EditProfile;
