import React from 'react'
import styles from "./ThanksEmail.module.css"
import thanks from "../../img/popup-tagihan.webp"
const ThanksEmail = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.logo} src={thanks} alt="logo" />
                <p className={styles.text}>Terimakasih untuk verifikasi email</p>
            </div>
        </div>
    )
}

export default ThanksEmail