import React from 'react'
import styles from "./Transaksi.module.css"
import arrow from "../../img/arrow-left.svg"
import { Link } from 'react-router-dom'
import GetBalance from './GetBalance'
import GetHistory from './GetHistory'
const Transaksi = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <GetBalance></GetBalance>
                <p className={styles.box}>Riwayat Transaksi</p>

                <GetHistory></GetHistory>


            </div>
        </div >
    )
}

export default Transaksi