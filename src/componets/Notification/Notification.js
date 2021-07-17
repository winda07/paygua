import React from 'react';
import styles from "./Notification.module.css";
import { Link } from "react-router-dom";

const Notification = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
            <i className="fas fa-arrow-left"></i>
            <h1 class="h3 mb-3 fw-normal">Notifikasi</h1>
            <div className={styles.boxdua}>Pencairan dana anda</div>
            <div className={styles.boxdua2}>Anda telah menerima uang</div>
            <div className={styles.boxdua3}>Anda telah menerima uang</div>
            <div className={styles.boxdua4}>Pencairan dana anda</div>
            </div>
        </div>
    )
}

export default Notification