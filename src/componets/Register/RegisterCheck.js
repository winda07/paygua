import React from 'react';
import styles from "./check.module.css"
import lupapw from "../../img/Logo_LupPW.svg"
import { Link, useLocation } from "react-router-dom";
import animation from "../../img/animation1.svg"

const RegisterCheck = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.lupapw} src={animation} alt="logo" />
                <p style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>Cek email anda untuk verifikasi akun Paygua</p>
                <Link to="/login"><input type="submit" className={styles.btnSubmit} value="Masuk Kembali"></input></Link>
            </div>

        </div>
    )
}
export default RegisterCheck