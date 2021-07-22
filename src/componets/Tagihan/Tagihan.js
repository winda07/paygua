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

                <div className={styles.gbrarow}>
                    <Link to="/dashboard"><img src={arrow} alt="logo" /></Link>
                </div>
                <p className={styles.kun}>Tagihan</p>
                <Link style={{ textDecoration: 'none' }} to="/buattagihan"><p className={styles.button} >Buat Tagihan <img src={plus}></img></p></Link>
                <br></br>
                <GetUserInvoice></GetUserInvoice>
                {/* <h6>&emsp;Belum dibayar</h6>
                <h4>&emsp;Irfan Aziz <br></br>&emsp;Rp.100.000</h4> */}
                {/* <Link className={styles['arrow']} to="/detailtagihan"><img src={arrow2}></img> </Link>
                    <Link to="share"><p style={{ color: "black" }} className={styles['share']}></p></Link>
                    <img className={styles['time']} src={time}></img> */}
            </div>


        </div>
    )
}

export default Tagihan