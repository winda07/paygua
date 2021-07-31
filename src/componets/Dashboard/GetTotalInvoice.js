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
                    setValues({
                        ...data,
                        Total: result.data.data.total
                    })
                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            <div className={styles.boxdua3} style={{
                display: "flex",
                alignItems: "center"
            }}>
                <div>
                    <p style={{ fontSize: "24px", color: "#21242B", marginLeft: "25px", height: "15px" }} >Tagihan</p>
                    <p style={{ fontSize: "12px", color: "#838790", marginLeft: "25px" }}>Kamu memiliki <b style={{ fontSize: "12px", color: "#21242B" }}>{data.Total} Tagihan Aktif</b> </p>
                </div>
                <div style={{ width: "30%", textAlign: "right" }}>
                    <Link to="/tagihan"> <img src={arrow}></img></Link>

                </div>

            </div>

        </div>
    )
}

export default GetTotalInvoice;