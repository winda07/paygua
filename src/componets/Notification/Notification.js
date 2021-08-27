import React from 'react';
import styles from "./Notification.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";
import GetNotif from './GetNotif';

const Notification = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                <br></br>
                <br></br>
                <b className={styles.notifikasi}>Notifikasi</b>
                <GetNotif></GetNotif>
            </div>
        </div>
    )
}

export default Notification