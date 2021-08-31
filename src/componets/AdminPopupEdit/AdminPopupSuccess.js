import React, { useState, useEffect } from "react";
import styles from "./AdminPopupSuccess.module.css"

function AdminPopupSuccess(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default AdminPopupSuccess