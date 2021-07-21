import React, { useState, useEffect } from "react";
import styles from './Pencairan.module.css'
import { Link, useHistory } from "react-router-dom";
import silang from '../../img/ion.svg'
import bca from '../../img/BCA.svg'
import validation from './validation'
import axios from 'axios';
import jwt from "jwt-decode"

const Pencairan = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
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
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                const user = jwt(token);
                axios
                    .post("https://paygua.com/api/user/withdraw", {
                        name: data.name,
                        nominal: data.nominal,
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
                            if (result.data.status === 400) {
                                alert("saldo tidak cukup")
                            } else if (result.data.status === 200) {
                                history.push('/successPencairan')
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
                <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingNama"
                    placeholder="Nominal"
                    name="nominal"
                    value={data.nominal}
                    onChange={handleChange}
                ></input>
                {errors.nominal && <p className="error">{errors.nominal}</p>}
                <input
                    type="text"
                    class={styles["form-control-nama"]}
                    id="floatingNama"
                    placeholder="Nama"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                ></input>
                {errors.name && <p className="error">{errors.name}</p>}
                <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingNama"
                    placeholder="Nomor Rekening"
                    name="accNumber"
                    value={data.accNumber}
                    onChange={handleChange}
                ></input>
                {errors.accNumber && <p className="error">{errors.accNumber}</p>}

                <div className={styles.choose}>
                    <p>Pilihan Bank </p>
                    <br></br>
                    <div>
                        <img src={bca} alt="logo" />
                        <input style={{ float: "right" }} type="radio" name="bank" id="BCA" value="BANK BCA;014" onChange={onRadioButtonChanged}></input>
                    </div>

                </div>
                {errors.bank && <p className="error">{errors.bank}</p>}
                <br></br>
                <br></br>
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2} >Ajukan</p>
                </div>
            </div>
        </div>
    )
}

export default Pencairan