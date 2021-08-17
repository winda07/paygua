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
import merah from "../../img/merahNotif.svg"
import home from "../../img/home.svg"
import notification from "../../img/notification.svg"
import addHome from "../../img/addHome.svg"
import pengaturan from "../../img/pengaturan.svg"
import Logout from "../../img/Logout.svg"

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
        <img className={styles['logo']} src={logo} alt="logo" />

        {/* <span className={styles.menu}>

          <a href="#" ><img className={styles['b']} src={menu} /> </a>
          <p className={styles['total']}>{value.total ? <img src={red}></img> : null}</p>
          <div className={styles.dropdown}>

            <a href="#">Beranda</a>

            <div style={{ display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
              <Link to="/notification">Notifikasi</Link> */}

        {/* <div style={{ display: "flex", width: "20px", height: "20px", backgroundColor: "red", borderRadius: "50%", marginLeft: "40px" }}> */}
        {/* <p className={styles['merah']}>{value.total ? <img src={merah}></img> : null}</p> */}
        {/* <p style={{ margin: "auto" }}>{value.total}</p> */}
        {/* </div> */}
        {/* <div>
                <p style={{ marginLeft: "45px", color: "red" }}>{value.total}</p>
              </div>
            </div>

            <a href="/settings">Akun Saya</a>
            <a href="/">Tentang Kami</a>
          </div>
        </span> */}
        <div style={{ height: "200px" }}>
          <GetProfile></GetProfile>
        </div>

        <div style={{ height: "130px" }}>
          <GetBalance></GetBalance>
        </div>
        <GetTotalInvoice></GetTotalInvoice>
        <section className={styles.footer}>
          <div>
            <img className={styles.home} src={home}></img>
            <p className={styles.beranda}>Beranda</p>
          </div>
          <div>
            <Link to="/notification"><img className={styles.notif} src={notification}></img></Link>
            <p className={styles.notifikasi}>Notifikasi</p>
          </div>
          <img className={styles.addHome} src={addHome}></img>
          <div>
            <Link to="/settings"><img className={styles.pengaturan} src={pengaturan}></img></Link>
            <p className={styles.settings}>Pengaturan</p>
          </div>
          <div>
            <Link to="/"><img className={styles.logout} src={Logout}></img></Link>
            <p className={styles.log}>Logout</p>
          </div>

        </section>
      </div>
    </div>

  );
};

export default Dashboard;
