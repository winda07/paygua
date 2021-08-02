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
            <button className={styles.boxdua3} >
                <Link to="/tagihan" style={{
                    display: "flex",
                    alignItems: "center", textDecoration: "none"
                }}>
                    <div>
                        <p style={{ fontSize: "24px", color: "#21242B", marginLeft: "15px", height: "15px", textAlign: "left" }} >Tagihan</p>
                        <p style={{ fontSize: "12px", color: "#838790", marginLeft: "15px" }}>Kamu memiliki <b style={{ fontSize: "12px", color: "#21242B" }}>{data.Total} Tagihan Aktif</b> </p>
                    </div>
                    <div style={{ width: "30%", textAlign: "right" }}>
                        <img src={arrow}></img>

                    </div>
                </Link>


            </button>

        </div>
    )
}

export default GetTotalInvoice;