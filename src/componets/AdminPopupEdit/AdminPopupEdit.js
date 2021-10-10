import React, { useState, useEffect } from "react";
import styles from "./AdminPopupEdit.module.css"

function AdminPopupEdit(props) {
    const { showPopUp, name } = props;
    return (props.trigger && showPopUp == name) ? (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                {props.children}
            </div>
        </div>
    ) : ""
}
export default AdminPopupEdit