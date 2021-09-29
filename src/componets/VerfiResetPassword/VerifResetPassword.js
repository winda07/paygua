import React, { useState, useEffect } from "react";
import styles from "./VerifResetPassword.module.css"
import lupapw from "../../img/Logo_LupPW.svg"
import { Link, useLocation } from "react-router-dom";
const VerifResetPassword = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.lupapw} src={lupapw} alt="logo" />
                <p className={styles.text}>Reset Password berhasil</p>
                <Link to="/login"><input type="submit" className={styles.btnSubmit} value="Selesai"></input></Link>
            </div>

        </div>
    )
}

export default VerifResetPassword