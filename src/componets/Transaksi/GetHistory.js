import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import arrow from "../../img/arrow-left.svg"
import { Link, useHistory } from "react-router-dom";
import { DataUsageSharp } from "@material-ui/icons"
import styles from "./Transaksi.module.css"
import panahbawah from "../../img/panahbawah.svg"
import panahatas from "../../img/panahatas.svg"
import { red } from "@material-ui/core/colors";

const GetHistory = () => {
    const history = useHistory()
    const [data, setValues] = useState({
        transaksi: []
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/history", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            setValues({
                                ...data, transaksi: result.data.data
                            })
                        } else {
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
                        <div style={{ width: "50%", textAlign: "right" }}>
                            <p style={{ color: trx.type != "in" ? "#E81A55" : "#34A898" }}>{trx.type === "in" ? "+" : "-"} Rp{trx.nominal}</p>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}
export default GetHistory;