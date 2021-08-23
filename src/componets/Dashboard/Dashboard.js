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
import Popup from "../PopupCopy/PopupCopy"
import copy from "../../img/copy.svg"
import jwt from "jwt-decode"
toast.configure()
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const user = jwt(token)
  const [buttonPopup, setButtonPopup] = useState(false);
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
  const setcopy = () => {
    setButtonPopup(true)
    setTimeout(() => {
      setButtonPopup(false)
    }, 1000)
    navigator.clipboard.writeText(`paygua.com/${user.username}`)
  }
  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <img className={styles['logo']} src={logo} />
        <Link to="/settings"><img className={styles.pengaturan} src={pengaturan}></img></Link>

        <div style={{ height: "200px" }}>
          <GetProfile></GetProfile>
          <button className={styles.boxdalam2} onClick={setcopy}>
            <p className={styles.a}>{`paygua.com/${user.username}`}</p>
            <img className={styles["cop"]} src={copy}></img>
          </button>
        </div>



        <div style={{ height: "130px" }}>
          <GetBalance></GetBalance>
        </div>
        <GetTotalInvoice></GetTotalInvoice>
        <br></br>
        <footer className={styles.footer}>
          <div style={{ float: "left" }}>
            <img className={styles.home} src={home}></img>
            <p className={styles.beranda}>Beranda</p>
          </div>
          <div style={{ float: "left" }}>
            <Link to='/buatTagihan'><img className={styles.addHome} src={addHome}></img></Link>
          </div>
          <div style={{ float: "left" }}>
            <Link to="/notification"><img className={styles.notif} src={notification}></img></Link>
            <p className={styles.notifikasi}>Notifikasi</p>
          </div>
          <Popup
            trigger={buttonPopup}>
          </Popup>
          {/* <div style={{ float: "left" }}>
            <Link to="/settings"><img className={styles.pengaturan} src={pengaturan}></img></Link>
            <p className={styles.settings}>Pengaturan</p>
          </div>
          <div style={{ float: "left" }}>
            <Link to="/login"><img className={styles.logout} src={Logout}></img></Link>
            <p className={styles.log}>Logout</p>
          </div> */}
        </footer>
        {/* <section className={styles.footer}>
          <div>
            <img className={styles.home} src={home}></img>
            <p className={styles.beranda}>Beranda</p>
          </div>
          <div>
            <Link to="/notification"><img className={styles.notif} src={notification}></img></Link>
            <p className={styles.notifikasi}>Notifikasi</p>
          </div>
          <Link to='/buatTagihan'><img className={styles.addHome} src={addHome}></img></Link>

          <div>
            <Link to="/settings"><img className={styles.pengaturan} src={pengaturan}></img></Link>
            <p className={styles.settings}>Pengaturan</p>
          </div>
          <div>
            <Link to="/login"><img className={styles.logout} src={Logout}></img></Link>
            <p className={styles.log}>Logout</p>
          </div>

        </section> */}
      </div>
    </div>

  );
};

export default Dashboard;
