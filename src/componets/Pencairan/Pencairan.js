import React, { useState, useEffect } from "react";
import styles from './Pencairan.module.css'
import { Link, useHistory } from "react-router-dom";
import silang from '../../img/ion.svg'
import bca from '../../img/BCA.svg'
import validation from './validation'
import axios from 'axios';
import jwt from "jwt-decode"
import CurrencyFormat from "react-currency-format";
import Popup from "../PopupSuksesBuatTagihan/PopupSuksesTagihan"
import animation from "../../img/animation3.svg"
import Loading from "../Loading/Loading";

const Pencairan = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [buttonPopup, setButtonPopup] = useState(false);
    const [loadingPopup, setButtonLoading] = useState(false);
    const [errors, setErros] = useState({});
    const history = useHistory();

    const [data, setValues] = useState({
        name: "",
        nominal: "",
        accNumber: "",
        bank: "",
        code: ""
    });

    const handleChange = (e) => {

        setValues({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    };

    const onRadioButtonChanged = (e) => {
        const bankname = e.target.value.split(";")[0]
        const code = e.target.value.split(";")[1]
        setValues({
            ...data,
            bank: bankname,
            code: code
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        setErros(validation(data));
        setDataIsCorrect(true)
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                const user = jwt(token);
                axios
                    .post("https://paygua.com/api/user/withdraw", {
                        name: data.name,
                        nominal: data.nominal.replace(".", ""),
                        accNumber: data.accNumber,
                        bank: data.bank,
                        code: data.code
                    }, {
                        headers: {
                            'Authorization': token,
                        }
                    })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                // history.push('/successPencairan')
                                setButtonPopup(true);
                                setTimeout(() => {
                                    setButtonPopup(false)
                                }, 3000)
                                setButtonLoading(false)
                            } else {
                                history.push('/login')
                                setButtonLoading(false)
                            }
                        }
                        console.log(result.data);
                        console.log(token)
                    })
                    .catch((e) => {
                    });
                // submitForm()
            }


        }
    }
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div className={styles.gbrarow}>
                    <Link to="/transaksi"><img className={styles.silang} src={silang} alt="logo" /></Link>
                    <p className={styles.kun}>Ajukan Pencairan</p>
                </div>
                {/* <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingNama"
                    placeholder="Nominal"
                    name="nominal"
                    value={data.nominal}
                    onChange={handleChange}
                ></input> */}
                <CurrencyFormat className={styles["form-control-nominal"]} name="nominal"
                    placeholder="Nominal"
                    value={data.nominal}
                    onChange={handleChange} thousandSeparator={'.'} decimalSeparator={','}></CurrencyFormat>
                <div className={styles["set"]}>{errors.nominal && <p className="error">{errors.nominal}</p>}</div>
                <input
                    type="text"
                    class={styles["form-control-nama"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                ></input>
                <div className={styles["set"]}>{errors.name && <p className="error">{errors.name}</p>}</div>
                <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingNama"
                    placeholder="Nomor Rekening"
                    name="accNumber"
                    value={data.accNumber}
                    onChange={handleChange}
                ></input>
                <div className={styles["set"]}>{errors.accNumber && <p className="error">{errors.accNumber}</p>}</div>
                <div className={styles.choose}>
                    <p>Pilihan Bank </p>
                    <br></br>
                    <div>
                        <img src={bca} alt="logo" />
                        <input style={{ float: "right" }} type="radio" name="bank" id="BCA" value="BANK BCA;014" onChange={onRadioButtonChanged}></input>
                    </div>

                </div>
                <div className={styles["set"]}>{errors.bank && <p className="error">{errors.bank}</p>}</div>
                <br></br>
                <br></br>
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2} >Ajukan</p>
                </div>
            </div>
            <Popup
                trigger={buttonPopup}>

                <img style={{ marginLeft: "310px", cursor: "pointer" }} onClick={() => { setButtonPopup(false) }} src={silang}></img>
                <div style={{ textAlign: "center", justifyContent: "center" }}>
                    <img src={animation}></img>
                    <br></br>
                    <p style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>Pencairan telah diajukan dan akan diproses dalam 2x24jam</p>
                </div>
            </Popup>
            <Loading trigger={loadingPopup}></Loading>
        </div>
    )
}

export default Pencairan