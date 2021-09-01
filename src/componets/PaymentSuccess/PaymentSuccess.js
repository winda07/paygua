import React from 'react'
import styles from './PaymentSuccess.module.css'
import animation from "../../img/animation3.svg"

const PaymentSuccess = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img style={{ marginLeft: "35px" }} src={animation}></img>
                <figcaption style={{ textAlign: "center" }}>Terima kasih telah menggunakan Paygua. Cek email anda untuk melihat bukti pembayaran</figcaption>
            </div>
        </div >
    )
}

export default PaymentSuccess