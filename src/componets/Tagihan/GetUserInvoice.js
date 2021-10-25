import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.svg"
import { Link, useHistory } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Tagihan.module.css"
import arroww from "../../img/arrow>.svg"
import time from "../../img/time.svg"
import { red } from "@material-ui/core/colors";
import PopupCopy from "../PopupCopy2/PopupCopy2";
import animation from "../../img/animation5.webp"
import Loading from "../Loading/Loading"
import plus from "../../img/add.svg"

const GetUserInvoice = () => {
    const [loadingPopup, setButtonLoading] = useState(false);
    const [buttoncopy, setButtonCopy] = useState(false)
    const [render, setRender] = useState(false);
    const [data, setValues] = useState({
        tagihan: []
    })
    const history = useHistory();
    const tagihanClick = (idx) => {
        history.push({
            pathname: '/detailTagihan',
            state: {
                nama: data.tagihan[idx].name,
                email: data.tagihan[idx].email,
                nominal: data.tagihan[idx].nominal,
                message: data.tagihan[idx].message,
                invoiceId: data.tagihan[idx].invoiceId,
                isExpired: data.tagihan[idx].isExpired
            }
        });
    }
    const setcopy = () => {
        setButtonCopy(true)
        setTimeout(() => {
            setButtonCopy(false)
        }, 1000)
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    localStorage.setItem('token', token);
    useEffect(() => {
        if (token) {
            setButtonLoading(true)
            axios.get("https://paygua.com/api/invoice/getMyInvoice", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200 && result.data.success) {
                            setButtonLoading(false)
                            setRender(true);
                            setValues({
                                ...data, tagihan: result.data.data
                            })
                        } else {
                            setButtonLoading(false)
                            localStorage.clear()
                            history.push('/login')
                        }

                    }

                })
        }
    }, []);
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.div1}>
                    <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                    <p className={styles.judul}>Tagihan </p>
                </div>
                <img className={styles.image} src={animation}></img>
                <figcaption className={styles.caption}>Fitur sedang dikembangkan</figcaption>
            </div>
        </div>
        // <div>
        //     <div className={styles.App}>
        //         <div className={styles['form-signin']}>
        //             <div style={{ display: "flex", justifyContent: "space-between" }}>
        //                 <div>
        //                     <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
        //                     <p className={styles.tagihan}>Tagihan</p>
        //                 </div>
        //                 <div>
        //                     <Link style={{ textDecoration: 'none' }} to="/buattagihan"><button className={styles.button}> <p style={{ display: "flex", textAlign: "center", justifyContent: "center", marginTop: "7px", fontSize: "14px" }}>Buat &nbsp; <img src={plus}></img></p></button></Link>
        //                 </div>
        //             </div>
        //             <br></br>
        //             {render ? <div>
        //                 {data.tagihan.length === 0 ? <div className={styles.animation1} style={{ marginLeft: "70px", marginTop: "70px" }}>
        //                     <img className={styles.animation2} style={{ width: "246px", height: "246px" }} src={animation}></img>
        //                     <figcaption className={styles.animation3} style={{ fontSize: "20px", color: "black" }}>Belum ada tagihan, bos..</figcaption>
        //                 </div>
        //                     : data.tagihan.map((tghn, idx) => (
        //                         <div className={styles.a}>
        //                             <div className={styles.boxdua} style={{
        //                                 display: "flex",
        //                                 alignItems: "center"
        //                             }} >
        //                                 <div style={{ width: "50%" }}>
        //                                     <p onClick={() => tagihanClick(idx)} style={{ color: "#838790", fontSize: "12px", margin: "10px" }}>{tghn.isPaid === false ? <p style={{ color: "#ECB800" }}>Belum dibayar</p> : <p style={{ color: "#006AFF" }}>Sudah dibayar</p>}</p>
        //                                     <div style={{ fontSize: "16px", margin: "10px" }}>
        //                                         <p onClick={() => tagihanClick(idx)} style={{ marginTop: "10px" }}>{tghn.name}<br></br>Rp{tghn.nominal}</p>
        //                                     </div>
        //                                     <button className={styles["a"]} onClick={() => navigator.clipboard.writeText(`paygua.com/${user}/${tghn.invoiceId}`)}>
        //                                         <p onClick={setcopy} className={styles.link}>Paygua.com/{user}/{tghn.invoiceId}</p>
        //                                     </button>
        //                                 </div>
        //                                 <div onClick={() => tagihanClick(idx)} style={{ width: "40%", textAlign: "right", marginTop: "70px" }}>
        //                                     <div ><img onClick={() => tagihanClick(idx)} style={{ cursor: "pointer" }} src={arroww}></img></div>
        //                                     <div style={{ display: 'flex', justifyContent: "right", marginLeft: "110px" }}>
        //                                         <img className={styles.time} src={time}></img>
        //                                         <p style={{ fontSize: "12px" }}>{tghn.isExpired === false ? <p>{tghn.expireIn}Hari</p> : <p>{tghn.expireIn}</p>}</p>

        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //             </div> : null}
        //         </div>
        //         <PopupCopy trigger={buttoncopy}>
        //             <p style={{ marginLeft: "40px" }}>Berhasil disalin ke Clipboard!</p>
        //         </PopupCopy>

        //     </div>
        //     <Loading trigger={loadingPopup}></Loading>

        // </div>
    )
}
export default GetUserInvoice;