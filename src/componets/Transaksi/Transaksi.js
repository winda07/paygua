import React from 'react'
import styles from "./Transaksi.module.css"
import arrow from "../../img/arrow-left.svg"
import panahbawah from "../../img/panahbawah.svg"
import { Link } from 'react-router-dom'
const Transaksi = () => {
    return (
        <div className={styles.App}>
             <div className={styles['form-signin']}>
             <div className={styles.gbrarow}>
            <Link to="/dashboard"><img src={arrow}  alt="logo" /></Link>
            </div>
            <h6>Saldo kamu saat ini</h6>
            <p className={styles.kun}>Rp999,999,999</p>
            <button className={styles.button}>
                  <Link to="/pencairan"> <p>Cairkan</p></Link>
                    </button>

                    <div className={styles.boxdua}>
                    <p>Riwayat Transaksi</p>
                <h4>&emsp;&emsp;Irfan Aziz <br></br>&emsp;&emsp;(tanggal)</h4>
                <img className={styles.arah} src={panahbawah}  alt="logo" />
                <h4>&emsp;&emsp;Pencairan <br></br>&emsp;&emsp;(tanggal)</h4>
                <img className={styles.arah} src={panahbawah}  alt="logo" />
                <h4>&emsp;&emsp;Iqbal Sadega <br></br>&emsp;&emsp;(tanggal)</h4>
                <img className={styles.arah} src={panahbawah}  alt="logo" />
                <h4>&emsp;&emsp;Budi <br></br>&emsp;&emsp;(tanggal)</h4>
                <img className={styles.arah} src={panahbawah}  alt="logo" />
                <h4>&emsp;&emsp;Jefri Syalala <br></br>&emsp;&emsp;(tanggal)</h4>
                <img className={styles.arah} src={panahbawah}  alt="logo" />
                
                
                </div>

             </div>
        </div>
    )
}

export default Transaksi