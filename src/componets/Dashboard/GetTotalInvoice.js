import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect } from "react-router-dom";
import Frame from "../../img/Frame.svg"
import styles from "./Dashboard.module.css";
import { DataUsageSharp } from "@material-ui/icons"

const GetTotalInvoice = () => {
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
            <div className={styles.boxdua3}>
                <p >Tagihan</p>
                <p>Kamu memiliki <b>{data.Total} Tagihan Aktif</b> </p>
            </div>

        </div>
    )
}

export default GetTotalInvoice;