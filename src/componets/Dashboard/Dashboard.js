import React from "react";
import styles from "./Dashboard.module.css";
import logo from "../../img/logo.svg";
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <img src={logo} alt="logo" />
        <span className={styles.menu}>
           <a href="#" ><img src="https://img.icons8.com/android/24/000000/menu.png" /> </a>
          <div className={styles.dropdown}>
            <a href="#">Beranda</a>
           <Link to="/notification"> <a href="#">Notifikasi</a></Link>
           <Link to="/settings"> <a href="#">Akun Saya</a></Link>
           <Link to="/tentangkami"> <a href="#">Tentang Kami</a></Link>
          </div>
            </span>
            <div className={styles.box1}>
            <p className={styles.usertext}>Foto User</p>
         </div>
            <div className={styles.boxdua}>
            <Link to="/share"><img className={styles.share} src={share} alt="logo" /></Link>
              <div className={styles.boxdalam}>
                 <Link to="/notiftoast"> <img className={styles.cop} src={copy} alt="logo" /></Link>
              </div>
            </div>
  
           <Link to="/transaksi"> <div className={styles.boxdua2}>Saldo Kamu saat ini</div></Link>
            <div className={styles.boxdua3}>Tagihan</div>
      </div>
      </div>
  
  );
};

export default Dashboard;
