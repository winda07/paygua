import React, { useState, useEffect } from "react";
import styles from "./Pencairan.module.css"

function PopupPilihBank(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default PopupPilihBank