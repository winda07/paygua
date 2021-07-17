import React from "react";
import styles from "./VerivLupas.module.css"
import lupapw from "../../img/Logo_LupPW.svg"
import { Link } from "react-router-dom";
const VerivLupas = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            <img className={styles.lupapw}  src={lupapw}  alt="logo" />
            <p className={styles.text}>Email pemulihan telah terkirim ke hello@paygua.com.</p>
            <Link to="/"><input type="submit" className={styles.btnSubmit} value="Selesai"></input></Link>
                </div>
                
        </div>
    )
}

export default VerivLupas