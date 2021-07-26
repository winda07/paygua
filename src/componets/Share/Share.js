import React, { useState, useEffect } from "react";
import styles from "./Share.module.css";
import share1 from "../../img/share1.svg"
import wa from "../../img/share2.svg"
import telegram from "../../img/share3.svg"
import email from "../../img/share4.svg"
import { Link, useLocation } from "react-router-dom";
import { set } from "react-hook-form";

const Share = () => {
    const location = useLocation();
    const [data, setValues] = useState({
        username: ""
    })
    useEffect(() => {
        setValues({
            username: location.state.username
        })
        console.log(location)
        console.log(data.username)
    }, [])
    return (
        <div className={styles.Applima}>
            <div className={styles["form-signin2"]}>
                <p className={styles.text2}>Bagikan profile mu</p>

                <div className={styles.share1}>
                    <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`paygua.com/${data.username}`) }}>
                        <img className={styles["cop"]} src={share1}></img>
                    </button>
                    <a href="whatsapp://send?text=PAYGUA"> <img src={wa} alt="logo" /></a>
                    <a href="https://t.me/share/url?url='.rawurlencode($url).'&text='
                    "> <img src={telegram} alt="logo" /></a>
                    <a href="mailto:?Subject=Simple Share Buttons&Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://dumetschool.com"> <img src={email} alt="logo" /></a>
                </div>

            </div>
        </div>
    )
}

export default Share