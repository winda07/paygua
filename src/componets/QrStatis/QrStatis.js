import React, { useState, useEffect } from 'react';
import styles from "./QrStatis.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link, useLocation, useHistory } from "react-router-dom";
import animation from "../../img/animation4.webp"
import gopayQR from "../../img/gopayQR.svg"
import ovoQR from "../../img/ovoQR.svg"
import danaQR from "../../img/danaQR.svg"
import linkajaQR from "../../img/linkajaQR.svg"
import shopeeQR from "../../img/shopeeQR.svg"
import bcaQR from "../../img/bcaQR.svg"
import mandiriQR from "../../img/mandiriQR.svg"
import bniQR from "../../img/bniQR.svg"
import briQR from "../../img/briQR.svg"
import jeniusQR from "../../img/jeniusQR.svg"
import cimbQR from "../../img/cimbQR.svg"
import bankmegaQR from "../../img/bankmegaQR.svg"
import permataQR from "../../img/permataQR.svg"
import uobQR from "../../img/uobQR.svg"
import qrisQR from "../../img/qrisQR.svg"
import QrCode from "qrcode"

const QrStatis = () => {
    const location = useLocation()
    const history = useHistory()
    const [data, setValues] = useState({
        name: "",
        qr: ""
    })
    const creatQrCode = (text) => {
        console.log(text)
        QrCode.toCanvas(document.getElementById("canvas"), text, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    useEffect(() => {
        setValues({
            ...data,
            name: location.state.name,
            qr: location.state.qr
        })
        creatQrCode(location.state.qr)
        console.log(location)
        console.log(history)
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                <b className={styles.judul}>{location.state.name}</b>
                <canvas className={styles.canvas} id="canvas"></canvas>
                <p className={styles.description}>Silahkan scan QR dengan metode dibawah ini</p>
                <section className={styles.gambar}>
                    <img src={gopayQR}></img>
                    <img src={ovoQR}></img>
                    <img src={danaQR}></img>
                    <img src={linkajaQR}></img>
                    <img src={shopeeQR}></img>
                </section>
                <section className={styles.gambar}>
                    <img src={bcaQR}></img>
                    <img src={mandiriQR}></img>
                    <img src={bniQR}></img>
                    <img src={briQR}></img>
                    <img src={jeniusQR}></img>
                </section>
                <section className={styles.gambar}>
                    <img src={cimbQR}></img>
                    <img src={bankmegaQR}></img>
                    <img src={permataQR}></img>
                    <img src={uobQR}></img>
                    <img src={qrisQR}></img>
                </section>
                <br></br>
                <Link to="/notification"><button className={styles.buttonQr}><p style={{ color: "white", fontSize: "18px", marginTop: "12px", textAlign: "center" }}>Cek Pembayaran</p></button></Link>
            </div>
        </div>
    )
}

export default QrStatis