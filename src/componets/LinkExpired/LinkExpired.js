import React from 'react'
import styles from "./LinkExpired.module.css"
import thanks from "../../img/popup-tagihan.svg"
import success from "../../img/ion.svg"
import { Link, useHistory } from "react-router-dom";
const LinkExpired = () => {
    let currentRender = (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.logo} src={success} alt="logo" />
                <p className={styles.text}>LinkExpired</p>
                <button className={styles.btnSubmit}>
                    <Link to="/login" style={{ textDecoration: 'none' }} className={styles.text1}>Login</Link>
                    {/* <p className={styles.text1}> Masuk</p> */}
                </button>
            </div>
        </div>
    )
    // const history = useHistory();

    // setTimeout(() => {
    //     history.push("/")
    // }, 3000);

    return currentRender
}

export default LinkExpired