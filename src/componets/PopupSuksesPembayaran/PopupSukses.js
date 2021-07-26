import React from 'react'
import styles from "./PopupSukses.module.css"
import popup from "../../img/popup-tagihan.svg"

function PopupSukses(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.popup} src={popup} alt="logo" />
                <p className={styles.text}>Pembayaran Sukses</p>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopupSukses