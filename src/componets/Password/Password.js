import React from 'react'
import styles from "./Password.module.css"
import logo  from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import user  from "../../img/profile.svg"
import { Link } from "react-router-dom";

const Password = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

            <div className={styles.gbrarow}>
            <Link to="/register"><img src={arrow}  alt="logo" /></Link>
            <p className={styles.kun}>Ganti Password</p>
            <Link to="/Login"><img src={check}  alt="logo" /></Link>
           
            </div>
            
            <div className={styles.kun3}>
            <input type="text" class={styles['form-control']} id="floatingNama" placeholder="Nama"></input>

            <input type="text" class={styles['form-control']}  id="=floatingUsername"  placeholder="Username"></input>
            <input type="email" class={styles['form-control']} id="floatingEmail" placeholder="Email"></input>
            </div>
            <div className={styles.sandi}>
                    <Link to="/Lupas"><a href="#" class={styles['ForgetPwd']}>Lupa Kata Sandi?</a></Link>
                </div>


            </div>
        </div>
    )
}

export default Password