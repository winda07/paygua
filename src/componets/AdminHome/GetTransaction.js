import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./AdminHome.module.css";

const GetTransaction = () => {
    const [data, setValues] = useState({
        getuserinTransaction: [],
        totalTransaction: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("tokenAdmin");
        console.log(token)
        if (token) {
            axios.get("https://paygua.com/api/admin/transaction", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data, getuserinTransaction: result.data.data.transactions,
                            totalTransaction: result.data.data.total
                        })
                    }
                    console.log(result)
                })
            // console.log(data.getuser)
        }
    }, []);
    return (

        <div>
            {console.log(data.getuserinTransaction)}
            <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <b style={{ fontSize: "18px", marginRight: "340px" }}>Total Transaksi : Rp. {data.totalTransaction}</b>
                    <input style={{ width: "227px", height: "38px", border: "1px solid white", backgroundColor: "#E5E5E5", borderRadius: "15px" }}
                        type="text"
                        class={styles["form-control"]}
                        name="search"
                    ></input>
                </div>
                {
                    data.getuserinTransaction.map(userinTransaction => (

                        <div className={styles.isiUser}>
                            <div style={{ width: "5%" }}>
                                <b>ID</b>
                                <p>{userinTransaction.orderId}</p>
                            </div>
                            <div style={{ width: "5%" }}>
                                <b>Username</b>
                                <p>{userinTransaction.username}</p>
                            </div>
                            <div style={{ width: "15%" }}>
                                <b>Email</b>
                                <p style={{ textDecoration: "underline" }}>{userinTransaction.email}</p>
                            </div>
                            <div style={{ width: "5%" }}>
                                <b>Method</b>
                                <p>{userinTransaction.paymentMethod}</p>
                            </div>
                            <div style={{ width: "10%" }}>
                                <b>Nominal</b>
                                <p>{userinTransaction.nominal}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GetTransaction