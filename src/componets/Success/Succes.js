import React from 'react'
import styles from "./Succes.module.css"
import thanks from "../../img/popup-tagihan.svg"
import success from "../../img/Logo_LupPW.svg"
const Success = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            <img  className={styles.logo} src={success}  alt="logo" />
            <p className={styles.text}>Success</p>
            </div>
        </div>
    )
}

export default Success