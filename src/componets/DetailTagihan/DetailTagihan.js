import React, { useState, useEffect } from "react"
import styles from "./DetailTagihan.module.css"
import silang from "../../img/ion.svg"
import trash from "../../img/trash.svg"
import jwt from "jwt-decode";
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from "axios"
import Popup from "../PopupSuksesUbah/PopupSuksesUbah";
import CurrencyFormat from "react-currency-format";

const DetailTagihan = () => {

    const history = useHistory();
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const location = useLocation();
    const [buttonPopup, setButtonPopup] = useState(false);
    const [data, setValues] = useState({
        nama: "",
        email: "",
        nominal: "",
        message: "",
        invoiceId: ""
    })

    useEffect(() => {
        setValues({
            ...data,
            nama: location.state.nama,
            email: location.state.email,
            nominal: location.state.nominal,
            message: location.state.message,
            invoiceId: location.state.invoiceId
        })
    }, [])


    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDataIsCorrect(true);
        // console.log(data.invoiceId)
        // console.log(token)
        const token = localStorage.getItem("token");
        if (dataIsCorrect) {
            if (token) {
                axios
                    .put(
                        "https://paygua.com/api/invoice/" + data.invoiceId, {
                        name: data.nama,
                        email: data.email,
                        nominal: data.nominal,
                        message: data.message
                    },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    )
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 400) {
                                alert("failed");
                            } else if (result.data.status === 200) {
                                setButtonPopup(true);
                                setTimeout(() => {
                                    setButtonPopup(false)
                                }, 5000)
                            }
                        }
                        console.log("nominal: " + data.nominal)
                        // console.log(result);
                        // console.log(token);
                    })
                    .catch((e) => { });
            }

        }

    };

    const handlesampah = (e) => {
        const token = localStorage.getItem("token");
        // console.log(token)
        if (token) {
            axios
                .delete(
                    "https://paygua.com/api/invoice/" + data.invoiceId,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((result) => {
                    if (result) {
                        if (result.data.status === 400) {
                            alert("failed");
                        } else if (result.data.status === 200) {
                            history.push('/tagihan')
                        }
                    }
                    console.log(result);

                })
                .catch((e) => {
                });
        }
    }

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div className={styles.gbrarow}>
                    <Link to="/tagihan"><img className={styles.silang} src={silang} alt="logo" /></Link>
                    <p className={styles.kun}>Tagihan {location.state.invoiceId}</p>
                </div>

                <input
                    type="text"
                    class={styles["form-control-nama"]}
                    id="floatingInput"
                    name="nama"
                    placeholder="Nama"
                    value={data.nama}
                    onChange={handleChange}
                ></input>
                <input
                    type="email"
                    class={styles["form-control-email"]}
                    id="floatingInput"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                ></input>
                {/* <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingInput"
                    name="nominal"
                    placeholder="Nominal"
                    value={data.nominal}
                    onChange={handleChange}
                ></input> */}
                <CurrencyFormat className={styles["form-control-nominal"]} name="nominal"
                    placeholder="Nominal"
                    value={data.nominal}
                    onChange={handleChange} thousandSeparator={'.'} decimalSeparator={','}></CurrencyFormat>
                <p className={styles["min"]}>*Mininal Rp10.000</p>
                <textarea
                    type="email"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="pesan"
                    placeholder="Pesan"
                    value={data.message}
                    onChange={handleChange}
                ></textarea>
                <div className={styles.a}>
                    <img src={trash} alt="logo" onClick={handlesampah} />
                    <p className={styles.change} onClick={handleFormSubmit}>Ubah</p>
                </div>
                <br></br>
                <p className={styles.nama}>Nama Penerima</p>
                <br></br>
                <p style={{ marginLeft: "80px" }}>{data.nama}</p>
                <hr></hr>
            </div>
            <Popup
                trigger={buttonPopup}></Popup>
        </div>

    )
}

export default DetailTagihan