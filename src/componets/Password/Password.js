import React, { useState, useEffect } from 'react'
import styles from "./Password.module.css"
import logo from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import validation from './validation'

const Password = () => {

    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const history = useHistory();

    const [data, setValues] = useState({
        passwordLama: "",
        passwordBaru: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            axios
                .post("https://paygua.com/api/user/changePassword", data)
                .then((result) => {
                    if (result) {
                        if (result.data) {
                        }
                    }
                    console.log(result.data);
                })
                .catch((e) => {
                });
            // submitForm()

        }
    }, [errors]);

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
    }
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

                <div className={styles.gbrarow}>
                    <img src={arrow} alt="logo" />
                    <p className={styles.kun}>Ganti Password</p>
                    <img src={check} alt="logo" />

                </div>

                <div className={styles.kun3}>
                    <input type="password" className={styles['form-control']} id="floatingInput" placeholder="Password Lama" name="passwordLama" value={data.passwordLama} onChange={handleChange} ></input>
                    {errors.passwordLama && <p className="error">{errors.passwordLama}</p>}
                    <input type="password" className={styles['form-control']} id="floatingInput" placeholder="Password Baru" name="passwordBaru" value={data.passwordBaru} onChange={handleChange} ></input>
                    {errors.passwordBaru && <p className="error">{errors.passwordBaru}</p>}
                    <input type="password" className={styles['form-control']} id="floatingInput" placeholder="Konfirmasi Password Baru" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} ></input>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <button onClick={handleFormSubmit}>
                    masuk
                </button>
                <div className={styles.sandi}>
                    <Link to="/Lupas"><a href="#" class={styles['ForgetPwd']}>Lupa Kata Sandi?</a></Link>
                </div>


            </div>
        </div>
    )
}

export default Password