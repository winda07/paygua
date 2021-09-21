import React from 'react'
import styles from "./ProfileGeneral.module.css"
import logo from "../../img/logo.webp"
import { Link } from 'react-router-dom'
const ProfileGeneral = () => {
  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <img src={logo} alt="logo" />
        <span className={styles.menu}>
          <a href="#">
            <img src="https://img.icons8.com/android/24/000000/menu.png" />{" "}
          </a>
          <div className={styles.dropdown}>
            <Link to="/"><a href="#">Masuk</a></Link>
            <Link to="/register"><a href="#">Daftar</a></Link>
            <a href="#">Akun Saya</a>
          </div>
        </span>

        <h2 className={styles.kun}>Bayar Ke</h2>

        <div className={styles.boxdua}>
          <div className={styles.boxdalam}>Foto</div>
          <h4 className={styles.nama}>Namauser</h4>
          <p className={styles.info}>Informasi User</p>
        </div>

        <br></br>
        <br></br>
        <input type="text" className={styles['form-control-nama']} id="floatingNama" placeholder="Nama"></input>
        <input type="email" className={styles['form-control-email']} id="floatingEmail" placeholder="Email"></input>
        <input type="number" className={styles['form-control-nominal']} id="floatingNominal" placeholder="Nominal"></input>
        <textarea name="message" rows="10" cols="30" className={styles['form-control-bio']} id="" placeholder="Pesan"></textarea>

        <div className={styles.btnSubmit}>
          <Link to="/popupsukses"> <p className={styles.text2}  >Bayar</p></Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral