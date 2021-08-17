import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
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
// import Popup from "../PopupSuksesPembayaran/PopupSukses"
import jwt from "jwt-decode"
import CurrencyFormat from "react-currency-format";
import validation from "./Validation";
import Popup from "../PopupTransaction/PopupTransaction"
import QrCode from "qrcode"


const DummyCmp = (props) => {
    const masukkanOVO = "Masukkan nomor OVO"
    const codeNumber = "+62"
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    // const [buttonPopup, setButtonPopup] = useState(false);
    const [errors, setErros] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const history = useHistory();
    const [showResults, setShowResults] = useState('');
    const [showtransfer, setShowTransfer] = useState('')
    const [show, setShow] = useState('');
    const [barcode, setBarcode] = useState("https://reactjs.org");
    const [qrImage, setQrImage] = useState('');
    const creatQrCode = (text) => {
        console.log(text)
        QrCode.toCanvas(document.getElementById("canvas"), text, function (err) {
            if (err) {
                console.log(err)
            }
        })
        // QrCode.toDataURL(text).then(url => {
        //     console.log(url)
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    const handleFormSubmit = (e) => {
        console.log(window.innerWidth)
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
        const token = localStorage.getItem('token');
        let paymentMethod = window.innerWidth <= 600 ? data.bank : "qris";
        paymentMethod = data.bank === "bank" ? "bank" : paymentMethod;
        // if (token) {
        const dataSend = {
            name: data.nama,
            nominal: data.nominal.replace(".", ""),
            email: data.email,
            payment: paymentMethod,
            username: paramobj.username

        }
        console.log("dataSend: ", dataSend)

        axios
            .post("https://paygua.com/api/transaction/create", dataSend)
            .then((result) => {
                console.log("result", result);
                if (result) {
                    if (result.data.status == 200) {
                        if (data.bank === "gopay") {
                            console.log(paymentMethod)
                            if (window.innerWidth > 600) {
                                setButtonPopup(true)

                                creatQrCode(result.data.data.url)
                            } else {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }
                        } else if (data.bank === "qris") {
                            setButtonPopup(true)

                            creatQrCode(result.data.data.url)
                            // window.open(`${result.data.data.deeplink}`, `_self`)
                        } else if (data.bank === "bank") {
                            window.open(`${result.data.data.url}`, `_self`)
                        } else if (data.bank === "ovo") {
                            if (window.innerWidth > 600) {
                                setButtonPopup(true)

                                creatQrCode(result.data.data.url)
                            } else {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }
                            // window.open(`${result.data.data.deeplink}`, `_self`)
                        } else if (data.bank === "shopeepay") {
                            if (window.innerWidth > 600) {
                                setButtonPopup(true)

                                creatQrCode(result.data.data.url)
                            } else {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }
                            // window.open(`${result.data.data.deeplink}`, `_self`)
                        } else if (data.bank === "dana") {
                            if (window.innerWidth > 600) {
                                setButtonPopup(true)

                                creatQrCode(result.data.data.url)
                            } else {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }
                            // window.open(`${result.data.data.deeplink}`, `_self`)
                        } else if (data.bank === "linkaja") {
                            if (window.innerWidth > 600) {
                                setButtonPopup(true)

                                creatQrCode(result.data.data.url)
                            } else {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }
                            // window.open(`${result.data.data.deeplink}`, `_self`)
                        }
                        // else if (window.innerWidth <= 600) {
                        //     window.open(`${result.data.data.deeplink}`, `_self`)
                        // }
                        console.log(result.data)
                    }
                    console.log("if result", result)
                }

                console.log("result:", result.data);
                console.log(token)
            })
            .catch((e) => {
                console.log(e);
                alert("Error")
            });
        // submitForm()
        // }

    }
    const handleChange = (e) => {
        setValues({
            ...data,
            [e.target.name]: e.target.value
        });

        // console.log(e.target.value)
        // if (e.target.name === "nominal") {
        //     let nominal = parseInt(e.target.value.replace(/\./g, ""));
        //     let biayaBank = data.biayaBank
        //     if (!isNaN(e.target.value)) {
        //         setValues({
        //             ...data,
        //             [e.target.name]: e.target.value
        //         });
        //     } else {
        //         setValues({
        //             ...data,
        //             total: nominal + biayaBank,
        //             [e.target.name]: nominal
        //         });
        //     }
        // }
        // else {
        //     setValues({
        //         ...data,
        //         [e.target.name]: e.target.value
        //     });
        // }
    };

    const [data, setValues] = useState({
        bio: "",
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
        if (props.type === "type1") {
            axios.get("https://paygua.com/api/transaction/" + paramobj.username, null, {
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data,
                            bio: result.data.data.bio,
                            profilePicture: result.data.data.profilePicture,
                            name: result.data.data.name,
                            username: paramobj.username

                        })

                    } else if (result.data.status === 400) {
                        history.push("/404error")
                    }

                    // console.log(bio)

                })
                .catch((e) => {
                });
        } else if (props.type === "type2") {
            //alert("out")
            axios.get("https://paygua.com/api/transaction/" + paramobj.username + "/" + paramobj.invoiceId, null, {
            })
                .then((result) => {
                    if (result.data.status === 200) {

                        setValues({
                            ...data,
                            bio: result.data.data.bio,
                            nama: result.data.data.invoice.name,
                            email: result.data.data.invoice.email,
                            nominal: result.data.data.invoice.nominal.replace(".", ""),
                            pesan: result.data.data.invoice.pesan,
                            profilePicture: result.data.data.profilePicture,
                        })

                    } else if (result.data.status === 400) {
                        history.push("/404error")
                    }

                    console.log(result.data);
                })
                .catch((e) => {

                });
        }
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div>
                    <h1 className={styles.maudy}>Bayar ke {data.name}</h1>
                    <br></br>
                    <div className={styles.boxdua}>
                        <img className={styles.boxdalam} src={data.profilePicture}></img>
                        <b className={styles.usernameCard}>@{data.username}</b>
                        <p className={styles.info}>{data.bio}</p>
                    </div>
                    <input
                        type="text"
                        class={styles["nama"]}
                        name="nama"
                        placeholder="Masukkan Nama Anda"
                        value={data.nama}
                        onChange={handleChange}
                    ></input>
                    <div className={styles["set"]}>{errors.nama && <p className="error">{errors.nama}</p>}</div>
                    <input
                        type="email"
                        class={styles["email"]}
                        name="email"
                        placeholder="Masukkan Email Anda"
                        value={data.email}
                        onChange={handleChange}
                    ></input>
                    <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>

                    <CurrencyFormat className={styles["nominal"]} name="nominal"
                        value={data.nominal}
                        placeholder="Masukkan Nominal"
                        onChange={handleChange} thousandSeparator={'.'} decimalSeparator={','}></CurrencyFormat>

                    <div className={styles["set"]}>{errors.nominal && <p className="error">{errors.nominal}</p>}</div>

                    <input
                        type="text"
                        class={styles["pesan"]}
                        name="pesan"
                        placeholder="Pesan (Contoh: Pembayaran Jasa Konsultasi)"
                        value={data.pesan}
                        onChange={handleChange}
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
                    showResults ? <div class={styles["inputOVO"]}>
                        <h5 class={styles["OVOLabel"]}>
                            {masukkanOVO}
                            <h5 class={styles["number"]}>
                                {codeNumber}
                                <CurrencyFormat className={styles["ovo"]} name="nomor"
                                    value={data.nomor}
                                    onChange={handleChange}></CurrencyFormat>
                            </h5>

                        </h5>

                    </div>
                        : null
                }
                {/* <div className={styles["set"]}>{errors.nomor && <p className="error">{errors.nomor}</p>}</div> */}
                {
                    showtransfer ? <p style={{ fontSize: "12px", color: "black", marginLeft: "70px" }}>*Transfer Bank akan ditambah biaya 4.000</p> : null
                }
                <div className={data.bank == "" || data.nama == "" || data.email == "" || data.nominal == "" ? styles.btnSubmit : styles.btnBedaWarna} onClick={handleFormSubmit}>
                    <p className={data.bank == "" || data.nama == "" || data.email == "" || data.nominal == "" ? styles.text2 : styles.text21}  >Bayar</p>
                </div>
                <Popup
                    trigger={buttonPopup}>
                    {/* <div className={styles.customPopup}> */}
                    <text onClick={() => { setButtonPopup(false) }}>X</text>
                    <canvas id="canvas"></canvas>
                    {/* </div> */}
                    {/* <img src={URL.createObjectURL({ qrImage })} /> */}
                </Popup>
                <Link to="/"><img className={styles.logo1} src={logo} alt="logo" /></Link>

            </div>
        </div>

    )
}



export default DummyCmp