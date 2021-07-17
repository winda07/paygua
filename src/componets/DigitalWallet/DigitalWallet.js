import React from 'react'
import styles from "./DigitalWallet.module.css"
import arrow from "../../img/arrow-left.svg"
import report from "../../img/report.svg"
import dana from "../../img/dana.svg"
import gopay from "../../img/gopay.svg"
import linkaja from "../../img/LinkAja.svg"
import ovo from "../../img/ovo.svg"
import shopee from "../../img/shopeepay.svg"
import jeniuspay from "../../img/jeniuspay.svg"
import bca from "../../img/bca copy.svg"
import bni from "../../img/bni copy.svg"
import bri from "../../img/bri copy.svg"
import { Link } from "react-router-dom";

const DigitalWallet = () => {
    return(

        <div className={styles.App}>
            <div className={styles["form-signin"]}>
            
            <div className={styles.gbrarow}>
            <Link to="/register"><img src={arrow}  alt="logo" /></Link>
            <p className={styles.kun}>Metode Pembayaran</p>
            <Link to="/Login"><img src={report}  alt="logo" /></Link>
            </div>

            <img className={styles.dana}  src={dana}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={gopay}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={linkaja}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={ovo}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={shopee}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={jeniuspay}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={bca}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={bni}  alt="logo" />
                <hr></hr>
                <img className={styles.dana}  src={bri}  alt="logo" />
                <hr></hr>
            </div>
        </div>
    )
}

export default DigitalWallet