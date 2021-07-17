import React from 'react'
import styles from './BuatTagihan.module.css'
import { Link } from 'react-router-dom'
import silang from '../../img/ion.svg'
const BuatTagihan = () => {
    return (
        <div className={styles.App}>
             <div className={styles['form-signin']}>
             <div className={styles.gbrarow}>
             <Link to="/tagihan"><img className={styles.silang} src={silang}  alt="logo" /></Link>
             <p className={styles.kun}>Tagihan 006</p>
             </div>


             <input type="text" className={styles['form-control-nama']} id="floatingNama" placeholder="Nama"></input>
             <input type="email" className={styles['form-control-email']} id="floatingEmail" placeholder="Email"></input>
             <input type="number" className={styles['form-control-nominal']} id="floatingNominal" placeholder="Nominal"></input>
             <textarea name="message" rows="10" cols="30" className={styles['form-control-bio']} id="" placeholder="Pesan"></textarea>
                <br></br>
           

             <div className={styles.btnSubmit}>
            <Link to="/popupsuksestagihan"> <p className={styles.text2}>Selesai</p></Link>
        </div>

             </div>
        </div>
    )
}

export default BuatTagihan