import React, { useState, useEffect } from "react";
import styles from './Pencairan.module.css'
import { Link, useHistory, useLocation } from "react-router-dom";
import arrow from "../../img/arrow-left.webp"
import arrowdown from "../../img/arrow-down.webp"
import Loading from "../Loading/Loading"
import axios from "axios"
import validation from "./Validation2";
import Popup from "../PopupPencairan/PopupPencairan"
import animation from "../../img/animation3.webp"
const Pencairan = () => {
    const Rp = "Rp|"
    const [isClicked, setIsClicked] = useState(false);
    const [popup, setPopup] = useState(false)
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const location = useLocation()
    const [loadingPopup, setButtonLoading] = useState(false);
    const [data, setValues] = useState({
        name: "",
        bank: "",
        number: "",
        codeBank: "",
        nominal: ""
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
                            codeBank: result.data.data.bankCode
                        })
                        console.log("location:", location)
                    }

                })

        }
    }, []);
    useEffect(() => {
        var numberField = document.getElementById("nominal")
        numberField.addEventListener("keyup", function (evt) {
            var n = parseInt(this.value.replace(/\D/g, ""), 10);
            numberField.value = n.toLocaleString('de-DE');
            console.log(n)
        }, false);
    })
    const handleChange = (e) => {
        var value = e.target.value;
        if (e.target.name === "nominal") {
            value = value.length < 2 && value.toString().substring(0, 1) == 0 ? '0' : value;
            value = value == 0 || value == '0' ? 0 : value;
            console.log("6", value)
            setValues({
                ...data,
                [e.target.name]: value
            })
        } else {
            setValues({
                ...data,
                [e.target.name]: e.target.value,
            });
        }

    }
    const HandleForSubmit = () => {
        const token = localStorage.getItem("token");
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
        const dataSend = {
            name: data.name,
            accNumber: data.number,
            bank: data.bank,
            code: data.codeBank,
            nominal: data.nominal
        }
        console.log("datasend:", dataSend)
        console.log("handleFormSubmit Object keys: ", Object.keys(errors).length)
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            if (token) {
                console.log(token)
                axios.post("https://paygua.com/api/user/withdraw", dataSend, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                setButtonLoading(false)
                                setPopup(true)
                            }

                        }
                        console.log(result)
                    })
            }
        }
    }
    return (
        <div onClick={() => { setPopup(false) }} className={styles.App}>
            <div className={styles['form-signin']}>
                <Link to="/RekeningBank"><img src={arrow}></img></Link>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Pencairan</p>
                <div className={styles.divRekeningName}>
                    <p className={styles.namaRek}>Nama Rekening</p>
                    <p style={{ padding: "0 20px", marginTop: "10px" }}>{data.name}<br></br>{data.bank} {data.number}</p>
                    <Link style={{ textDecoration: "none" }} to="/RekeningBank"><p style={{ fontSize: "16px", fontWeight: "bold", color: "#143AF5", padding: "0 20px", cursor: "pointer" }}>UBAH</p></Link>
                </div>
                <div class={styles["inputContainer"]}>
                    <h5 class={styles["usernameLabel"]}>
                        {Rp}
                    </h5>
                    <input type="text"
                        pattern="\d*" inputMode="numeric"
                        class={styles["username"]}
                        name="nominal"
                        placeholder="Masukkan Nominal"
                        onBlur={handleChange}
                        id="nominal"
                        value={data.nominal}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className={styles["set"]}>{errors.nominal && <p className="error">{errors.nominal}</p>}</div>
                <footer className={styles.footer}>
                    <button onClick={HandleForSubmit} className={styles.button}>
                        Cairkan
                    </button>
                    <p style={{ fontSize: '12px', color: "#21242B", display: 'flex', textAlign: "center", justifyContent: "center" }}>Dana yang dicairkan akan diproses kurang lebih 2 x 24 Jam</p>
                </footer>
            </div>
            <Loading
                trigger={loadingPopup}></Loading>
            <Popup trigger={popup}>
                <div>
                    <img className={styles.popupimg} src={animation}></img>
                    <p className={styles.popuptext}>Pencairan telah diajukan dan akan diproses maks dalam 2x24jam</p>
                    <Link to="/dashboard"><button className={styles.popupbutton}>Kembali ke dashboard</button></Link>
                </div></Popup>
        </div>
    )
}

export default Pencairan