import React, { useState, useEffect } from "react";
import styles from './BuatTagihan.module.css'
import jwt from "jwt-decode"
import validation from "./validation"
import silang from '../../img/ion.svg'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Modal from "./Modal"
const BuatTagihan = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const [data, setValues] = useState({
        name: "",
        email: "",
        nominal: "",
        pesan: ""
    });

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true)

        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const token = localStorage.getItem('token');
            if (token) {
                const user = jwt(token);
                axios
                    .post("https://paygua.com/api/invoice/create", {
                        name: data.name,
                        email: data.email,
                        nominal: data.nominal,
                        pesan: data.pesan
                    }, {
                        headers: {
                            'Authorization': token,
                        }
                    })
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 400) {
                                alert("failed")
                            } else if (result.data.status === 200) {
                                // history.push('/successTagihan')
                                history.push({
                                    pathname: '/successTagihan',
                                    state: { invoiceId: result.data.data.invoiceId }
                                });
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
                    <Link to="/tagihan"><img className={styles.silang} src={silang} alt="logo" /></Link>
                    <p className={styles.kun}>Buat Tagihan</p>
                </div>
                <input
                    type="text"
                    class={styles["form-control-nama"]}
                    id="floatingInput"
                    name="name"
                    placeholder="Nama"
                    value={data.name}
                    onChange={handleChange}
                ></input>
                {errors.nama && <p className="error">{errors.nama}</p>}
                <input
                    type="email"
                    class={styles["form-control-email"]}
                    id="floatingInput"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                ></input>
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingInput"
                    name="nominal"
                    placeholder="Nominal"
                    value={data.nominal}
                    onChange={handleChange}
                ></input>
                <p className={styles["min"]}>*Mininal Rp10.000</p>
                {errors.nominal && <p className="error">{errors.nominal}</p>}
                <textarea
                    type="email"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="pesan"
                    placeholder="Pesan"
                    value={data.pesan}
                    onChange={handleChange}
                ></textarea>
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2}>Selesai</p>
                </div>

            </div>
        </div>
    )
}

export default BuatTagihan