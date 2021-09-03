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
import { Link, useHistory, useLocation } from "react-router-dom";
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
import addHome2 from "../../img/addHome2.svg"
import PopupHome from "../PopupHome/PopupHome"
import tagih from "../../img/tagih.svg"
import qrstatis from "../../img/qrcode.svg"
import kirim from "../../img/kirim.svg"
import axios from "axios"
toast.configure()
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const history = useHistory()
  const location = useLocation()
  const [HomePopup, setHome] = useState(false)
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
    total: "",
    name: "",
    qr: ""
  })
  console.log(value.total)
  const setcopy = () => {
    setButtonPopup(true)
    setTimeout(() => {
      setButtonPopup(false)
    }, 1000)
    navigator.clipboard.writeText(`paygua.com/${user.username}`)
  }
  const plusHandleClick = () => {
    setHome(!HomePopup)
  }
  console.log(value.name)
  const setPush = () => {
    const payload = {
      name: value.name,
      qr: value.qr
    }

    history.push({
      pathname: "/Qr",
      state:
        payload
    })
    // history.push("/Qr", payload);
    console.log(value.name)
    console.log(value.qr)
    console.log(payload)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("https://paygua.com/api/user/profile", {
        headers: {
          Authorization: token,
        }
      })
        .then((result) => {
          if (result.data.status === 200) {
            setValues({
              name: result.data.data.name,
              qr: result.data.data.qr
            })
          }
          console.log(result.data.data.name)
        })

    }
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <Link to="/TentangKami"><img className={styles['logo']} src={logo} /></Link>
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
        <PopupHome trigger={HomePopup}>
          <div style={{ display: "flex", textAlign: "center", justifyContent: "space-evenly" }}>
            <div style={{ cursor: "pointer" }}>
              <Link to="/buatTagihan"><img src={tagih}></img></Link>
              <figcaption style={{ fontSize: "9px", color: "white" }}>Tagih</figcaption>
            </div>
            <div style={{ width: "38px", height: "38px", borderRadius: "100%", backgroundColor: "white", cursor: "pointer" }}>
              <img onClick={setPush} style={{ marginTop: "10px" }} src={qrstatis}></img>
              <figcaption style={{ fontSize: "9px", color: "white", marginTop: "10px" }}>Show QR</figcaption>
            </div>
            <div style={{ cursor: "pointer" }}>
              <Link to="/kirimDana"><img src={kirim}></img></Link>
              <figcaption style={{ fontSize: "9px", color: "white" }}>Kirim</figcaption>
            </div>

          </div>
        </PopupHome>
        <footer className={styles.footer}>
          <div className={styles.divfooter}>
            <div className={styles.divfooter1}>
              <img className={styles.home} src={home}></img>
              <figcaption className={styles.beranda}>Beranda</figcaption>
            </div>
            <div className={styles.divfooter2}>
              {HomePopup ?
                <img className={styles.addHome} src={addHome2} onClick={plusHandleClick}></img> :
                <img className={styles.addHome} src={addHome} onClick={plusHandleClick}></img>
              }
            </div>
            <div className={styles.divfooter3}>
              <Link to="/notification"><img className={styles.notif} src={notification}></img></Link>
              <figcaption className={styles.notifikasi}>Notifikasi</figcaption>
            </div>
          </div>

          <Popup
            trigger={buttonPopup}>
          </Popup>
        </footer>
      </div>
    </div>

  );
};

export default Dashboard;
