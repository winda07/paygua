import React from "react";

import styles from './Lupas.module.css'
import logo from "../../img/logo.svg"
import { Link } from "react-router-dom"

const Lupas = () => {
    return (
        <div className={styles.App}>
        <div className={styles['form-signin']}>
          <header className={styles['App-header']}>
            <img src={logo}  alt="logo" />
              <div className="datang">
                  <h2 className="judul">Atur Ulang Kata Sandi</h2>
                  <p className="text-ketentuan"> Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.</p>
                  <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Email" ></input>
                  <div className={styles.btnSubmit}>
                  <Link style={{textDecoration:'none'}} to="/verivlupas"><p class={styles.text} >Lanjut</p></Link>
                  </div>
              </div>
          </header>
        </div>
      </div>
    )
}

export default Lupas