import React from 'react';
import styles from "./Notification.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";
import GetNotif from './GetNotif';

const Notification = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.divtop}>
                    <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                    <b className={styles.notifikasi}>Notifikasi</b>
                </div>
                <GetNotif></GetNotif>
            </div>
        </div>
    )
}

export default Notification