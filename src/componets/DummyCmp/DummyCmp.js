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
import validation from "../ProfileGeneral2/validation"
import Popup from "../PopupSuksesPembayaran/PopupSukses"
import jwt from "jwt-decode"

const DummyCmp = (props) => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const history = useHistory();
    const [showResults, setShowResults] = useState('');
    const [show, setShow] = useState('');
    const handleFormSubmit = (e) => {
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);
        const token = localStorage.getItem('token');
        if (token) {
            const dataSend = {
                name: data.nama,
                nominal: data.nominal,
                email: data.email,
                payment: data.bank,
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
                            setButtonPopup(true);
                            setTimeout(() => {
                                setButtonPopup(false)
                            }, 3000)
                        } else {
                            history.push('/login')
                        }
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

        setValues({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
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
        profilePicture: ""
    })
    let paramobj = useParams();
    console.log(paramobj)

    const setBank = (bank) => {
        if (bank === "ovo") {
            setShowResults(true)
        } else {
            setShowResults(false)
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
                            nominal: result.data.data.invoice.nominal,
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
                    <div className={styles.boxdua}>
                        <img className={styles.boxdalam} src={data.profilePicture}></img>
                        {/* <div className={styles.boxdalam}>{data.profilePicture}</div> */}
                        <p className={styles.info}>{data.bio}</p>
                    </div>
                    <input
                        type="text"
                        class={styles["form-control-nama"]}
                        placeholder="Nama"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                    ></input>
                    {/* {errors.name && <p className="error">{errors.name}</p>} */}
                    <input
                        type="email"
                        class={styles["form-control-email"]}
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    ></input>
                    {/* {errors.email && <p className="error">{errors.email}</p>} */}
                    <input
                        type="number"
                        class={styles["form-control-nominal"]}
                        placeholder="Nominal"
                        name="nominal"
                        value={data.nominal}
                        onChange={handleChange}
                    ></input>
                    {/* {errors.nominal && <p className="error">{errors.nominal}</p>} */}
                    <textarea
                        type="text"
                        class={styles["form-control-bio"]}
                        placeholder="Pesan"
                        name="pesan"
                        value={data.pesan}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <br></br>
                <br></br>
                <section className="section">
                    <img className={styles.logoovo} src={ovo} onClick={() => setBank("ovo")} ></img>&emsp;
                    <img name="bank" value={data.bank === "gopay"} className={styles.logogopay} src={gopay} onClick={() => setBank("gopay")} ></img>&emsp;
                    <img name="bank" value={data.bank === "shopeepay"} className={styles.logoshopeepay} src={shopeepay} onClick={() => setBank("shopeepay")}></img>
                </section>

                {
                    showResults ? <input type="text" className={styles['validateOvo']} placeholder="Masukkan nomor Ovo" onChange={handleChange} name="nomor" value={data.nomor}></input> : null
                }
                <br></br>
                <div className={styles.btnSubmit} onClick={handleFormSubmit}>
                    <p className={styles.text2}  >Bayar</p>
                </div>
                <Popup
                    trigger={buttonPopup}></Popup>
                <img className={styles.logo1} src={logo} alt="logo" />
            </div>

        </div>

    )
}



export default DummyCmp