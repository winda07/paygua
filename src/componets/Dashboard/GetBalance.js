import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.webp"
import copy from "../../img/copy.webp"
import { Link, Redirect, useHistory } from "react-router-dom";
// import Frame from "../../img/Frame.webp"
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
        // const user = jwt(token)
        // const dateNow = new Date();
        // const expToken = new Date(user.exp * 1000);
        // if (dateNow < expToken) {
        if (token) {
            axios.get("https://paygua.com/api/user/balance", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data,
                            balance: result.data.data.balance
                        })
                    } else {
                        history.push('/login')
                    }

                })
            console.log(data)
        }
        // } else {
        //     history.push('/login')
        // }

        // console.log("jwt", user)
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