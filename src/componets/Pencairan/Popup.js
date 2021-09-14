import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css"

function Popup(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default Popup