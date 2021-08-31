import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./AdminHome.module.css";

const GetWithdrawal = () => {
    const [data, setValues] = useState({
        getuserinWithdrawal: [],
        totalWithdrawal: ""
    })
    const [finish, setFinish] = useState({
        getnewFinish: []
    })
    useEffect(() => {
        const token = localStorage.getItem("tokenAdmin");
        console.log(token)
        if (token) {
            axios.get("https://paygua.com/api/admin/withdraw", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data, getuserinWithdrawal: result.data.data.withdraws,
                            totalWithdrawal: result.data.data.total
                        })
                    }
                    console.log(result)
                })
        }
    }, []);
    useEffect(() => {
        var input = document.getElementById("search");
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
        const value = document.getElementById("search").value
        axios.get("https://paygua.com/api/admin/withdraw/" + value, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        getuserinWithdrawal: result.data.data.withdraws,
                        totalWithdrawal: result.data.data.total
                    })
                }
                console.log(result)
            })
        console.log("submited", value);
    }
    const handleFinish = (userId) => {
        const token = localStorage.getItem("tokenAdmin");
        axios.post("https://paygua.com/api/admin/finishWithdraw", {
            withdrawId: [userId]
        }, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    axios.get("https://paygua.com/api/admin/withdraw", {
                        headers: {
                            Authorization: token,
                        }
                    })
                        .then((result) => {
                            if (result.data.status === 200) {
                                setValues({
                                    getuserinWithdrawal: result.data.data.withdraws,
                                    totalWithdrawal: result.data.data.total
                                })
                            }
                            console.log(result)
                        })
                }
                console.log(result)
            })
        console.log("handleBlock", userId);
    }
    return (
        <div>
            <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <b style={{ fontSize: "18px", marginRight: "300px" }}>Total Disbursement : Rp. {data.totalWithdrawal}</b>
                    <input style={{ width: "227px", height: "38px", border: "1px solid white", backgroundColor: "#E5E5E5", borderRadius: "15px", padding: "12px 20px", boxSizing: "border-box" }}
                        type="text"
                        class={styles["form-control"]}
                        name="search"
                        id="search"
                    ></input>
                    <button onClick={handleSearchSubmit} hidden id="hiddenSubmit" />
                </div>
                {
                    data.getuserinWithdrawal.map(userinWithdrawal => (

                        <div className={styles.isiUser}>
                            <div style={{ width: "5%" }}>
                                <b>Username</b>
                                <p>{userinWithdrawal.username}</p>
                            </div>
                            <div style={{ width: "5%" }}>
                                <b>Nominal</b>
                                <p>{userinWithdrawal.nominal}</p>
                            </div>
                            <div style={{ width: "5%" }}>
                                <b>Metode</b>
                                <p>{userinWithdrawal.bank}</p>
                            </div>
                            <div style={{ width: "5%" }}>
                                <b>Norek</b>
                                <p>{userinWithdrawal.accNumber}</p>
                            </div>
                            <div style={{ width: "10%" }}>
                                <b>Time</b>
                                <p>{userinWithdrawal.date}</p>
                            </div>
                            <div style={{ width: "10%" }}>
                                <b>Done</b>
                                {userinWithdrawal.isFinish ?
                                    <div style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "green", marginLeft: "10px", marginTop: "5px" }}></div> :
                                    <div style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "black", marginLeft: "10px", marginTop: "5px" }} onClick={() => handleFinish(userinWithdrawal._id)}></div>}

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GetWithdrawal