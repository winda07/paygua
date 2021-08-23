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

const BuatTagihan = () => {
    const history = useHistory()
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErros] = useState({});
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttoncopy, setButtonCopy] = useState(false)
    const token = localStorage.getItem("token");
    const user = jwt(token);
    const [data, setValues] = useState({
        name: "",
        email: "",
        nominal: "",
        message: "",
        invoiceId: ""
    });
    const setcopy = () => {
        setButtonCopy(true)
        setTimeout(() => {
            setButtonCopy(false)
        }, 1000)
        navigator.clipboard.writeText(`paygua.com/${user.username}/${data.invoiceId}`)
    }

    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

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

            if (token) {

                // console.log(user)
                axios
                    .post(
                        "https://paygua.com/api/invoice/create",
                        {
                            name: data.name,
                            email: data.email,
                            nominal: data.nominal.replace(".", ""),
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
                                setValues({
                                    ...data,
                                    invoiceId: result.data.data.invoiceId
                                })
                                // setButtonPopup(false)
                            } else {
                                history.push('login')
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
                    type="email"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="message"
                    placeholder="Pesan"
                    value={data.message}
                    onChange={handleChange}
                ></textarea>

                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2}>Selesai</p>
                </div>
            </div>
            <Popup
                trigger={buttonPopup}>
                <div>
                    <img style={{ marginLeft: "310px", cursor: "pointer" }} onClick={() => { setButtonPopup(false) }} src={silang}></img>
                    <img className={styles.popup} src={logo}></img>
                    <p className={styles.text}>Tagihan Berhasil Dibuat</p>
                    <button className={styles["a"]} onClick={setcopy}>
                        <div>
                            <p className={styles.link}>Paygua.com/{user.username}/{data.invoiceId} <img src={copy}></img></p>
                        </div>
                    </button>
                    <PopupCopy trigger={buttoncopy}>
                        <p style={{ marginLeft: "40px" }}>Berhasil disalin ke Clipboard!</p>
                    </PopupCopy>
                </div>
            </Popup>
        </div>
    );
};

export default BuatTagihan;
