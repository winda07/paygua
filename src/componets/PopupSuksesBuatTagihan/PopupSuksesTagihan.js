import React from 'react'
import PopupSukses from '../PopupSuksesPembayaran/PopupSukses'
import styles from "./PopupSuksesTagihan.module.css"
import popup from "../../img/popup-tagihan.svg"
const PopupSuksesTagihan = () => {
    return (
        <div className={styles.App}>
             <div className={styles['form-signin']}>
             <img className={styles.popup} src={popup}  alt="logo" />
             <p className={styles.text}>Tagihan Berhasil Dibuat</p>
             <br></br>
             <p className={styles.text2}>paygua.com/maudyayunda/006</p>
             </div>
        </div>
    )
}
export default PopupSuksesTagihan