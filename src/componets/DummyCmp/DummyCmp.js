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
import Popup from "../PopupSuksesPembayaran/PopupSukses"
import jwt from "jwt-decode"
import CurrencyFormat from "react-currency-format";
import validation from "./Validation";

const DummyCmp = (props) => {
    const config = {
        background: "#f5f5f5",
        marginTop: "20px",
        marginBottom: "20px",
        width: 1
    };
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const history = useHistory();
    const [showResults, setShowResults] = useState('');
    const [showtransfer, setShowTransfer] = useState('')
    const [show, setShow] = useState('');
    const [barcode, setBarcode] = useState("https://reactjs.org");
    const handleFormSubmit = (e) => {
        console.log(window.innerWidth)
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
        const token = localStorage.getItem('token');
        let paymentMethod = window.innerWidth <= 600 ? data.bank : "qris";
        paymentMethod = data.bank === "bank" ? "bank" : paymentMethod;
        if (token) {
            const dataSend = {
                name: data.nama,
                nominal: data.nominal,
                email: data.email,
                payment: paymentMethod,
                username: paramobj.username

            }
            console.log("dataSend: ", dataSend)

            axios
                .post("https://paygua.com/api/transaction/create", dataSend, {
                    headers: {
                        Authorization: token,
                    }
                })
                .then((result) => {
                    if (result) {
                        if (result.data.status == 200) {
                            if (data.bank === "gopay") {
                                window.open(`${result.data.data.deeplink}`, `_self`)

                            } else if (data.bank === "qris") {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            } else if (data.bank === "bank") {
                                window.open(`${result.data.data.url}`, `_self`)
                            } else if (window.innerWidth <= 600) {
                                window.open(`${result.data.data.deeplink}`, `_self`)
                            }

                            // setButtonPopup(true);
                            // setTimeout(() => {
                            // }, 3000)

                        }
                        // } else {
                        //     history.push('/login')
                        // }
                    }

                    console.log("result:", result.data);
                    console.log(token)
                })
                .catch((e) => {
                    alert("Error")
                });
            // submitForm()
        }

    }
    const handleChange = (e) => {

        console.log(e.target.value)
        if (e.target.name === "nominal") {
            let nominal = parseInt(e.target.value.replace(/\./g, ""));
            let biayaBank = data.biayaBank
            if (!isNaN(e.target.value)) {
                setValues({
                    ...data,
                    [e.target.name]: e.target.value
                });
            } else {
                setValues({
                    ...data,
                    total: nominal + biayaBank,
                    [e.target.name]: nominal
                });
            }
        }
        else {
            setValues({
                ...data,
                [e.target.name]: e.target.value
            });
        }
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
        total: 0
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
                            username: paramobj.username

                        })
                    } else if (result.data.status === 400) {
                        alert("user not found")
                    }

                    // console.log(bio)
                    console.log(result.data);
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
                        alert("user not found")
                    }

                    console.log(result.data);
                })
                .catch((e) => {
                    alert("not found")
                });
        }
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div>
                    <h1 className={styles.maudy}>Bayar ke {paramobj.username}</h1>
                    <br></br>
                    <div className={styles.boxdua}>
                        <img className={styles.boxdalam} src={data.profilePicture}></img>
                        {/* <div className={styles.boxdalam}>{data.profilePicture}</div> */}
                        <p className={styles.info}>{data.bio}</p>
                    </div>
                    <input
                        type="text"
                        class={styles["form-control-nama"]}
                        placeholder="Masukkan Nama anda"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                    ></input>
                    <div className={styles["set"]}>{errors.nama && <p className="error">{errors.nama}</p>}</div>
                    <input
                        type="email"
                        class={styles["form-control-email"]}
                        placeholder="Masukkan Email anda"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    ></input>
                    <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>
                    {/* <input
                        type="number"
                        class={styles["form-control-nominal"]}
                        placeholder="Masukkan Nominal"
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
                        class={styles["form-control-bio"]}
                        placeholder="Pesan (Contoh: Pembayaran Jasa Konsultasi)"
                        name="pesan"
                        value={data.pesan}
                        onChange={handleChange}
                    ></input>
                </div>

                <section className="section">
                    <img name="bank" value={data.bank === "ovo"} className={styles.logoovo} src={ovo} onClick={() => setBank("ovo")} ></img>
                    <img name="bank" value={data.bank === "gopay"} className={styles.logogopay} src={gopay} onClick={() => setBank("gopay")} ></img>
                    <img name="bank" value={data.bank === "dana"} className={styles.logodana} src={dana} onClick={() => setBank("dana")}></img>
                    <img name="bank" value={data.bank === "linkaja"} className={styles.logolinkaja} style={{ marginLeft: "7px" }} src={linkaja} onClick={() => setBank("linkaja")}></img><br></br>
                    <img name="bank" value={data.bank === "shopeepay"} className={styles.logoshopeepay} src={shopeepay} onClick={() => setBank("shopeepay")}></img>
                    <img name="bank" value={data.bank === "qris"} className={styles.logoqris} src={qris} onClick={() => setBank("qris")} ></img>
                    <img name="bank" value={data.bank === "bank"} className={styles.logotransfer} src={transfer} onClick={() => setBank("bank")} ></img>
                </section>
                <div className={styles["set"]}>{errors.bank && <p className="error">{errors.bank}</p>}</div>
                {
                    showResults ? <CurrencyFormat className={styles['validateOvo']} placeholder="Masukkan nomor OVO" onChange={handleChange} name="nomor" value={data.nomor}></CurrencyFormat> : null
                }
                {
                    showtransfer ? <p>{data.nominal} + 5.000(Biaya Bank) = {data.total}</p> : null
                }
                {/* <br></br> */}
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2}  >Bayar</p>
                </div>
                <Popup
                    trigger={buttonPopup}></Popup>
                <Link to="/"><img className={styles.logo1} src={logo} alt="logo" /></Link>

            </div>
        </div>

    )
}



export default DummyCmp