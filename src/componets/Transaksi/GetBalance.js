import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.svg"
import { Link, useHistory } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Transaksi.module.css"


const GetBalance = () => {
    const history = useHistory()
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
                    if (result.data.status === 200) {
                        setValues({
                            ...data,
                            Balance: result.data.data.balance
                        })
                    } else {
                        history.push('/login')
                    }

                })
            console.log(data)
        }
    }, []);
    const cairkan = () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/withdraw/bankAcc", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {

                        history.push("/pencairan")
                    } else if (result.data.status === 404) {

                        history.push("/RekeningBank")
                    }
                    console.log(result)
                })

        }
    }
    return (
        <div>
            <div>
                <div className={styles.gbrarow}>
                    <Link to="/dashboard"><img src={arrow} alt="logo" /></Link>
                </div>
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div style={{ width: "50%" }} >
                        <p className={styles.saldo} >Saldo kamu saat ini</p>
                        <p className={styles.kun}>Rp{data.Balance}</p>
                    </div>
                    <div style={{ width: "10%", marginLeft: "-170px" }}>
                        <button onClick={cairkan} className={styles['cairkan']} >Cairkan</button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default GetBalance;