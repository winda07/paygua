import React from 'react'
import styles from "./LinkExpired.module.css"
import thanks from "../../img/popup-tagihan.svg"
import success from "../../img/ion.svg"
const LinkExpired  = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            <img  className={styles.logo} src={success}  alt="logo" />
            <p className={styles.text}>LinkExpired</p>
            </div>
        </div>
    )
}

export default LinkExpired