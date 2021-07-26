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
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setValues] = useState({
        nama: "",
        username: "",
        bio: "",
        email: "",
        profilePicture: [],
    });

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
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
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
                    <p className={styles.kun}>General</p>
                    {/* <BoxUpload> */}

                    {/* </BoxUpload> */}


                    <img className={styles.check1} onClick={handleFormSubmit} src={check} alt="logo"></img>

                </div>
                <div className={styles.user}>
                    <img className={styles.picture} src={data.profilePicture}></img>
                </div>
                <div className="image-upload">
                    {!isUploaded ? (
                        <>
                            <label htmlFor="upload-input">
                                <img
                                    draggable={"false"}
                                    alt="Ganti Foto Profile"
                                    style={{ width: 218, height: 218 }}
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
                        <ImagePreview>
                            <img
                                className="close-icon"

                                onClick={() => {
                                    setIsUploaded(false);
                                    setImage(null);
                                }}
                            />
                            <img
                                id="uploaded-image"
                                src={image}
                                draggable={false}
                                alt="uploaded-img"
                            />

                        </ImagePreview>
                    )}
                </div>
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
                <div className={styles["set"]}>{errors.nama && <p className="error">{errors.nama}</p>}</div>
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="=floatingUsername"
                    placeholder="Username"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                ></input>
                <div className={styles["set"]}>{errors.username && <p className="error">{errors.username}</p>}</div>
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
