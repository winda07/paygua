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



const EditProfile = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [data, setValues] = useState({
        nama: "",
        username: "",
        bio: "",
        email: ""
    });

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token: ", token)
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
                        email: result.data.data.email
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
            if (token) {
                const user = jwt(token);
                axios
                    .put("https://paygua.com/api/user/" + user.id, data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    .then((result) => {
                        // console.log(result)
                        if (result) {
                            if (result.data) {
                                if (result.data.status === 400) {
                                    alert("Edit profil mengalami error");
                                } else if (result.data.status === 200) {
                                    history.push('/settings')
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
            <div className={styles["form-signin"]}>
                <div className={styles.gbrarow}>
                    <Link to="/Settings">
                        <img src={arrow} alt="logo" />
                    </Link>
                    <p className={styles.kun}>General</p>


                    <img className={styles.check1} onClick={handleFormSubmit} src={check} alt="logo"></img>

                </div>
                <div className={styles.user}>
                    <img src={user} alt="logo" />
                </div>
                <p className={styles.kun1}>Ganti Foto Profile</p>
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
                <input
                    type="text"
                    class={styles["form-control"]}
                    id="=floatingUsername"
                    placeholder="Username"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                ></input>
                {errors.username && <p className="error">{errors.username}</p>}

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
