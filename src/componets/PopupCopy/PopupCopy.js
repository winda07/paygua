import React, { useState, useEffect } from "react";
import styles from "./PopupCopy.module.css"

function PopupCopy(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <p style={{ marginLeft: "40px" }}>Berhasil disalin ke Clipboard!</p>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupCopy