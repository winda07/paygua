import React from 'react'
import styles from "./Succes.module.css"
import thanks from "../../img/popup-tagihan.svg"
import success from "../../img/Logo_LupPW.svg"
import { Redirect, useHistory } from 'react-router-dom'
const Success = () => {
    let currentRender = (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.logo} src={success} alt="logo" />
                <p className={styles.text}>Success</p>
            </div>
        </div>
    )
    // const history = useHistory();
    // setTimeout(() => {
    //     history.push("/")
    // }, 3000);
    return currentRender

}

export default Success