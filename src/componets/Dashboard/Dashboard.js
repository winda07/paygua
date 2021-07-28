import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import logo from "../../img/logo.svg";
import GetProfile from "./GetProfile"
import GetBalance from "./GetBalance";
import GetTotalInvoice from "./GetTotalInvoice"
import io from "socket.io-client"
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import red from "../../img/reddd.svg"
import { Link, useHistory } from "react-router-dom";
import menu from "../../img/menu.svg"
import merah from "../../img/merah.svg"

toast.configure()
const Dashboard = () => {

  const userId = localStorage.getItem("userId")
  console.log("userId", userId);
  const SERVER = "https://paygua.com"
  const socket = io.connect(SERVER, { query: `userId=${userId}` })
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`)
  })
  socket.on('newNotif', function (data) {
    toast(data, {
      autoClose: 3000, position: toast.POSITION.TOP_RIGHT, progressClassName: ({
        background: '#EE0022',
      }),
    })
    console.log(data);
  });
  socket.on('totalNotif', function (data) {
    console.log("total notif:", data);
    setValues({
      total: data
    })
  });
  const [value, setValues] = useState({
    total: ""
  })
  console.log(value.total)

  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <img src={logo} alt="logo" />

        <span className={styles.menu}>

          <a href="#" ><img className={styles['b']} src={menu} /> </a>
          <p className={styles['total']}>{value.total ? <img src={red}></img> : null}</p>
          <div className={styles.dropdown}>

            <a href="#">Beranda</a>

            <div style={{ display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
              {/* <div> */}
              <Link to="/notification">Notifikasi</Link>
              {/* </div> */}
              <div style={{ width: "40%", textAlign: "right", color: "white" }}>
                {/* <p className={styles['merah']}>{value.total ? <img src={merah}></img> : null}</p> */}
                <p style={{ color: "red" }}>{value.total}</p>
              </div>
            </div>

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
