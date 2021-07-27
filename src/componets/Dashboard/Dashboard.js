import React from "react";
import styles from "./Dashboard.module.css";
import logo from "../../img/logo.svg";
import GetProfile from "./GetProfile"
import GetBalance from "./GetBalance";
import GetTotalInvoice from "./GetTotalInvoice"
import io from "socket.io-client"


const Dashboard = () => {
  const userId = localStorage.getItem("userId")
  console.log("userId", userId);
  const SERVER = "https://paygua.com"
  const socket = io.connect(SERVER, { query: `userId=${userId}` })
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`)
  })
  socket.on('newNotif', function (data) {
    console.log(data);
  });
  socket.on('totalNotif', function (data) {
    console.log(data);
  });

  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <img src={logo} alt="logo" />
        <span className={styles.menu}>
          <a href="#" ><img src="https://img.icons8.com/android/24/000000/menu.png" /> </a>
          <div className={styles.dropdown}>
            <a href="#">Beranda</a>
            <a href="/notification">Notifikasi</a>
            <a href="/settings">Akun Saya</a>
            <a href="/tentangkami">Tentang Kami</a>
          </div>
        </span>

        <GetProfile></GetProfile>
        <GetBalance></GetBalance>
        <GetTotalInvoice></GetTotalInvoice>
      </div>
    </div>

  );
};

export default Dashboard;
