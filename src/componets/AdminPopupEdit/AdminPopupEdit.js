import React, { useState, useEffect } from "react";
import styles from "./AdminPopupEdit.module.css"

function AdminPopupEdit(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default AdminPopupEdit