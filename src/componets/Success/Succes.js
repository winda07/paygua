import React from 'react'
import styles from "./Succes.module.css"
import thanks from "../../img/popup-tagihan.svg"
import success from "../../img/Logo_LupPW.svg"
import { Link, useHistory } from "react-router-dom";
const Success = () => {
    const history = useHistory();
    let currentRender = (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.logo} src={success} alt="logo" />
                <p className={styles.text}>Success</p>
                <button className={styles.btnSubmit}>
                    <Link to="/login" style={{ textDecoration: 'none' }} className={styles.text1}>Login</Link>
                    {/* <p className={styles.text1}> Masuk</p> */}
                </button>
            </div>
        </div>
    )

    setTimeout(() => {
        history.push("/login")
    }, 3000);
    return currentRender

}

export default Success