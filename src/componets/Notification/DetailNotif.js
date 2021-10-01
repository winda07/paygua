import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from "react-router-dom";
import arrow from "../../img/arrow-left.svg"
import styles from "./Notification.module.css"
import logo from "../../img/payguawhite.svg"
import logoblack from "../../img/logo.svg"
import axios from "axios";
import moment from "moment"
import Loading from "../Loading/Loading"
const DetailNotif = () => {
    const [loadingPopup, setButtonLoading] = useState(false);
    const [render, setRender] = useState(false);
    const [data, setValues] = useState({
        orderId: "",
        isPaid: "",
        date: "",
        nominal: "",
        paidUser: "",
        name: "",
        message: ""
    })
    const location = useLocation()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setButtonLoading(true)

            axios.get("https://paygua.com/api/transaction/detail/" + location.state.orderId, {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            setButtonLoading(false)
                            setRender(true);
                            setValues({
                                isPaid: result.data.data.isPaid,
                                date: result.data.data.date,
                                nominal: result.data.data.nominal,
                                paidUser: result.data.data.paidUser,
                                name: result.data.data.name,
                                message: result.data.data.message
                            })
                        } else {
                        }
                        console.log("result detail: ", result)

                    }
                })

        }
    }, []);
    return (
        <>
            {render ? < div className={styles.App}>
                <div className={styles["form-signin"]}>
                    <div style={{ display: "flex" }}>
                        <Link to="/notification"><img style={{ marginTop: "5px" }} src={arrow}></img></Link>
                        <b style={{ fontSize: "24px" }}>Detail Pembayaran</b>
                    </div>
                    <div className={styles.detailbox}>
                        <div className={styles.detailbox2}>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <img src={logo}></img>
                                <p style={{ color: "white" }}>ID {location.state.orderId}</p>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bolder" }}>STATUS PEMBAYARAN</p>
                                <p> {data.isPaid ? <div style={{ fontSize: "12px", fontWeight: "boldere", color: "#1238F7" }}>
                                    BERHASIL
                                </div> : <div style={{ fontSize: "12px", fontWeight: "bolder", color: "#FF9900" }}>
                                    PENDING
                                </div>}</p>
                            </div>
                            <div style={{ marginLeft: "37px" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bolder", color: "#7A7A7A" }}>Waktu Pembayaran</p>
                                <p style={{ fontSize: "12px", fontWeight: "bolder", color: "black", marginTop: "-5px" }}>{moment(data.date).format('DD MMMM YYYY, H:mm')} WIB</p>
                                <p style={{ fontSize: "18px", fontWeight: "bolder", color: "#006AFF", marginTop: "20px" }}>{data.nominal}</p>
                            </div>

                            <div style={{ display: "flex", marginLeft: "37px" }}>
                                <div style={{ fontSize: "12px", fontWeight: "bolder", color: "#7A7A7A" }}>Nama Pengirim</div>
                                <b style={{ fontSize: "12px", marginLeft: "115px" }}>{data.paidUser}</b>
                            </div>

                            <div style={{ display: "flex", marginLeft: "37px" }}>
                                <div style={{ fontSize: "12px", fontWeight: "bolder", color: "#7A7A7A" }}>Nama Penerima</div>
                                <b style={{ fontSize: "12px", marginLeft: "110px" }}>{data.name}</b>
                            </div>

                            <div style={{ marginLeft: "37px" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bolder", color: "#7A7A7A" }}>Pesan</p>
                                <p style={{ fontSize: "12px", fontWeight: "bolder", color: "black", marginTop: "-5px" }}>{data.message}</p>
                            </div>
                            <p style={{ fontSize: "12px", fontWeight: "bolder", color: "#7A7A7A", marginLeft: "37px", marginTop: "40px" }}>Terima pembayaran digital <br></br> gak pake ribet di <span style={{ color: "#006AFF", fontWeight: "bolder" }}>paygua.com</span></p>
                        </div>
                    </div>
                    <button className={styles.detailbtn}>Download Bukti</button>
                    <p style={{ fontSize: "12px", fontWeight: "bolder", color: "black", textAlign: "center" }}>Cek email yang anda input untuk <br></br> mendapatkan bukti</p>
                    <img style={{ marginLeft: "110px", marginTop: "20px" }} src={logoblack}></img>
                </div>

                <Loading trigger={loadingPopup}></Loading>
            </div> : null}

        </>
    )

}
export default DetailNotif;