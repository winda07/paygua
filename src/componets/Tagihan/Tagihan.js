import React from 'react'
import styles from "./Tagihan.module.css"
import arrow from "../../img/arrow-left.webp"
import plus from "../../img/plus.webp"
import arrow2 from "../../img/arrow.webp"
import time from "../../img/time.webp"
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
                        {/* <Link style={{ textDecoration: 'none' }} to="/buattagihan"><button className={styles.button}>Buat</button></Link> */}
                        {/* <button>Buat</button> */}
                    </div>
                </div>
                <br></br>
                <GetUserInvoice></GetUserInvoice>
            </div>


        </div>
    )
}

export default Tagihan