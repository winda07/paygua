import React, { useState, useEffect } from "react";
import styles from "./PopupFailed.module.css"

function PopupFailed(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupFailed