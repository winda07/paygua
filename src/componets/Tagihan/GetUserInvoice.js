import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.svg"
import { Link, Redirect } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Tagihan.module.css"
import arroww from "../../img/arrow>.svg"
import time from "../../img/time.svg"
import { red } from "@material-ui/core/colors";

const GetUserInvoice = () => {
    const [data, setValues] = useState({
        tagihan: []
    })
    const token = localStorage.getItem("token");
    const user = jwt(token)
    localStorage.setItem('token', token);
    useEffect(() => {
        if (token) {
            axios.get("https://paygua.com/api/invoice/getMyInvoice", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        setValues({
                            ...data, tagihan: result.data.data
                        })


                    }
                    console.log(result.data)

                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            {
                data.tagihan.map(tghn => (
                    <div className={styles.a}>

                        <div className={styles.boxdua} style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <div style={{ width: "50%" }}>
                                <p style={{ color: "#838790", fontSize: "12px", margin: "10px" }}>{tghn.isPaid === false ? <p>belum dibayar</p> : <p>sudah dibayar</p>}</p>
                                <div style={{ fontSize: "16px", margin: "10px" }}>
                                    <p style={{ marginTop: "10px" }}>{tghn.name}<br></br>Rp{tghn.nominal}</p>

                                </div>
                                <Link style={{ textDecoration: "none" }} to="/share"> <p className={styles.link}>Paygua.com/{user.username}/{tghn.invoiceId}</p></Link>
                            </div>
                            <div style={{ width: "50%", textAlign: "right", marginTop: "70px" }}>
                                <Link to="/"><img src={arroww}></img></Link>
                                <p style={{ marginRight: "5px", fontSize: "12px" }}><img style={{ float: "left", marginLeft: "115px" }} src={time}></img>{tghn.expireIn} hari</p>

                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default GetUserInvoice;