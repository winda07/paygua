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
                })
        }
    }, []);
    useEffect(() => {
        var input = document.getElementById("searchEmail2");
        input.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.getElementById("hiddenSubmit").click();
            }
        });
    })
    const handleSearchSubmit = (e) => {
        const token = localStorage.getItem("tokenAdmin");
        e.preventDefault();
        const value = document.getElementById("searchEmail2").value
        axios.get("https://paygua.com/api/admin/transaction/" + value, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        getuserinTransaction: result.data.data.transactions,
                        totalTransaction: result.data.data.total
                    })
                }
            })
    }
    return (

        <div>
            <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <b style={{ fontSize: "18px", marginRight: "340px" }}>Total Transaksi : Rp. {data.totalTransaction}</b>
                    <input style={{ width: "227px", height: "38px", border: "1px solid white", backgroundColor: "#E5E5E5", borderRadius: "15px", padding: "12px 20px", boxSizing: "border-box" }}
                        type="text"
                        class={styles["form-control"]}
                        name="searchEmail2"
                        id="searchEmail2"
                    ></input>
                    <button onClick={handleSearchSubmit} hidden id="hiddenSubmit" />
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
                                <p>{userinTransaction.paidUser}</p>
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