import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router"
import styles from "../ProfileGeneral2/ProfileGeneral2.module.css"
import logo from "../../img/logo.svg"
import ovo from "../../img/OVO.svg"
import gopay from "../../img/GOPAY.svg"
import dana from "../../img/DANA.svg"
import linkaja from "../../img/LINKAJA.svg"
import shopeepay from "../../img/SHOPEEPAY.svg"
import qris from "../../img/QRIS.svg"
import transfer from "../../img/Bank Transfer.svg"
import durianpay from "../../img/durianpay.svg"
import jwt from "jwt-decode"
import CurrencyFormat from "react-currency-format";
import validation from "./Validation";
import Popup from "../PopupTransaction/PopupTransaction"
import QrCode from "qrcode"
import gopayQR from "../../img/gopayQR.svg"
import ovoQR from "../../img/ovoQR.svg"
import danaQR from "../../img/danaQR.svg"
import linkajaQR from "../../img/linkajaQR.svg"
import shopeeQR from "../../img/shopeeQR.svg"
import bcaQR from "../../img/bcaQR.svg"
import mandiriQR from "../../img/mandiriQR.svg"
import bniQR from "../../img/bniQR.svg"
import briQR from "../../img/briQR.svg"
import jeniusQR from "../../img/jeniusQR.svg"
import cimbQR from "../../img/cimbQR.svg"
import bankmegaQR from "../../img/bankmegaQR.svg"
import permataQR from "../../img/permataQR.svg"
import uobQR from "../../img/uobQR.svg"
import qrisQR from "../../img/qrisQR.svg"
import Loading from "../Loading/Loading";
import PopupGopay from "../PopupGopay/PopupGopay"
import gopayinQr from "../../img/gopayinQR.svg"
import PopupCopy from "../PopupCopy2/PopupCopy2";
import silang from "../../img/ion.svg"
import secure from "../../img/secure.svg"

