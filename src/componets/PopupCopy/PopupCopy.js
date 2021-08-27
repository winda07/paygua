import React, { useState, useEffect } from "react";
import styles from "./PopupCopy.module.css"

function PopupCopy(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <p style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>Berhasil disalin ke Clipboard!</p>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupCopy