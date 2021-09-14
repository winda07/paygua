import React, { useState, useEffect } from "react";
import styles from "./BuatTagihan.module.css";
import jwt from "jwt-decode";
import validation from "./validation";
import silang from "../../img/ion.svg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Popup from "../PopupSuksesBuatTagihan/PopupSuksesTagihan";
import CurrencyFormat from "react-currency-format";
import logo from "../../img/popup-tagihan.svg"
import copy from "../../img/copyblack.svg"
import PopupCopy from "../PopupCopy2/PopupCopy2";
import animation from "../../img/animation2.webp"
import Loading from "../Loading/Loading";
const BuatTagihan = () => {
    const history = useHistory()
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErros] = useState({});
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttoncopy, setButtonCopy] = useState(false)
    const [loadingPopup, setButtonLoading] = useState(false);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    const [data, setValues] = useState({
        name: "",
        email: "",
        nominal: "",
        message: "",
        invoiceId: ""
    });
    const [data2, setValues2] = useState({
        notif: [],
    })
    const [data3, setValues3] = useState({
        tagihan: []
    })
    const setcopy = () => {
        setButtonCopy(true)
        setTimeout(() => {
            setButtonCopy(false)
        }, 1000)
        navigator.clipboard.writeText(`paygua.com/${user}/${data.invoiceId}`)
    }

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const setRead = (() => {

        const token = localStorage.getItem("token");
        const array = []
        for (let i = 0; i < data2.notif.length; i++) {
            // console.log()
            if (!data2.notif[i].isSeen) {
                array.push(data2.notif[i]._id)
            }
        }
        console.log(array)
        if (token) {
            axios.post("https://paygua.com/api/user/notification", { notifId: array }, {

                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    console.log("set read started")
                })
                .catch(e => {
                    console.log("errror")
                })

        }
    })

    useEffect(() => {
        console.log("isClicked: ", isClicked)
        setErros(validation(data));
        setDataIsCorrect(false);
        setIsClicked(false);
    }, [])

    useEffect(() => {


        console.log("handleFormSubmit Object keys: ", Object.keys(errors).length)
        console.log("handleFormSubmit isDataCorrect: ", dataIsCorrect)

        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            if (token) {

                // console.log(user)
                axios
                    .post(
                        "https://paygua.com/api/invoice/create",
                        {
                            name: data.name,
                            email: data.email,
                            nominal: data.nominal.replace(/\./g, ''),
                            message: data.message,
                        },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    )

                    .then((result) => {
                        if (result) {
                            if (result.data.status === 200) {
                                setButtonPopup(true);
                                setButtonLoading(false)
                                setValues({
                                    ...data,
                                    invoiceId: result.data.data.invoiceId
                                })
                                axios.get("https://paygua.com/api/user/notification", {
                                    headers: {
                                        Authorization: token,
                                    }
                                })
                                    .then((result) => {
                                        if (result.data) {
                                            if (result.data.status === 200) {
                                                setValues2({
                                                    ...data2, notif: result.data.data
                                                })
                                                setRead()
                                            } else {
                                                history.push('/login')
                                            }

                                            console.log(data.nominal)
                                        }
                                    })
                                axios.get("https://paygua.com/api/invoice/getMyInvoice", {
                                    headers: {
                                        Authorization: token,
                                    }
                                })
                                    .then((result) => {
                                        if (result.data) {
                                            if (result.data.status === 200) {
                                                setValues3({
                                                    ...data3, tagihan: result.data.data
                                                })
                                            } else {
                                                history.push('/login')
                                            }

                                        }

                                    })
                                console.log(data.tagihan.length)
                                console.log(data.nominal)

                            } else {
                                history.push('login')
                                setButtonLoading(false)
                            }
                        }
                        console.log(result.data);
                        console.log(token);
                    })
                    .catch((e) => { });
                // submitForm()
            }
        }

    }, [errors, dataIsCorrect]);

    const handleFormSubmit = (e) => {
        setErros(validation(data));
        setDataIsCorrect(true);
        setIsClicked(true);
    };
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.gbrarow}>
                    <Link to="/dashboard">
                        <img className={styles.silang} src={silang} alt="logo" />
                    </Link>
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
                <div className={styles["set"]}>{errors.nama && isClicked && <p className="error">{errors.nama}</p>}</div>
                <input
                    type="email"
                    class={styles["form-control-email"]}
                    id="floatingInput"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                ></input>
                <div className={styles["set"]}>{errors.email && isClicked && <p className="error">{errors.email}</p>}</div>
                <CurrencyFormat className={styles["form-control-nominal"]} name="nominal"
                    placeholder="Nominal"
                    value={data.nominal}
                    onChange={handleChange} thousandSeparator={'.'} decimalSeparator={','}></CurrencyFormat>
                <div className={styles["set"]}>{(errors.nominal && isClicked) && <p className="error">{errors.nominal}</p>}</div>
                <textarea
                    type="email"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="message"
                    placeholder="Pesan"
                    value={data.message}
                    onChange={handleChange}
                ></textarea>
                <button className={styles.addLink}>Add Link</button>
                <button className={styles.AddFiles}>Add Files</button>
                <p className={styles.textbawah}>*File atau link yang diunggah  akan diterima kustomer di email yang dicantumkan setelah membayar</p>

                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2}>Selesai</p>
                </div>
            </div>
            <Popup
                trigger={buttonPopup}>

                <img style={{ marginLeft: "310px", cursor: "pointer" }} onClick={() => { setButtonPopup(false) }} src={silang}></img>
                <div style={{ textAlign: "center", justifyContent: "center" }}>
                    <img src={animation}></img>
                    <br></br>
                    <p >Tagihan Berhasil Dibuat</p>
                    <button className={styles["a"]} onClick={setcopy}>
                        <p className={styles.link}>Paygua.com/{user}/{data.invoiceId} <img src={copy}></img></p>
                    </button>
                    <PopupCopy trigger={buttoncopy}>
                        <p style={{ marginLeft: "40px" }}>Berhasil disalin ke Clipboard!</p>
                    </PopupCopy>
                </div>
            </Popup>
            <Loading trigger={loadingPopup}></Loading>
        </div>
    );
};

export default BuatTagihan;
