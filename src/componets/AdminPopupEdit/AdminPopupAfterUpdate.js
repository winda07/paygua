import React, { useState, useEffect } from "react";
import styles from "./AdminPopupAfterUpdate.module.css"

function AdminPopupAfterUpdate(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default AdminPopupAfterUpdate