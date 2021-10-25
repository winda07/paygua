import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect, useHistory } from "react-router-dom";
import Frame from "../../img/Frame.svg"
import styles from "./Dashboard.module.css";
import { DataUsageSharp } from "@material-ui/icons"
import arrow from "../../img/arrow>.svg"
import animation from "../../img/animation4.webp"
const GetTotalInvoice = () => {
    const history = useHistory();
    const [data, setValues] = useState({
        Total: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/invoice/getTotal", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200 && result.data.success) {
                        setValues({
                            ...data,
                            Total: result.data.data.total
                        })
                    } else {
                        localStorage.clear()
                        history.push('login')
                    }

                })
        }
    }, []);
    return (
        <div>
            <button className={styles.boxdua3} >
                <Link style={{ textDecoration: "none", display: "flex", alignItems: "center" }} to="/tagihan">
                    <div className={styles.div1}>
                        <p style={{ fontSize: "18px", color: "#21242B", height: "15px", textAlign: "left", marginLeft: "14px" }} >Tagihan</p>
                        <p style={{ fontSize: "11.8px", color: "#838790", textAlign: "left", marginLeft: "15px" }}>Kamu memiliki  <b style={{ fontSize: "11.8px", color: "#21242B" }}>{data.Total} Tagihan Aktif</b></p>
                    </div>
                    <div className={styles.div2}>
                        <img src={arrow}></img>
                    </div>
                </Link>
            </button>
        </div>
    )
}

export default GetTotalInvoice;