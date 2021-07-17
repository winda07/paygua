import React from 'react'
import styles from "./Tagihan.module.css"
import arrow from "../../img/arrow-left.svg"
import arah from "../../img/arahkanan.svg"
import { Link } from "react-router-dom";

const Tagihan = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            
            <div className={styles.gbrarow}>
            <Link to="/register"><img src={arrow}  alt="logo" /></Link>
            </div>
            <p className={styles.kun}>Tagihan</p>
            <button className={styles.button}>
                    <Link to="/buattagihan"><p>Buat Tagihan &#43;</p></Link>
                    
                </button>
                <div className={styles.boxdua}>
                <h6>&emsp;Belum dibayar</h6>
                <h4>&emsp;Irfan Aziz <br></br>&emsp;Rp.100.000</h4>
               <Link to="/detailtagihan"> <img className={styles.arah} src={arah}  alt="logo" /></Link>
                
                </div>
                <div className={styles.boxdua2}>
                <h6>&emsp;Belum dibayar</h6>
                <h4>&emsp;Irfan Aziz <br></br>&emsp;Rp.100.000</h4>
              <Link to="/detailtagihan">  <img className={styles.arah} src={arah}  alt="logo" /></Link>
                </div>
                <div className={styles.boxdua3}>
                <h6>&emsp;Belum dibayar</h6>
                <h4>&emsp;Irfan Aziz <br></br>&emsp;Rp.100.000</h4>
                <Link to="/detailtagihan"><img className={styles.arah} src={arah}  alt="logo" /></Link>
                </div>
                
            </div>
            
                    
        </div>
    )
}

export default Tagihan