import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect } from "react-router-dom";
// import Frame from "../../img/Frame.svg"
import arrow from "../../img/arrow>.svg"
import styles from "./Dashboard.module.css";
import { DataUsageSharp } from "@material-ui/icons"

const GetBalance = () => {
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
                    setValues({
                        ...data,
                        balance: result.data.data.balance
                    })
                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            <div>
                <div className={styles.boxdua2} style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div style={{ width: "50%" }}>
                        <p >Saldo Kamu saat ini</p>
                        <p>Rp{data.balance}</p>

                    </div>
                    <div style={{ width: "50%", textAlign: "right" }}>
                        <Link to="/transaksi"> <img src={arrow}></img></Link>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default GetBalance;