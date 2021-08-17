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
                    if (result.data.status === 200) {
                        setValues({
                            ...data,
                            Total: result.data.data.total
                        })
                    } else {
                        history.push('login')
                    }

                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            <button className={styles.boxdua3} >
                <Link style={{ textDecoration: "none", display: "flex", alignItems: "center" }} to="/transaksi">
                    <div>
                        <p style={{ fontSize: "18px", color: "#21242B", height: "15px", textAlign: "left", marginLeft: "14px" }} >Tagihan</p>
                        <p style={{ fontSize: "11.8px", color: "#838790", textAlign: "left", marginLeft: "15px" }}>Kamu memiliki  <b style={{ fontSize: "11.8px", color: "#21242B" }}>{data.Total} Tagihan Aktif</b></p>
                    </div>
                    <div style={{ marginLeft: "97px" }}>
                        <img src={arrow}></img>
                    </div>
                </Link>
                {/* <Link to="/tagihan" style={{
                    display: "flex",
                    alignItems: "center", textDecoration: "none"
                }}>
                    <div style={{ width: "50%" }}>
                        <p style={{ fontSize: "24px", color: "#21242B", height: "1px", textAlign: "left", marginLeft: "15px", marginBottom: "50px" }} >Tagihan</p>
                        <p style={{ fontSize: "12px", color: "#838790", textAlign: "left", marginLeft: "15px" }}>Kamu memiliki <b style={{ fontSize: "12px", color: "#21242B" }}>{data.Total} Tagihan Aktif</b> </p>
                    </div>
                    <div style={{ width: "50%", textAlign: "right", marginLeft: "110px" }}>
                        <img src={arrow}></img>
                    </div>
                </Link> */}


            </button>

        </div>
    )
}

export default GetTotalInvoice;