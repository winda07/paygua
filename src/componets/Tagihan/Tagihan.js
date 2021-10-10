import React from 'react'
import styles from "./Tagihan.module.css"
import arrow from "../../img/arrow-left.svg"
import plus from "../../img/plus.svg"
import arrow2 from "../../img/arrow.svg"
import time from "../../img/time.svg"
import GetUserInvoice from './GetUserInvoice'
import { Link } from "react-router-dom";

const Tagihan = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div style={{ display: "flex" }}>
                    <div>
                        <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                        <p className={styles.tagihan}>Tagihan</p>
                    </div>
                    <div>
                    </div>
                </div>
                <br></br>
                <GetUserInvoice></GetUserInvoice>
            </div>


        </div>
    )
}

export default Tagihan