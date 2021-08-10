import React from 'react'
import styles from "./PopupSuksesPencairain.module.css"
import popup from "../../img/popup-tagihan.svg"
const PopupSuksesPencairan = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

                <img className={styles.popup} src={popup} alt="logo" />
                <p className={styles.text}>Pencarian telah diajukan dan akan &emsp;&emsp;diproses dalam 2x24jam</p>
            </div>
        </div>
    )
}
export default PopupSuksesPencairan