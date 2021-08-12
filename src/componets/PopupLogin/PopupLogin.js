import React, { useState, useEffect } from "react";
import styles from "./PopupLogin.module.css"

function PopupLogin(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <p>{props.message}</p>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupLogin