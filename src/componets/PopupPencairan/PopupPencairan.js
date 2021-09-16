import React, { useState, useEffect } from "react";
import styles from "./PopupPencairan.module.css"

function PopupPencairan(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupPencairan