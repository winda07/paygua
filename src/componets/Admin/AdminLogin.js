import React, { useState, useEffect } from "react";
import styles from "./AdminLogin.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo.svg"
import showPdwImg from "../../img/showPassword.svg";
import hidePwdImg from "../../img/hidePassword.svg";
import validation from "./validation";
import Loading from "../Loading/Loading";
import axios from "axios";
import Popup from "../PopupLogin/PopupLogin"
import jwt from "jwt-decode"

const AdminLogin = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [message, setMessage] = useState("")
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            axios
                .post("https://paygua.com/api/auth/admin/login", data)
                .then((result) => {
                    if (result) {
                        if (result.data) {
                            if (result.data.status === 400) {
                                setButtonPopup(true);
                                setButtonLoading(false)
                                setTimeout(() => {
                                    setButtonPopup(false)
                                }, 1000)
                                setMessage(result.data.errors.errorMessage)
                                console.log(result.data.errors.errorMessage)
                            } else if (result.data.status === 200) {
                                const tokenAdmin = result.data.data.token;
                                localStorage.setItem('tokenAdmin', tokenAdmin);
                                console.log(tokenAdmin)
                                setButtonLoading(false)
                                history.push("/AdminHome")
                            }
                        }
                        console.log(result.data.status)
                    }
                })
                .catch((e) => {
                    console.log(e)
                });
        }
    }, [errors])
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true)
    }
    return (
        <div className={styles.App}>
            <form onSubmit={handleFormSubmit} className={styles["form-signin"]}>
                <header className={styles['App-header']}>
                    <img src={logo}></img>
                    <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                        <b style={{ fontSize: "14px" }}>Username</b>
                        <input
                            type="email"
                            class={styles["form-control"]}
                            id="floatingInput"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                        <b style={{ fontSize: "14px" }}>Password</b>
                        <input
                            type={isRevealPwd ? "text" : "password"}
                            class={styles["form-control"]}
                            id="floatingPassword"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />

                        <img
                            className={styles["img"]}
                            title={isRevealPwd ? "Hide password" : "Show Password"}
                            src={isRevealPwd ? hidePwdImg : showPdwImg}
                            onClick={() => setIsRevealPwd((prevState) => !prevState)}
                        />
                    </div>
                    <div className={styles["set"]}>{errors.password && <p className="error">{errors.password}</p>}</div>
                    <button className={styles.btnSubmit} type="submit">
                        <p className={styles.text}> Masuk</p>
                    </button>
                    <Popup
                        trigger={buttonPopup}>
                        <div onClick={() => { setButtonPopup(false) }}><p style={{ marginLeft: "330px", marginBottom: "10px", cursor: "pointer" }}>X</p>
                            <div style={{ marginLeft: "100px", marginBottom: "20px" }}>{message}</div>
                        </div>
                    </Popup>
                    <Loading trigger={loadingPopup}></Loading>
                </header>
            </form>
        </div >
    )

}
export default AdminLogin