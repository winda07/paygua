import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.svg"
import { Link, Redirect } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Transaksi.module.css"

const GetBalance = () => {
    const [data, setValues] = useState({
        Balance: ""
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
                    setValues({
                        ...data,
                        Balance: result.data.data.balance
                    })
                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            <div>
                <div className={styles.gbrarow}>
                    <Link to="/dashboard"><img src={arrow} alt="logo" /></Link>
                </div>
                <p style={{ color: "#838790" }} >Saldo kamu saat ini</p>
                <p className={styles.kun}>Rp{data.Balance}</p>


            </div>

        </div>
    )
}

export default GetBalance;