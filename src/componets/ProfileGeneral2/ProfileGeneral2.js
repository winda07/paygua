import React, {useState} from "react"
import styles from "./ProfileGeneral2.module.css"
import logo from "../../img/logo.svg"
import ovo from "../../img/OVO.svg"
import gopay from "../../img/GOPAY.svg"
import dana from "../../img/DANA.svg"
import linkaja from "../../img/LINKAJA.svg"
import shopeepay from "../../img/SHOPEEPAY.svg"
import qris from "../../img/QRIS.svg"
import transfer from "../../img/Bank Transfer.svg"
const ProfileGeneral2 = () => {
    const [showResults, setShowResults] = useState('');
    const [show, setShow] = useState('');
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                    <h1 className={styles.maudy}>Bayar ke ...</h1>
                    
        <div className={styles.boxdua}>
            <div className={styles.boxdalam}></div>
            <p className={styles.info}>Pulvinar elementum fermentum ied facilisis amet in nunc. Sed tellus facilisis ornare ultricies ultricies nullam euismod.</p>
        </div>
        <input type="text" className={styles['form-control-nama']} id="floatingNama" placeholder="Nama"></input>
             <input type="email" className={styles['form-control-email']} id="floatingEmail" placeholder="Email"></input>
             <input type="number" className={styles['form-control-nominal']} id="floatingNominal" placeholder="Nominal"></input>
             <input type="text" className={styles['form-control-bio']} id="floatingBio" placeholder="Pesan"></input>
             <br></br>
             <br></br>
            <section className={styles['section']}>
            <button className={styles.logoovo} onClick={()=> setShowResults(true) || setShow(false)}><img src={ovo}></img></button>
             <button className={styles.logogopay} onClick={()=> setShowResults(false) || setShow(false)}><img src={gopay}></img></button>
             <button className={styles.logodana} onClick={()=> setShowResults(false)|| setShow(false) }><img src={dana}></img></button>
             <button className={styles.logolinkaja} onClick={()=> setShowResults(false) || setShow(false)}><img src={linkaja}></img></button>
            </section>
             <br></br>
           <section className={styles['section2']}>
           <button className={styles.logoshopeepay} onClick={()=> setShowResults(false) || setShow(false)}><img src={shopeepay}></img></button>
           <button className={styles.logoqris} onClick={()=> setShowResults(false) || setShow(false)}><img src={qris}></img></button>
           <button className={styles.logotransfer} onClick={()=> setShow(true) || setShowResults(false)}><img src={transfer}></img></button>
           </section>
           {
                showResults? <input type="text" className={styles['validateOvo']} placeholder="Masukkan nomor Ovo"></input>: null
            }
            <br></br>

            {
                show ? <p className={styles['total']} >Nominal + 5.000(Biaya Bank) = Total</p> : null
            }
             <div className={styles.btnSubmit}>
                <p className={styles.text2}  >Bayar</p>
                </div>
           
                <img className={styles.logo1} src={logo}  alt="logo" />
            </div>
        </div>
    )
}

export default ProfileGeneral2