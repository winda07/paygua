import React from "react";
import styles from "./Share.module.css";
import share1 from "../../img/share1.svg"
import wa from "../../img/share2.svg"
import telegram from "../../img/share3.svg"
import email from "../../img/share4.svg"

const Share = () => {

    return (
        <div className={styles.Applima}>
            <div className={styles["form-signin2"]}>
            <p className={styles.text2}>Bagikan profile mu</p>

                <div className={styles.share1}>
                <a href="Notif-Toast.html"> <img src={share1}  alt="logo" /></a>
                <a href="whatsapp://send?text=PAYGUA"> <img src={wa}  alt="logo" /></a>
                <a href="https://t.me/share/url?url='.rawurlencode($url).'&text='
                    "> <img src={telegram}  alt="logo" /></a>
                <a href="mailto:?Subject=Simple Share Buttons&Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://dumetschool.com"> <img src={email}  alt="logo" /></a>
                </div>

            </div>
        </div>
    )
}

export default Share