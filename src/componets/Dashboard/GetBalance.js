import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect, useHistory } from "react-router-dom";
// import Frame from "../../img/Frame.svg"
import arrow from "../../img/arrow>.svg"
import styles from "./Dashboard.module.css";
import { DataUsageSharp } from "@material-ui/icons"

const GetBalance = () => {

    const history = useHistory();
    const [data, setValues] = useState({
        balance: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/balance", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200 && result.data.success) {
                        setValues({
                            ...data,
                            balance: result.data.data.balance
                        })
                    } else {
                        localStorage.clear()
                        history.push('/login')
                    }


                })
        }
    }, []);
    return (
        <div>
            <div>
                <button className={styles.boxdua2} >
                    <Link style={{ textDecoration: "none", display: "flex", alignItems: "center" }} to="/transaksi">
                        <div style={{ width: "50%" }}>
                            <p className={styles.saldotext} >Total Transaksi saat ini</p>
                            <p className={styles.saldo}>Rp{data.balance}</p>
                        </div>
                        <div style={{ width: "50%", textAlign: "right" }}>
                            <img src={arrow}></img>
                        </div>
                    </Link>
                </button>
            </div>

        </div>
    )
}

export default GetBalance;