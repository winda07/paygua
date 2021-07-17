import React from "react"
import styles from "./Daftar2.module.css"
import logo from "../../img/logo.svg"
import profile from "../../img/profile.svg"
import { Link } from "react-router-dom";

const Daftar2 = () => {
    return(
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            <header className={styles['App-header']}>
                 <img src={logo}  alt="logo" />
                    </header>
                 <div className={styles.profile}>
                    <img src={profile}  alt="logo" />
                 </div>
                 <h3 class="h3 mb-3 fw-normal">Lengkapi Profile</h3>
                 <input type="email" className={styles['form-control']} id="floatingNamaLengkap" placeholder="NamaLengkap" ></input>
                 <input type="password" class={styles['form-control']} id="floatingBio" placeholder="Bio"></input>
                 <div className={styles.btnSubmit}>
                <Link style={{textDecoration:'none'}} to="/dashboard"><p className={styles.text}  >Selesai</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Daftar2