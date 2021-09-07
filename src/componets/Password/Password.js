import React, { useState, useEffect } from 'react'
import styles from "./Password.module.css"
import logo from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import validation from './validation'
import showPdwImg from "../../img/showPassword.svg";
import hidePwdImg from "../../img/hidePassword.svg";
import jwt from "jwt-decode"
import Loading from "../Loading/Loading"

const Password = () => {
    const [loadingPopup, setButtonLoading] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isRevealPwd2, setIsRevealPwd2] = useState(false);
    const [isRevealPwd3, setIsRevealPwd3] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();

    const [data, setValues] = useState({
        passwordLama: "",
        passwordBaru: "",
        confirmPassword: ""
    });
    const token = localStorage.getItem('token')

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true)
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            const token = localStorage.getItem('token');
            if (token) {
                const user = jwt(token);
                axios
                    .post("https://paygua.com/api/user/changePassword", {
                        newPassword: data.passwordBaru,
                        password: data.passwordLama,
                    }, {
                        headers: {
                            'Authorization': token,
                        }
                    })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                history.push('/settings')
                                setButtonLoading(false)
                            } else {
                                history.push('/login')
                                setButtonLoading(false)
                            }
                        }
                        console.log(result.data);
                        console.log(token)
                    })
                    .catch((e) => {
                    });
                // submitForm()
            }


        }
    }
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

                <div className={styles.gbrarow}>
                    <Link to="/settings"><img src={arrow} alt="logo" /></Link>
                    <p className={styles.kun}>Ganti Password</p>
                    <img className={styles.check} onClick={handleFormSubmit} src={check} alt="logo" />

                </div>

                <div className={styles.kun3}>
                    <input
                        type={isRevealPwd ? "text" : "password"}
                        class={styles["form-control"]}
                        id="floatingPassword"
                        name="passwordLama"
                        placeholder="Password Lama"
                        value={data.password}
                        onChange={handleChange}
                    />

                    <img
                        className={styles["img"]}
                        title={isRevealPwd ? "Hide password" : "Show Password"}
                        src={isRevealPwd ? hidePwdImg : showPdwImg}
                        onClick={() => setIsRevealPwd((prevState) => !prevState)}
                    />
                    <div className={styles["set"]}> {errors.passwordLama && <p className="error">{errors.passwordLama}</p>}</div>
                    <input type={isRevealPwd2 ? "text" : "password"} className={styles['form-control']} id="floatingInput" placeholder="Password Baru" name="passwordBaru" value={data.passwordBaru} onChange={handleChange} ></input>
                    <img
                        className={styles["img"]}
                        title={isRevealPwd2 ? "Hide password2" : "Show Password2"}
                        src={isRevealPwd2 ? hidePwdImg : showPdwImg}
                        onClick={() => setIsRevealPwd2((prevState) => !prevState)}
                    />
                    <div className={styles["set"]}> {errors.passwordBaru && <p className="error">{errors.passwordBaru}</p>}</div>
                    <input type={isRevealPwd3 ? "text" : "password"} className={styles['form-control']} id="floatingInput" placeholder="Konfirmasi Password Baru" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} ></input>
                    <img
                        className={styles["img"]}
                        title={isRevealPwd3 ? "Hide password" : "Show Password"}
                        src={isRevealPwd3 ? hidePwdImg : showPdwImg}
                        onClick={() => setIsRevealPwd3((prevState) => !prevState)}
                    />
                    <div className={styles["set"]}> {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}</div>
                </div>
                <div className={styles.sandi}>
                    <Link to="/lupaPassword"><a href="#" class={styles['ForgetPwd']}>Lupa Kata Sandi?</a></Link>
                </div>

                <Loading trigger={loadingPopup}></Loading>
            </div>
        </div>
    )
}

export default Password