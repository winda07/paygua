import React, { useState, useEffect } from 'react'
import styles from "./Qris.module.css"
import arrow from "../../img/arrow-left.svg"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import validation from "./Validation"
import jwt from "jwt-decode"
import Loading from "../Loading/Loading"
const Qris = () => {
    const history = useHistory()
    const [isClicked, setIsClicked] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const [loadingPopup, setButtonLoading] = useState(false);
    const Rupiah = "Rp"
    const [data, setValues] = useState({
        nominal: 0,
        Pesan: "",
        payment: "qris",
        name: "payment with qr",
        total: "",
        url: ""
    });
    const handleChange = (e) => {
        var value = e.target.value;
        if (e.target.name === "nominal") {
            value = value.length < 2 && value.toString().substring(0, 1) == 0 ? '0' : value;
            value = value == 0 || value == '0' ? 0 : value;
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
    };
    useEffect(() => {
        var numberField = document.getElementById("nominal")
        numberField.addEventListener("keyup", function (evt) {
            var n = parseInt(this.value.replace(/\D/g, ""), 10);
            numberField.value = n.toLocaleString('de-DE');
        }, false);
    })
    useEffect(() => {
        setDataIsCorrect(false);
        setIsClicked(false);
    }, [])

    useEffect(() => {
        const valueNominal = document.getElementById("nominal").value;
        const token = localStorage.getItem("token");
        const getJwt = jwt(token)
        const user = localStorage.getItem("username");
        const dataSend = {
            nominal: valueNominal.replace(/\./g, ""),
            email: getJwt.email,
            payment: data.payment,
            Pesan: data.Pesan,
            username: user,
            name: data.name
        }
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            axios.post("https://paygua.com/api/transaction/create", dataSend)
                .then((result) => {
                    if (result) {
                        if (result.data.status === 200) {
                            setButtonLoading(false)
                            const payload = {
                                name: data.name,
                                url: result.data.data.url,
                                nominal: data.nominal
                            }
                            history.push({
                                pathname: "/Qr",
                                state:
                                    payload
                            })
                        }
                    }
                })
        }
    }, [errors, dataIsCorrect])
    const handleFormSubmit = (e) => {
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
    }
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <Link to="/dashboard"><img src={arrow}></img></Link>
                    <b style={{ marginLeft: "110px", fontSize: "20px" }}>My QRIS</b>
                </div>
                <p style={{ textAlign: "center", color: "#838790", fontSize: "12px", marginTop: "50px" }} >MASUKKAN JUMLAH PEMBAYARAN (RP)</p>
                <div style={{ height: "10px" }}>
                    <input type="text"
                        pattern="\d*" inputMode="numeric"
                        class={styles["form-control"]}
                        name="nominal"
                        onBlur={handleChange}
                        id="nominal"
                        value={data.nominal}
                        onChange={handleChange}
                    >
                    </input>
                    <div className={styles["set"]}>{errors.nominal && <p className="error">{errors.nominal}</p>}</div>
                    <input type="text" className={styles.formPesan}
                        name="Pesan"
                        value={data.Pesan}
                        placeholder="Catatan (Contoh: Pembayaran Meja 05)"
                        onChange={handleChange}>
                    </input>
                    <hr style={{ width: "250px", marginLeft: "51px" }}></hr>
                    <button onClick={handleFormSubmit} className={styles.button}>
                        SHOW QRIS
                    </button>
                </div>
                <Loading trigger={loadingPopup}></Loading>
            </div>
        </div>
    )
}

export default Qris