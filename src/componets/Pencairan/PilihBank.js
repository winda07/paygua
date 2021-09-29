import React, { useState, useEffect } from "react";
import styles from './PilihBank.module.css'
import { Link, useHistory } from "react-router-dom";
import arrow from "../../img/arrow-left.svg"
import axios from "axios"
import Loading from "../Loading/Loading"
const Pencairan = () => {
    const history = useHistory()
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        bank: []
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setButtonLoading(true)
            axios.get("https://paygua.com/api/user/withdraw/bank", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setButtonLoading(false)
                        setValues({

                            bank: result.data.data
                        })
                        // console.log(result.data.data)
                    }

                })

        }
    }, []);
    console.log("data bank:", data.bank.length)
    const sendBank = (bank) => {
        history.push({
            pathname: "/RekeningBank",
            params: {
                bank
            }
        })
        console.log("bank name: ", bank)
    }
    const handleSearchSubmit = (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        const value = document.getElementById("searchbank").value
        axios.get("https://paygua.com/api/user/withdraw/bank/" + value, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        ...data,
                        bank: result.data.data
                    })
                }
                console.log(result)
            })
        console.log("submited", value);
    }
    return (
        <>

            <div className={styles.App}>
                <div className={styles['form-signin']}>
                    <div style={{ position: "fixed", backgroundColor: "white", marginTop: "-15px" }}>
                        <div style={{ display: "flex" }}>
                            <Link to="/RekeningBank"><img src={arrow}></img></Link>
                            <b style={{ fontSize: "16px", marginTop: "2px", marginLeft: "30px" }}>Pilih Bank</b>
                        </div>
                        <form autoComplete="off">
                            <input
                                type="text"
                                class={styles["form-control"]}
                                name="bank"
                                id="searchbank"
                                placeholder="Cari Bank"
                                autocomplete="no"
                            ></input>
                            <button onClick={handleSearchSubmit} hidden id="hiddenSubmit" />
                        </form>
                    </div>
                    <div style={{ marginTop: "120px" }}>
                        {data.bank.map(bnk => (
                            <div>
                                <p style={{ padding: "0 20px", cursor: "pointer", fontWeight: "bold" }} onClick={() => sendBank(bnk)}>{bnk.name}</p>
                            </div>
                        ))}
                    </div>
                    {console.log("bankk:", data.bank.length)}
                </div>
                <Loading
                    trigger={loadingPopup}></Loading>
            </div >
        </>
    )
}

export default Pencairan