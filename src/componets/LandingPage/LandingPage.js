import React from 'react';
import styles from "./LandingPage.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg"
import animation from "../../img/animation6.webp"
import maqrue from "../../img/marque.svg"


const LandingPage = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.top}>
                    <Link to="/TentangKami"> <img style={{ marginTop: "5px" }} src={logo}></img></Link>
                    <Link style={{ textDecoration: "underline", color: "black" }} to="/TentangKami"><p style={{ fontSize: "14px", color: "black", cursor: "pointer" }}>Learn more</p></Link>
                </div>
                <img className={styles.image} src={animation}></img>
                <marquee bgcolor="#ffffff" direction="left" height="40px" scrollamount="5" width="100%"><img src={maqrue}></img></marquee>
                <br></br>
                <br></br>
                <b className={styles.text}>Jual produk digitalmu dengan cara paling mudah dan aman via smartphone</b>
                <br></br>
                <br></br>
                <div>
                    <Link to="/register"><button className={styles.buttonQr}><p style={{ color: "white", fontSize: "14px", display: "flex", marginTop: "12px", textAlign: "center", justifyContent: "center" }}>Mulai Sekarang</p></button></Link>
                </div>
                <div style={{ marginTop: "5px" }}>
                    <Link to="/login"><button className={styles.buttonQr2}><p style={{ color: "black", fontSize: "14px", marginTop: "12px", display: "flex", textAlign: "center", justifyContent: "center" }}>Masuk</p></button></Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage