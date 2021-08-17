import React from "react";
import styles from "./Notfound.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo.svg"

const Notfound = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <b className={styles.text}>Pengguna atau halaman yang anda cari tidak ada</b>
                <button className={styles.button}><Link style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to="/"><b>Kembali ke halaman utama</b></Link></button>
                <img className={styles.logo} src={logo}></img>
            </div>
        </div>
    )

}
export default Notfound