const PaymentProfile2 = (props) => {
    const masukkanOVO = "Masukkan nomor OVO"
    const masukkanShopeepay = "Masukkan nomor Shopeepay"
    const codeNumber = "+62"
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [loadingPopup, setButtonLoading] = useState(false);
    const [errors, setErros] = useState({});
    const location = useLocation()
    // console.log(errors.nominal)
    const [Message, setMessage] = useState("")
    const [errorPopup, setErrorPopup] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupgopay, setpopupGopay] = useState(false)
    const history = useHistory();
    const [showResults, setShowResults] = useState('');
    const [showtransfer, setShowTransfer] = useState('');
    const [showShopeepay, setShowShopeepay] = useState('');
    const [popupovo, setPopupOvo] = useState(false)
    const [type, setType] = useState(false);
    const username = localStorage.getItem("username")
    const creatQrCode = (text) => {
        console.log(text)
        QrCode.toCanvas(document.getElementById("canvas"), text, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    const createQrGopay = (text) => {
        console.log(text)
        QrCode.toCanvas(document.getElementById("canvasGopay"), text, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    useEffect(() => {
        var numberField = document.getElementById("nominal")
        numberField.addEventListener("keyup", function (evt) {
            var n = parseInt(this.value.replace(/\D/g, ""), 10);
            numberField.value = n.toLocaleString('de-DE');
            console.log(n)
        }, false);
    })
    useEffect(() => {
        const valueNominal = document.getElementById("nominal").value;
        const token = localStorage.getItem('token');
        let paymentMethod = window.innerWidth <= 600 ? data.bank : "qris";
        paymentMethod = data.bank === "bank" ? "bank" : paymentMethod;
        paymentMethod = paymentMethod === "gopay" ? "qris" : paymentMethod;

        const dataSend = {
            name: data.nama,
            nominal: valueNominal.replace(/\./g, ""),
            // nominal: data.nominal.replace(/\./g, ''),
            email: data.email,
            payment: paymentMethod,
            username: username,
            number: "0" + data.nomor
        }
        console.log("dataSend: ", dataSend)
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            setButtonLoading(true)
            axios
                .post("https://paygua.com/api/transaction/create", dataSend)
                .then((result) => {
                    console.log("result", result);
                    if (result) {
                        if (result.data.status == 200) {
                            if (data.bank === "gopay") {
                                setButtonLoading(false)
                                setpopupGopay(true)
                                createQrGopay(result.data.data.url)
                            } else if (data.bank === "qris") {
                                setButtonPopup(true)
                                setButtonLoading(false)
                                creatQrCode(result.data.data.url)
                            } else if (data.bank === "bank") {
                                setButtonLoading(false)
                                window.open(`${result.data.data.url}`, `_self`)
                            } else if (data.bank === "ovo") {
                                if (window.innerWidth > 600) {
                                    setButtonPopup(true)
                                    setButtonLoading(false)
                                    creatQrCode(result.data.data.url)
                                } else {
                                    setPopupOvo(true)
                                    setTimeout(() => {
                                        setPopupOvo(false);
                                    }, 3000);
                                    setButtonLoading(false)
                                }
                            } else if (data.bank === "shopeepay") {
                                if (window.innerWidth > 600) {
                                    setButtonPopup(true)
                                    setButtonLoading(false)
                                    creatQrCode(result.data.data.url)
                                } else {
                                    setButtonLoading(false)
                                    window.open(`${result.data.data.url}`, `_self`)
                                }
                            } else if (data.bank === "dana") {
                                if (window.innerWidth > 600) {
                                    setButtonPopup(true)
                                    setButtonLoading(false)
                                    creatQrCode(result.data.data.url)
                                } else {
                                    setButtonLoading(false)
                                    window.open(`${result.data.data.url}`, `_self`)
                                }
                            } else if (data.bank === "linkaja") {
                                if (window.innerWidth > 600) {
                                    setButtonPopup(true)
                                    setButtonLoading(false)
                                    creatQrCode(result.data.data.url)
                                } else {
                                    setButtonLoading(false)
                                    window.open(`${result.data.data.url}`, `_self`)
                                }
                            }
                            console.log(result.data)
                        } else {

                        }
                        console.log("if result", result)
                    }

                    console.log("result:", result.data);
                    console.log(token)
                })
                .catch((e) => {
                    console.log(e);
                    alert("Error")
                })
        };
    }, [errors, dataIsCorrect])
    const handleFormSubmit = (e) => {
        console.log(window.innerWidth)
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
    }
    const handleChange = (e) => {
        var value = e.target.value;
        if (e.target.name === "nomor") {
            setValues({
                ...data,
                [e.target.name]: e.target.value.replace(/^[0]+/g, "")
            });
        } else if (e.target.name === "nominal") {
            value = value.length < 2 && value.toString().substring(0, 1) == 0 ? '0' : value;
            value = value == 0 || value == '0' ? 0 : value;
            console.log("6", value)
            setValues({
                ...data,
                [e.target.name]: value
            })
        }
        else {
            setValues({
                ...data,
                [e.target.name]: e.target.value
            });
        }


    };

    const generateBioLines = (text) => {
        var textLength = text.length;
        var lines = textLength / 27;
        var firstSpace = text.indexOf(' ');
        if ((firstSpace < 27 || lines == 1) && firstSpace > 0) {
            return [text]
        }
        var textLines = [];
        for (var i = 0; i < lines; i++) {
            var currLine = text.substring(i * 27, (i * 27) + 27);
            textLines = [
                ...textLines,
                currLine
            ];
        };
        return textLines;
    }

    const [data, setValues] = useState({
        bio: [],
        nama: "",
        email: "",
        nominal: "",
        pesan: "",
        bank: "",
        nomor: "",
        username: "",
        profilePicture: "",
        biayaBank: 5000,
        total: 0,
    })
    let paramobj = useParams();
    console.log(paramobj)

    const setBank = (bank) => {
        if (bank === "ovo") {
            setShowResults(true)
        } else {
            setShowResults(false)
        }

        if (bank === "shopeepay") {
            setShowShopeepay(true)
        } else {
            setShowShopeepay(false)
        }

        if (bank === "bank") {
            setShowTransfer(true)
        } else {
            setShowTransfer(false)
        }
        setValues({
            ...data,
            bank: bank,

        })
    }

    useEffect(() => {
        axios.get("https://paygua.com/api/transaction/" + location.state.username + "/" + location.state.invoiceId, null, {
        })
            .then((result) => {
                if (result.data.status === 200) {

                    setValues({
                        ...data,
                        bio: generateBioLines(result.data.data.bio),
                        name: result.data.data.name,
                        nama: result.data.data.invoice.name,
                        email: result.data.data.invoice.email,
                        nominal: result.data.data.invoice.nominal,
                        pesan: result.data.data.invoice.message,
                        profilePicture: result.data.data.profilePicture,
                        username: data.username
                    })

                } else if (result.data.status === 400) {
                    history.push("/404error")
                }

                console.log("data:", result.data);
            })
            .catch((e) => {
            });
    }, [])
    console.log(data);
    return (
        <>
            {

                data.bio === [] ?
                    null :

                    <div className={styles.App} onClick={() => { setpopupGopay(false) }}>
                        <div className={styles["form-signin"]} onClick={() => { setButtonPopup(false) }}>
                            <div>
                                <h1 className={styles.maudy}>Bayar ke {data.name}</h1>
                                <br></br>
                                <div className={styles.boxdua}>
                                    <img className={styles.boxdalam} src={data.profilePicture}></img>
                                    <b className={styles.usernameCard}>@{username}</b>
                                    <div className={styles.bioContainer}>
                                        {
                                            data.bio.map((text, i) => {
                                                console.log(text)
                                                if (data.bio.length === 1) {
                                                    return (
                                                        <div style={{ marginLeft: 0 }}>
                                                            <p className={styles.info} key={i}>{text}</p>
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div style={{ marginLeft: 0 }}>
                                                        <text className={styles.info} key={i}>{text}</text>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    class={styles["nama"]}
                                    name="nama"
                                    placeholder="Masukkan Nama Anda"
                                    value={data.nama}
                                    onChange={handleChange}
                                    disabled
                                ></input>
                                <div className={styles["set"]}>{errors.nama && <p className="error">{errors.nama}</p>}</div>
                                <input
                                    type="email"
                                    class={styles["email"]}
                                    name="email"
                                    placeholder="Masukkan Email Anda"
                                    value={data.email}
                                    onChange={handleChange}
                                    disabled
                                ></input>
                                <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>
                                <input type="text"
                                    pattern="\d*" inputMode="numeric"
                                    class={styles["nominal"]}
                                    name="nominal"
                                    placeholder="Masukkan Nominal"
                                    onBlur={handleChange}
                                    id="nominal"
                                    disabled
                                    value={data.nominal}
                                    onChange={handleChange}
                                >
                                </input>
                                {/* <CurrencyFormat className={styles["nominal"]} name="nominal" id="price"
                                    value={data.nominal}
                                    placeholder="Masukkan Nominal"
                                    disabled={type === "type2"}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        setValues({
                                            ...data,
                                            ["nominal"]: formattedValue
                                        });
                                    }} thousandSeparator={'.'} decimalSeparator={','}></CurrencyFormat> */}

                                <div className={styles["set"]}>{errors.nominal && <p className="error">{errors.nominal}</p>}</div>

                                <input
                                    type="text"
                                    class={styles["pesan"]}
                                    name="pesan"
                                    placeholder="Pesan (Contoh: Pembayaran Produk Digital)"
                                    value={data.pesan}
                                    onChange={handleChange}
                                    disabled
                                ></input>


                            </div>

                            <section className="section">
                                <img name="bank" value={data.bank === "ovo"} className={data.bank === "ovo" ? styles.borderchoose : styles.logoovo} src={ovo} onClick={() => setBank("ovo")} ></img>
                                <img name="bank" value={data.bank === "gopay"} className={data.bank === "gopay" ? styles.borderchoosegopay : styles.logogopay} src={gopay} onClick={() => setBank("gopay")} ></img>
                                <img name="bank" value={data.bank === "dana"} className={data.bank === "dana" ? styles.borderchoosedana : styles.logodana} src={dana} onClick={() => setBank("dana")}></img>
                                <img name="bank" value={data.bank === "linkaja"} className={data.bank === "linkaja" ? styles.borderchooselinkaja : styles.logolinkaja} style={{ marginLeft: "7px" }} src={linkaja} onClick={() => setBank("linkaja")}></img><br></br>
                                <img name="bank" value={data.bank === "shopeepay"} className={data.bank === "shopeepay" ? styles.borderchooseshopeepay : styles.logoshopeepay} src={shopeepay} onClick={() => setBank("shopeepay")}></img>
                                <img name="bank" value={data.bank === "qris"} className={data.bank === "qris" ? styles.borderchooseqris : styles.logoqris} src={qris} onClick={() => setBank("qris")} ></img>
                                <img name="bank" value={data.bank === "bank"} className={data.bank === "bank" ? styles.borderchoosetransfer : styles.logotransfer} src={transfer} onClick={() => setBank("bank")} ></img>
                            </section>
                            <div className={styles["set"]}>{errors.bank && <p className="error">{errors.bank}</p>}</div>
                            {
                                showResults ? <div> <div class={styles["inputOVO"]}>
                                    <h5 class={styles["OVOLabel"]}>
                                        {masukkanOVO}
                                        <h5 class={styles["number"]}>
                                            {codeNumber}
                                            <input className={styles["ovo"]} name="nomor" maxLength="12" type="number"
                                                value={data.nomor}
                                                onChange={handleChange}></input>
                                        </h5>
                                    </h5>

                                </div>
                                    <p className={styles.powered}>powered by <img src={durianpay}></img></p>
                                </div>
                                    : null
                            }
                            {
                                showtransfer ? <p className={styles.admin}>*Transfer Bank akan ditambah biaya 5.000</p> : null
                            }
                            <div className={data.bank == "" || data.nama == "" || data.email == "" || data.nominal == "" ? styles.btnSubmit : styles.btnBedaWarna} onClick={handleFormSubmit}>
                                <p className={data.bank == "" || data.nama == "" || data.email == "" || data.nominal == "" ? styles.text2 : styles.text21}  >Bayar</p>
                            </div>
                            <Popup
                                trigger={buttonPopup}>
                                <div>
                                    <canvas className={styles.canvas} id="canvas"></canvas>
                                    <p style={{ fontSize: "12px", color: "#838790", marginLeft: "50px" }}>Silahkan scan QR dengan metode dibawah ini</p>
                                    <section className={styles.gambar}>
                                        <img src={gopayQR}></img>
                                        <img src={ovoQR}></img>
                                        <img src={danaQR}></img>
                                        <img src={linkajaQR}></img>
                                        <img src={shopeeQR}></img>
                                    </section>
                                    <section className={styles.gambar}>
                                        <img src={bcaQR}></img>
                                        <img src={mandiriQR}></img>
                                        <img src={bniQR}></img>
                                        <img src={briQR}></img>
                                        <img src={jeniusQR}></img>
                                    </section>
                                    <section className={styles.gambar}>
                                        <img src={cimbQR}></img>
                                        <img src={bankmegaQR}></img>
                                        <img src={permataQR}></img>
                                        <img src={uobQR}></img>
                                        <img src={qrisQR}></img>
                                    </section>
                                    <br></br>
                                    <button className={styles.buttonQr} onClick={() => { setButtonPopup(false) }}><p style={{ color: "white", fontSize: "18px", marginTop: "10px" }}>Selesai Bayar</p></button>
                                </div>
                            </Popup>
                            <Popup trigger={popupgopay}>
                                <div>
                                    <canvas className={styles.canvas2} id="canvasGopay"></canvas>
                                    <img style={{ width: "151px", height: "71px", marginLeft: "90px" }} src={gopayinQr}></img>
                                    <p style={{ fontSize: "16px", display: "flex", textAlign: "center" }}>Scan melalui aplikasi Gojek atau Screenshot dan upload QR di menu PAY aplikasi Gojek</p>
                                    <button className={styles.buttonQr} onClick={() => { setpopupGopay(false) }}><p style={{ color: "white", fontSize: "18px", marginTop: "10px" }}>Selesai Bayar</p></button>
                                </div>
                            </Popup>
                            <PopupCopy trigger={popupovo}>
                                <div>
                                    <img style={{ display: "flex", marginLeft: "270px", cursor: "pointer" }} src={silang} onClick={() => { setPopupOvo(false) }}></img>
                                    <p style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>silahkan cek notifikasi ovo anda</p>
                                </div>
                            </PopupCopy>
                            <Popup
                                trigger={errorPopup}>
                                <div onClick={() => {
                                    setErrorPopup(false)
                                }}><p style={{ marginLeft: "330px", marginBottom: "10px", cursor: "pointer" }}>X</p>
                                    <div style={{ marginLeft: "100px", marginBottom: "20px" }}>{Message}</div>
                                </div>
                            </Popup>
                            <div className={styles.securestyle}>
                                <img src={secure}></img>
                                <p style={{ fontSize: "12px" }}>Pembayaran 100% aman dan terenkripsi</p>
                            </div>
                            <div>
                                <Link to="/"><img className={styles.logo1} src={logo} alt="logo" /></Link>
                            </div>
                        </div>
                        <Loading trigger={loadingPopup}></Loading>
                    </div>
            }
        </>
    )
}



export default PaymentProfile2