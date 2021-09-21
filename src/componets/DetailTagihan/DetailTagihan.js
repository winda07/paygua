import React, { useState, useEffect } from "react"
import styles from "./DetailTagihan.module.css"
import silang from "../../img/ion.webp"
import trash from "../../img/trash.svg"
import jwt from "jwt-decode";
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from "axios"
import Popup from "../PopupSuksesUbah/PopupSuksesUbah";
import CurrencyFormat from "react-currency-format";
import validation from "../BuatTagihan/validation";

const DetailTagihan = () => {

    const history = useHistory();
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const location = useLocation();
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErros] = useState({});
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
            invoiceId: location.state.invoiceId,
            isExpired: location.state.isExpired
        })
        console.log(location)
    }, [])
    useEffect(() => {
        console.log("isClicked: ", isClicked)
        setErros(validation(data));
        setDataIsCorrect(false);
        setIsClicked(false);
    }, [])

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErros(validation(data));
        setDataIsCorrect(true);
        setIsClicked(true);
        const token = localStorage.getItem("token");
        if (dataIsCorrect) {
            if (token) {
                axios
                    .put(
                        "https://paygua.com/api/invoice/" + data.invoiceId, {
                        name: data.nama,
                        email: data.email,
                        nominal: data.nominal.replace(".", ""),
                        message: data.message
                    },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    )
                    // console.log("nominal", data.nominal)
                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {

                                setButtonPopup(true);
                                setTimeout(() => {
                                    setButtonPopup(false)
                                }, 5000)
                            } else {
                                history.push('/login')
                            }
                            console.log("nominal: " + result.data.nominal)
                        }

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
                        if (result.data.status === 200) {
                            history.push('/tagihan')
                        } else {
                            history.push('/login')
                        }
                    }
                    // console.log(result);

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
                <div className={styles["set"]}>{(errors.nominal && isClicked) && <p className="error">{errors.nominal}</p>}</div>
                <textarea
                    type="text"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="message"
                    placeholder="Pesan"
                    value={data.message}
                    onChange={handleChange}
                ></textarea>
                <div className={styles.a}>
                    <p>{location.state.isExpired === false ? <div className={styles.div1}>
                        <img className={styles.sampah} src={trash} onClick={handlesampah} />
                        <p className={styles.change} onClick={handleFormSubmit}>Ubah</p>
                    </div>
                        : <img className={styles.sampah2} src={trash} onClick={handlesampah} />}</p>


                </div>
                {/* <br></br>
                <p className={styles.nama}>Nama Penerima</p>
                <br></br>
                <p style={{ marginLeft: "80px" }}>{data.nama}</p>
                <hr></hr> */}
            </div>
            <Popup
                trigger={buttonPopup}></Popup>
        </div>

    )
}

export default DetailTagihan