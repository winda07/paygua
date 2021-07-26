import React from "react";
import jwt from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
import styles from "./PopupSuksesUbah.module.css"
import popup from "../../img/popup-tagihan.svg";
import { useLocation } from "react-router-dom";


function PopupSuksesTagihan(props) {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const user = jwt(token);
    localStorage.setItem("token", token);

    return (props.trigger) ? (
        <div>
            <div className={styles.App}>
                <div className={styles["form-signin"]}>
                    <img className={styles.popup} src={popup} alt="logo" />
                    <p className={styles.text}>Update Berhasil</p>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";

    // return (props.trigger) ? (
    //     <div className={styles.App}>
    //         <div className={styles["form-signin"]}>
    //             <img className={styles.popup} src={popup} alt="logo" />
    //             <p className={styles.text}>Update Berhasil</p>
    //             <Link style={{ textDecoration: "none" }} to="/share">
    //                 {" "}
    //                 <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`Paygua.com/${props.user}/${props.id}`) }}>
    //                     <Link style={{ textDecoration: "none" }} to="/notifToast"><p className={styles.link}>Paygua.com/{props.user}/{props.id}</p></Link>
    //                 </button>
    //                 {/* <p className={styles.link}>Paygua.com/{props.user}/{props.id}</p> */}
    //             </Link>
    //             {props.children}
    //         </div>
    //     </div>
    // ) : "";
}
export default PopupSuksesTagihan;
