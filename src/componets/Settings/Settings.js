import React from 'react'
import styles from "./Settings.module.css"
import logo from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import user from "../../img/profile.svg"
import { Link } from "react-router-dom";
const Settings = () => {
    const removetoken = () => {
        localStorage.clear();
        console.log("test")
    }
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

                <div className={styles.gbrarow}>
                    <Link to="/dashboard"><img className={styles.arrow} src={arrow} alt="logo" /></Link>
                    <p className={styles.kun}>Akun saya</p>

                </div>

                <Link style={{ textDecoration: "none", color: "#21242B" }} to="/editprofile"> <p>Edit Profile</p></Link>
                <Link style={{ textDecoration: "none", color: "#21242B" }} to="/gantiPassword"><p>Ganti Password</p></Link>
                <Link style={{ textDecoration: "none", color: "#E81A55" }} to="/login"><p onClick={removetoken}>Sign Out</p></Link>
            </div>
        </div>
    )
}

export default Settings