import React, { useState, useEffect } from "react";
import styles from "./Share.module.css";
import share1 from "../../img/share1.svg"
import wa from "../../img/share2.svg"
import telegram from "../../img/share3.svg"
import email from "../../img/share4.svg"
import { Link, useLocation } from "react-router-dom";
import { set } from "react-hook-form";
import jwt from "jwt-decode"

const Share = () => {
    const token = localStorage.getItem("token");
    const user = jwt(token)
    console.log(user.username)
    return (
        <div className={styles.Applima}>
            <div className={styles["form-signin2"]}>
                <p className={styles.text2}>Bagikan profile mu</p>

                <div className={styles.share1}>
                    <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`paygua.com/${user.username}`) }}>
                        <Link to="/notiftoast"><img className={styles["cop"]} src={share1}></img></Link>
                    </button>
                    <a href={`whatsapp://send?text=paygua.com/${user.username}`}> <img src={wa} alt="logo" /></a>
                    <a href={`https://t.me/share/url?url=paygua.com/${user.username}`}> <img src={telegram} alt="logo" /></a>
                    <a href={`mailto:?Subject=Paygua&Body=paygua.com/${user.username}`}> <img src={email} alt="logo" /></a>
                </div>

            </div>
        </div>
    )
}

export default Share