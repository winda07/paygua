import React from 'react'
import styles from "./DetailTagihan.module.css"
import silang from "../../img/ion.svg"
import trash from "../../img/trash.svg"
import { Link } from 'react-router-dom'
const DetailTagihan = () => {
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

             <div className={styles.a}>
             <img  src={trash}  alt="logo" />
            <Link to="/buattagihan"> <p className={styles.change}>Ubah</p></Link>
             </div>
                <br></br>
                <p className={styles.nama}>Nama Penerima</p>
                <br></br>
                <hr></hr>
             </div>
        </div>
    )
}

export default DetailTagihan