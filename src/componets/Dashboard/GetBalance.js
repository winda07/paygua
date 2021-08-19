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
                            <p style={{ fontSize: "12px", color: "#838790", height: "1px", textAlign: "left", marginLeft: "14px" }} >Saldo kamu saat ini</p>
                            <p style={{ fontSize: "24px", color: "#21242B", textAlign: "left", marginLeft: "13px" }}>Rp{data.balance}</p>
                        </div>
                        <div style={{ width: "50%", alignItems: "right", marginLeft: "110px" }}>
                            <img src={arrow}></img>
                        </div>
                    </Link>
                </button>
                {/* <div className={styles.boxdua2} style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div style={{ width: "50%", marginLeft: "25px" }}>
                        <p style={{ fontSize: "12px", color: "#838790", height: "1px" }} >Saldo Kamu saat ini</p>
                        <p style={{ fontSize: "24px", color: "#21242B" }}>Rp{data.balance}</p>

                    </div>
                    <div style={{ width: "35%", textAlign: "right" }}>
                        <Link to="/transaksi"> <img src={arrow}></img></Link>
                    </div>


                </div> */}

            </div>

        </div>
    )
}

export default GetBalance;