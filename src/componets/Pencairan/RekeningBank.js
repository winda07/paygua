import React, { useState, useEffect } from "react";
import styles from './RekeningBank.module.css'
import { Link, useLocation, useHistory } from "react-router-dom";
import arrow from "../../img/arrow-left.webp"
import arrowdown from "../../img/arrow-down.webp"
import axios from 'axios';
import validation from "./Validation";
import Loading from "../Loading/Loading";
import Popup from "./Popup"
import silang from "../../img/ion.webp"
import PopupLimit from "./PopupLimit"
const RekeningBank = () => {
    const [errors, setErros] = useState({});
    const history = useHistory();
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [loadingPopup, setButtonLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupLimit, setPopupLimit] = useState(false);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token")
    const [data, setValues] = useState({
        username: username,
        norek: "",
        bank: "",
        codeBank: "",
        name: ""
    })
    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const checkBank = (e) => {
        setErros(validation(data));
        setIsClicked(true);
        const dataSend = {
            name: username,
            accNum: data.norek,
            bank: data.bank,
            bankCode: data.codeBank
        }
        console.log("datasend:", dataSend)
        console.log("handleFormSubmit Object keys: ", Object.keys(errors).length)
        console.log("data iscorr", dataIsCorrect)
        if (data.bank !== "") {
            setPopupLimit(false)
            setPopup(false)
            setButtonLoading(true)
            if (token) {
                console.log(token)
                // setValues({
                //     ...data,
                //     name: "winda hardcoded"
                // })
                // setDataIsCorrect(true);
                axios.post("https://paygua.com/api/user/withdraw/checkBank", dataSend, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                setDataIsCorrect(true)
                                setPopupLimit(false)
                                setPopup(false)
                                setButtonLoading(false)
                                if (result.data.errors) {
                                    setPopupLimit(true);
                                    setTimeout(() => {
                                        setPopupLimit(false)
                                    }, 1000)
                                } else {
                                    setValues({
                                        ...data,
                                        name: result.data.data.name
                                    })
                                }
                            } else if (result.data.status === 404) {
                                setPopupLimit(false)
                                setButtonLoading(false)
                                setPopup(true)
                                setTimeout(() => {
                                    setPopup(false)
                                }, 1000)
                            }
                        }
                        console.log("data:", result.data)
                    })
            }
        }

    }
    const location = useLocation()
    useEffect(() => {
        if (location.params) {
            setValues({
                bank: location.params.bank.name,
                codeBank: location.params.bank.code,
            })
        }
        console.log("location:", location)
        console.log("is correct", dataIsCorrect)
    }, []);
    // useEffect(() => {
    //     setValues({
    //         bank: "",
    //         codeBank: "",
    //         name: "",
    //         norek: ""
    //     });
    // }, [])
    useEffect(() => {
        console.log("isClicked: ", isClicked)
        setErros(validation(data));
        setDataIsCorrect(false);
        setIsClicked(false);
    }, [])
    const handleForSubmit = (e) => {
        setErros(validation(data));
        // setDataIsCorrect(true)
        // setIsClicked(true);
        console.log("data valueeeeeeeeeee", data);
        const dataSend = {
            name: data.name,
            number: data.norek,
            bank: data.bank,
            bankCode: data.codeBank
        }
        console.log("datasend:", dataSend)

        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            if (token) {
                console.log(token)
                console.log("payload", dataSend);
                axios.post("https://paygua.com/api/user/withdraw/saveBank", dataSend, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                setButtonLoading(false)
                                history.push("/pencairan")
                            }

                        }
                        console.log(result)
                    })
            }
        }
    }

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <Link to="/transaksi"><img src={arrow}></img></Link>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Rekening Bank</p>
                <Link style={{ textDecoration: "none" }} to="/PilihBank"> <div class={styles["inputContainer"]}>
                    <input
                        type="text"
                        class={styles["form-control"]}
                        name="bank"
                        placeholder="Pilih Bank"
                        value={data.bank}
                        onChange={handleChange}
                    ></input>
                    <img class={styles["usernameLabel"]} src={arrowdown}></img>
                </div></Link>
                <div className={styles["set"]}>{errors.bank && isClicked && <p className="error">{errors.bank}</p>}</div>
                <div class={styles["inputContainerRek"]}>
                    <input type="text"
                        pattern="\d*" inputMode="numeric"
                        class={styles["form-control-2"]}
                        name="norek"
                        placeholder="Masukkan Nomor Rekening"
                        value={data.norek}
                        onChange={handleChange}
                    >
                    </input>
                    <div onClick={checkBank} class={styles["usernameLabelPeriksa"]}>PERIKSA</div>
                </div>
                <div className={styles["set"]}>{errors.norek && isClicked && <p className="error">{errors.norek}</p>}</div>
                <div className={styles.divRekeningName}>
                    <p className={styles.namaRek}>Nama Rekening</p>
                    <p style={{ padding: "0 20px" }}>{data.name}</p>
                </div>
                <footer className={styles.footer}>
                    <button onClick={handleForSubmit} className={!dataIsCorrect ? styles.btnSubmit : styles.button} disabled={!dataIsCorrect}>
                        Lanjutkan
                    </button>
                    <p style={{ fontSize: '12px', color: "#21242B", display: 'flex', textAlign: "center", justifyContent: "center" }}>Dana yang dicairkan akan diproses kurang lebih 2 x 24 Jam</p>
                </footer>
            </div>
            <Loading trigger={loadingPopup}></Loading>
            <Popup trigger={popup}>
                <div>
                    <img onClick={() => { setPopup(false) }} style={{ marginLeft: "270px", cursor: "pointer" }} src={silang}></img>
                    <p style={{ textAlign: "center" }}>Failed to check your bank account</p>
                </div>
            </Popup>
            <PopupLimit trigger={popupLimit}>
                <div>
                    <img onClick={() => { setPopupLimit(false) }} style={{ marginLeft: "270px", cursor: "pointer" }} src={silang}></img>
                    <p style={{ textAlign: "center" }}>You reach your limit</p>
                </div>
            </PopupLimit>

        </div>
    )
}

export default RekeningBank