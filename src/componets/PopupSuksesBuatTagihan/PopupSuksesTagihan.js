import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import { Link, Redirect } from "react-router-dom";
import PopupSukses from '../PopupSuksesPembayaran/PopupSukses'
import styles from "./PopupSuksesTagihan.module.css"
import popup from "../../img/popup-tagihan.svg"
import { useLocation } from "react-router-dom";
const PopupSuksesTagihan = (props) => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const user = jwt(token)
    localStorage.setItem('token', token);
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.popup} src={popup} alt="logo" />
                <p className={styles.text}>Tagihan Berhasil Dibuat</p>
                <Link style={{ textDecoration: "none" }} to="/share"> <p className={styles.link}>Paygua.com/{user.username}/{location.state.invoiceId}</p></Link>
            </div>
        </div>

    )
}
export default PopupSuksesTagihan