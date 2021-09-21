import React, { useEffect } from "react";
import styles from "./SuksesPembayaran.module.css"
import popup from "../../img/popup-tagihan.webp"
import { Link } from "react-router-dom";

const SuksesPembayaran = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div style={{ marginTop: "250px" }}>
                    <img style={{ marginLeft: "125px" }} src={popup}></img>
                    <p style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>Pembayaran sukses</p>
                    <button className={styles.button}><Link style={{ textDecoration: "none", color: "white" }} to="/">HomePage</Link></button>
                </div>
            </div>
        </div>
    )
}
export default SuksesPembayaran
