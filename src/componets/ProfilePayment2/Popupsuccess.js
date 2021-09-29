import React, { useState, useEffect } from "react";
import styles from "./Popupsuccess.module.css"

function Popupsuccess(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default Popupsuccess