import React from 'react'
import styles from "./PopupSukses.module.css"
import popup from "../../img/popup-tagihan.webp"
import gopay from "../../img/GOPAY.webp"

function PopupSukses(props) {
    return (props.trigger) ? (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.popup} src={popup} alt="logo" />
                <img src={gopay}></img>
                {/* <p className={styles.text}></p> */}
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopupSukses