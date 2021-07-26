import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import PopupSukses from "../PopupSuksesPembayaran/PopupSukses";
import styles from "./PopupSuksesTagihan.module.css";
import popup from "../../img/popup-tagihan.svg";
import { useLocation } from "react-router-dom";

function PopupSuksesTagihan(props) {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const user = jwt(token);
    localStorage.setItem("token", token);

    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <img className={styles.popup} src={popup} alt="logo" />
                <p className={styles.text}>Tagihan Berhasil Dibuat</p>
                <Link style={{ textDecoration: "none" }} to="/share">
                    {" "}
                    <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`Paygua.com/${props.user}/${props.id}`) }}>
                        <Link style={{ textDecoration: "none" }} to="/notifToast"><p className={styles.link}>Paygua.com/{props.user}/{props.id}</p></Link>
                    </button>
                    {/* <p className={styles.link}>Paygua.com/{props.user}/{props.id}</p> */}
                </Link>
                {props.children}
            </div>
        </div>
    ) : "";
}
export default PopupSuksesTagihan;
