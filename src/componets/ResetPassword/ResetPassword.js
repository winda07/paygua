import React from 'react'
import styles from "./ResetPassword.module.css"
import logo  from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import { Link } from 'react-router-dom'
const ResetPassword = () => {
        return(
            <div className={styles.App}>
                 <div className={styles['form-signin']}>
                 <div className={styles.gbrarow}>
            <Link to="/register"><img src={arrow}  alt="logo" /></Link>
            <p className={styles.kun}>Reset Password</p>
            <Link to="/Login"><img src={check}  alt="logo" /></Link>
           
            </div>
            <input type="password" class={styles['form-control']} id="floatingPassword" placeholder="Password Baru"
                ></input>
                 <input type="password" class={styles['form-control']} id="floatingPassword" placeholder="Konfirmasi Password Baru"
                ></input>
                 </div>

            </div>
        )
}

export default ResetPassword