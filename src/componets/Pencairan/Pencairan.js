import React, { useState, useEffect } from "react";
import styles from './Pencairan.module.css'
import { Link, useHistory, useLocation } from "react-router-dom";
import arrow from "../../img/arrow-left.svg"
import arrowdown from "../../img/arrow-down.svg"
import Loading from "../Loading/Loading"
import axios from "axios"
const Pencairan = () => {
    const location = useLocation()
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        name: "",
        bank: "",
        number: "",
        codeBank: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setButtonLoading(true)
            axios.get("https://paygua.com/api/user/withdraw/bankAcc", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setButtonLoading(false)
                        setValues({
                            ...data,
                            name: result.data.data.name,
                            bank: result.data.data.bank,
                            number: result.data.data.number,
                        })
                        console.log("location:", location)
                    }

                })

        }
    }, []);
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <Link to="/RekeningBank"><img src={arrow}></img></Link>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Pencairan</p>
                <div className={styles.divRekeningName}>
                    <p className={styles.namaRek}>Nama Rekening</p>
                    <p style={{ padding: "0 20px", marginTop: "10px" }}>{data.name}<br></br>{data.bank} {data.number}</p>
                    <Link style={{ textDecoration: "none" }} to="/RekeningBank"><p style={{ fontSize: "16px", fontWeight: "bold", color: "#143AF5", padding: "0 20px", cursor: "pointer" }}>UBAH</p></Link>
                </div>
                <div className={styles.divnominal}>
                    <p style={{ fontSize: "16px", color: "#1238F7", fontWeight: "bold", padding: "0 20px" }}>Rp | </p>
                </div>
                <footer className={styles.footer}>
                    <button className={styles.button}>
                        Cairkan
                    </button>
                    <p style={{ fontSize: '12px', color: "#21242B", display: 'flex', textAlign: "center", justifyContent: "center" }}>Dana yang dicairkan akan diproses kurang lebih 1 x 24 Jam</p>
                </footer>
            </div>
            <Loading
                trigger={loadingPopup}></Loading>
        </div>
    )
}

export default Pencairan