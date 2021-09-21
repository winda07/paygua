import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.webp"
import { Link, useHistory } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Transaksi.module.css"
import panahbawah from "../../img/panahbawah.webp"
import panahatas from "../../img/panahatas.webp"
import { red } from "@material-ui/core/colors";
import Loading from "../Loading/Loading"
const GetHistory = () => {
    const [loadingPopup, setButtonLoading] = useState(false);
    const history = useHistory()
    const [data, setValues] = useState({
        transaksi: []
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setButtonLoading(true)
            axios.get("https://paygua.com/api/user/history", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            setButtonLoading(false)
                            setValues({
                                ...data, transaksi: result.data.data
                            })
                        } else {
                            setButtonLoading(false)
                            history.push('/login')
                        }
                    }
                    console.log(result)

                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            {
                data.transaksi.map(trx => (
                    <div className={styles.boxdua} style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <div style={{ width: "50%" }}>
                            <p>{trx.type === "in" ? <img src={panahbawah}></img> : <img src={panahatas}></img>}{trx.title}</p>
                            {/* <p><img src={panahbawah} ></img>{trx.title}</p> */}
                            <dt className={styles.tanggal}>{new Date(trx.date).toLocaleDateString()}</dt>
                        </div>
                        <div className={styles.total} style={{ width: "50%", textAlign: "right" }}>
                            <p style={{ color: trx.type != "in" ? "#E81A55" : "#34A898" }}>{trx.type === "in" ? "+" : "-"} Rp{trx.nominal}</p>
                        </div>
                    </div>
                ))
            }

            <Loading trigger={loadingPopup}></Loading>
        </div>
    )
}
export default GetHistory;