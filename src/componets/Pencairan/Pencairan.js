import React from 'react'
import styles from './Pencairan.module.css'
import { Link } from 'react-router-dom'
import silang from '../../img/ion.svg'
import bca from '../../img/BCA.svg'
import bni from '../../img/BNI.svg'
import brin from '../../img/BRI.svg'

const Pencairan = () => {
    return (
        <div className={styles.App}>
             <div className={styles['form-signin']}>
             <div className={styles.gbrarow}>
             <Link to="/transaksi"><img className={styles.silang} src={silang}  alt="logo" /></Link>
             <p className={styles.kun}>Ajukan Pencairan</p>
             </div>

             <input type="number" className={styles['form-control-nominal']} id="floatingNominal" placeholder="Nominal"></input>
             <input type="text" className={styles['form-control-nama']} id="floatingNama" placeholder="Nama"></input>
             <input type="number" className={styles['form-control-nominal']} id="floatingNominal" placeholder="Nomor Rekening"></input>

             <div  className={styles.choose}>
             <p>Pilihan Bank </p>
             <br></br> 
             <div>
             <img  src={bca}  alt="logo" />
             <input style={{float: "right"}} type="radio" name="bank" id="BCA"></input>
             </div>
             <div>
             <img  src={bni}  alt="logo" />
             <input style={{float: "right"}} type="radio" name="bank" id="BCA"></input>
             </div>
                <div>
                <img  src={brin}  alt="logo" />
             <input style={{float: "right"}} type="radio" name="bank" id="BCA"></input>
                </div>
                </div>
                <br></br>
                <br></br>
                <div className={styles.btnSubmit}>
                <Link to="/popsuksespencairan"><a ><p className={styles.text2} >Ajukan</p></a></Link>
                </div>
             </div>
        </div>
    )
}

export default Pencairan