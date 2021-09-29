import React, { useState, useEffect } from "react";
import styles from "./Share.module.css";
import share1 from "../../img/share1.svg"
import wa from "../../img/share2.svg"
import telegram from "../../img/share3.svg"
import email from "../../img/share4.svg"
import { Link, useLocation } from "react-router-dom";
import { set } from "react-hook-form";
import jwt from "jwt-decode"
import Popup from "../PopupCopy/PopupCopy"

function Share(props) {
    const [buttonPopup, setButtonPopup] = useState(false);
    // const location = useLocation();
    // const [data, setValues] = useState({
    //     username: ""
    // })
    // useEffect(() => {
    //     setValues({
    //         ...data,
    //         username: location.state.username
    //     })
    // })
    const setcopy = () => {
        setButtonPopup(true)
        setTimeout(() => {
            setButtonPopup(false)
        }, 1000)
        // navigator.clipboard.writeText(`paygua.com/${data.username}`)
    }
    const user = localStorage.getItem("username");
    console.log(user.username)
    return (props.trigger) ? (
        <div className={styles.Applima}>
            <div className={styles["form-signin2"]}>
                <p className={styles.text2}>Bagikan profile mu</p>

                <div className={styles.share1}>
                    <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`paygua.com/${user}`) }}>
                        <img onClick={setcopy} className={styles["cop"]} src={share1}></img>
                    </button>
                    <a href={`whatsapp://send?text=paygua.com/${user}`}> <img src={wa} alt="logo" /></a>
                    <a href={`https://t.me/share/url?url=paygua.com/${user}`}> <img src={telegram} alt="logo" /></a>
                    <a href={`mailto:?Subject=Paygua&Body=paygua.com/${user}`}> <img src={email} alt="logo" /></a>
                </div>
                <Popup
                    trigger={buttonPopup}></Popup>
            </div>
        </div>
    ) : ""
}

export default Share