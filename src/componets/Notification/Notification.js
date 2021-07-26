import React from 'react';
import styles from "./Notification.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";

const Notification = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <Link to="/dashboard"><img src={arrow}></img></Link>
                <h1 class="h3 mb-3 fw-normal">Notifikasi</h1>
                <div className={styles.boxdua}></div>
            </div>
        </div>
    )
}

export default Notification