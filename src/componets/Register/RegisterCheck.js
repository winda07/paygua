import React from 'react';
import styles from "./check.module.css"
import lupapw from "../../img/Logo_LupPW.svg"
import { Link, useLocation } from "react-router-dom";

const RegisterCheck = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.lupapw} src={lupapw} alt="logo" />
                <p className={styles.text}>Register Berhasil</p>
                <Link to="/login"><input type="submit" className={styles.btnSubmit} value="Selesai"></input></Link>
            </div>

        </div>
    )
}
export default RegisterCheck