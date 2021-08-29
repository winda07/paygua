import React, { useState, useEffect } from 'react';
import styles from "./QrStatis.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link, useLocation } from "react-router-dom";
import animation from "../../img/animation4.svg"


const QrStatis = () => {
    const location = useLocation()
    const [data, setValues] = useState({
        name: "",
        qr: ""
    })
    // const a = () => {
    //     setValues({
    //         ...data,
    //         name: location.state.name,
    //         qr: location.state.qr
    //     })
    //     console.log(location.state.name)
    // }
    useEffect(() => {
        setValues({
            ...data,
            name: location.name,
            qr: location.qr
        })
        console.log(setValues({ name: location.name }))
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.div1}>
                    <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                    <p className={styles.judul}>{location.name} </p>
                </div>
                <img className={styles.image} src={animation}></img>
                <figcaption className={styles.caption}>Fitur sedang dikembangkan</figcaption>
            </div>
        </div>
    )
}

export default QrStatis