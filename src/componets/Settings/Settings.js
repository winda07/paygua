import React from 'react'
import styles from "./Settings.module.css"
import logo from "../../img/logo.webp"
import arrow from "../../img/arrow-left.webp"
import check from "../../img/check.webp"
import user from "../../img/profile.webp"
import { Link } from "react-router-dom";
const Settings = () => {
    const removetoken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenAdmin")
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