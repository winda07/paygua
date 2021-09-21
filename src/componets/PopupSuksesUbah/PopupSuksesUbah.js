import React from "react";
import jwt from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
import styles from "./PopupSuksesUbah.module.css"
import popup from "../../img/popup-tagihan.webp";
import { useLocation } from "react-router-dom";


function PopupSuksesTagihan(props) {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const user = jwt(token);
    localStorage.setItem("token", token);

    return (props.trigger) ? (
        <div>
            <div className={styles.App}>
                <div className={styles["form-signin"]}>
                    {props.children}
                </div>
            </div>
        </div>
    ) : "";
}
export default PopupSuksesTagihan;
