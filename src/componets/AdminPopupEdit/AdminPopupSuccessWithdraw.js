import React, { useState, useEffect } from "react";
import styles from "./AdminPopupSuccessWithdraw.module.css"

function AdminPopupSuccessWithdraw(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default AdminPopupSuccessWithdraw