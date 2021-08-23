import React, { useState, useEffect } from "react";
import styles from "./PopupCopy2.module.css"

function PopupCopy(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupCopy