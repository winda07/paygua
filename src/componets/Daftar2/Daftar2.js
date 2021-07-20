import React, { useState, useEffect } from "react";
import styles from "./Daftar2.module.css"
import logo from "../../img/logo.svg"
import profile from "../../img/profile.svg"
import { Link, useHistory } from "react-router-dom";
import validation from "./validation";
import axios from "axios";
import jwt from "jwt-decode"

const Daftar2 = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
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
                <div className={styles.profile}>
                    <img src={profile} alt="logo" />
                </div>
                <h3 class="h3 mb-3 fw-normal">Lengkapi Profile</h3>
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
    )
}

export default Daftar2