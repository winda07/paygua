import React, { useState, useEffect } from "react";
import styles from "./VerivLupas.module.css"
import lupapw from "../../img/Logo_LupPW.svg"
import { Link, useLocation } from "react-router-dom";
import animation from "../../img/animation1.webp"
const VerivLupas = () => {
    const location = useLocation()
    const [data, setValues] = useState({
        email: ""
    })

    useEffect(() => {
        setValues({
            ...data,
            email: location.state.email
        })
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <img className={styles.lupapw} src={animation} alt="logo" />
                <p className={styles.text}>Email pemulihan telah terkirim ke {data.email}</p>
                <Link to="/login"><input type="submit" className={styles.btnSubmit} value="Selesai"></input></Link>
            </div>

        </div>
    )
}

export default VerivLupas