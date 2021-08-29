import React, { useState, useEffect } from "react";
import styles from "./PopupHome.module.css"

function PopupHome(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupHome