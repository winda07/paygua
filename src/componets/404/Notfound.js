import React from "react";
import styles from "./Notfound.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo.svg"
import animation from "../../img/animation4.webp"

const Notfound = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <br></br>
                <br></br>
                <img style={{ marginLeft: "50px" }} src={animation}></img>
                <b className={styles.text}>Pengguna atau halaman yang anda cari tidak ada</b>
                <button className={styles.button}><Link style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to="/"><b>Kembali ke halaman utama</b></Link></button>
                <Link to="/TentangKami"><img className={styles.logo} src={logo}></img></Link>
            </div>
        </div>
    )

}
export default Notfound