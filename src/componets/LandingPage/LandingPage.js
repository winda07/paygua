import React from 'react';
import styles from "./LandingPage.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg"
import animation from "../../img/animation6.svg"
import maqrue from "../../img/marque.svg"


const LandingPage = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <img src={logo}></img>
                    <Link style={{ textDecoration: "none" }} to="/"><p style={{ fontSize: "14px", color: "black", cursor: "pointer" }}>Learn more</p></Link>
                </div>
                <img src={animation}></img>
                <marquee bgcolor="#ffffff" direction="left" height="40px" scrollamount="5" width="100%"><img src={maqrue}></img></marquee>
                <br></br>
                <br></br>
                <b style={{ fontSize: "16px", textAlign: "center", display: "flex", justifyContent: "center" }}>Terima pembayaran untukmu dan bisnismu dengan mudah dan aman via smartphone</b>
                <br></br>
                <br></br>
                <Link to="/register"><button className={styles.buttonQr}><p style={{ color: "white", fontSize: "14px", display: "flex", marginTop: "12px", textAlign: "center", justifyContent: "center" }}>Mulai Sekarang</p></button></Link>
                <br></br>
                <br></br>
                <Link to="/login"><button className={styles.buttonQr2}><p style={{ color: "black", fontSize: "14px", marginTop: "12px", display: "flex", textAlign: "center", justifyContent: "center" }}>Masuk</p></button></Link>
            </div>
        </div>
    )
}

export default LandingPage