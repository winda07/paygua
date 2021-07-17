import React from 'react'
import styles from "./Settings.module.css"
import logo  from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import user  from "../../img/profile.svg"
import { Link } from "react-router-dom";

const Settings = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

            <div className={styles.gbrarow}>
            <Link to="/dashboard"><img src={arrow}  alt="logo" /></Link>
            <p className={styles.kun}>Akun saya</p>

           
            </div>

           <Link to="/editprofile"> <p>Edit Profile</p></Link>
            <Link to="/password"><p>Ganti Password</p></Link>
            <Link to="/tentangkami"><p>Sign Out</p></Link>
            </div>
        </div>
    )
}

export default Settings