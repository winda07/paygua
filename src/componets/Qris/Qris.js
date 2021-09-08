import React, { useState, useEffect } from 'react'
import styles from "./Qris.module.css"
import arrow from "../../img/arrow-left.svg"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import validation from "./validation"
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
        console.log("nominal:", data.nominal)
    };
    const setPush = () => {

    }
    const numberFormatter = (e) => {
        var value = parseInt(e.target.value.replace(/\D/g, ''), 10);
        value = value.toLocaleString()
    }
    useEffect(() => {
        var numberField = document.getElementById("nominal")
        numberField.addEventListener("keyup", function (evt) {
            var n = parseInt(this.value.replace(/\D/g, ''), 10);
            numberField.value = n.toLocaleString();
            console.log(n)
        }, false);
        // numberField.on("blur", function (evt) {
        //     var n = parseInt(this.value.replace(/\D/g, ''), 10);
        //     numberField.value = n.toLocaleString();
        //     console.log("onblur", n)
        // });
    })
    const handleFormSubmit = (e) => {
        const valueNominal = document.getElementById("nominal").value;
        // const dtaNominal = data.nominal;
        console.log("control values", valueNominal);
        // setErros(validation(data));
        // setDataIsCorrect(true)
        // setIsClicked(true);
        const token = localStorage.getItem("token");
        const user = jwt(token);
        const dataSend = {
            nominal: valueNominal.replace(/\,/g, ''),
            email: user.email,
            payment: data.payment,
            Pesan: data.Pesan,
            username: user.username,
            name: data.name
        }
        console.log(dataSend)
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
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <Link to="/dashboard"><img src={arrow}></img></Link>
                    <b style={{ marginLeft: "130px", fontSize: "20px" }}>Qris</b>
                </div>
                <p style={{ textAlign: "center", color: "#838790", fontSize: "12px", marginTop: "50px" }} >MASUKKAN JUMLAH PEMBAYARAN</p>
                <div style={{ height: "10px" }}>
                    <b style={{ fontSize: "30px", marginLeft: "120px" }}>{Rupiah}</b>
                    <input type="text"
                        pattern="\d*"
                        class={styles["form-control"]}
                        name="nominal"
                        onBlur={handleChange}
                        id="nominal"
                        value={data.nominal}
                        onChange={handleChange}
                    >
                    </input>
                    <input type="text" className={styles.formPesan}
                        name="Pesan"
                        value={data.Pesan}
                        placeholder="Catatan (Contoh: Pembayaran Meja 05)"
                        onChange={handleChange}>
                    </input>
                    <hr style={{ width: "250px", marginLeft: "51px" }}></hr>
                    <button onClick={handleFormSubmit} className={styles.button}>
                        Show Qris
                    </button>
                </div>
                <Loading trigger={loadingPopup}></Loading>
            </div>
        </div>
    )
}

export default Qris