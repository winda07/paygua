import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from "./ProfilePaymentType2.module.css"
import axios from 'axios';
import { useParams } from "react-router"
import instagram from "../../img/instagram.webp"
import whatsapp from "../../img/whatssapp.webp"
import web from "../../img/web.webp"
import secure from "../../img/secure.webp"
import logo from "../../img/logo.webp"
const ProfilePaymentType2 = (props) => {
    const history = useHistory()
    const [type, setType] = useState(false);
    let paramobj = useParams();
    const [data, setValues] = useState({
        nama: "",
        username: "",
        profilePicture: "",
        background: "",
        bio: "",
        invoiceId: "",
        nominal: "",
        pesan: "",
        whatsapp: "",
        instagram: "",
        web: ""
    })
    useEffect(() => {
        axios.get("https://paygua.com/api/transaction/" + paramobj.username + "/" + paramobj.invoiceId, null, {
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        ...data,
                        name: result.data.data.name,
                        profilePicture: result.data.data.profilePicture,
                        bio: result.data.data.bio,
                        background: result.data.data.background,
                        username: paramobj.username,
                        nominal: result.data.data.invoice.nominal,
                        pesan: result.data.data.invoice.message,
                        whatsapp: result.data.data.whatsapp,
                        instagram: result.data.data.instagram,
                        web: result.data.data.web,
                    })

                } else if (result.data.status === 400) {
                    history.push("/404error")
                }

            })


    }, [])
    function Web() {
        window.open(`https://${data.web}`)
    }
    const handleClick = () => {
        history.push({
            pathname: "/PaymentProfileInvoice",
            state: {
                username: data.username,
                invoiceId: paramobj.invoiceId
            }
        })
    }
    return (
        <div >
            <div className={styles.App}>
                <div className={styles["form-signin"]}>
                    <img className={styles.BG} src={data.background}></img>
                    <img className={styles.image} src={data.profilePicture}></img>
                    <div className={styles.box}>
                        <p className={styles.name}>Bayar ke {data.name}</p>
                        <p className={styles.username}>@{data.username}</p>
                        <p className={styles.nominal}>{data.nominal}</p>
                        <p className={styles.pesan}>{data.pesan}</p>
                        <button onClick={handleClick} className={styles.button}>Bayar</button>
                        <div className={styles.divimage}>
                            <a href={`https://wa.me/${data.whatsapp}`}><img style={{ cursor: "pointer" }} src={whatsapp}></img></a>
                            <a style={{ textDecoration: "none" }} href={`instagram://user?username=${data.instagram}`}>  <img style={{ cursor: "pointer" }} src={instagram}></img></a>
                            <img onClick={Web} style={{ cursor: "pointer" }} src={web}></img>
                        </div>
                        <div className={styles.divimage2}>
                            <a style={{ textDecoration: "none" }} href={`https://wa.me/${data.whatsapp}`}> <p style={{ marginLeft: "27px", color: "black" }}>WhatsApp</p></a>
                            <a style={{ textDecoration: "none" }} href={`instagram://user?username=${data.instagram}`}>    <p style={{ marginLeft: "57px", color: "black" }}>Instagram</p></a>
                            <p onClick={Web} style={{ marginLeft: "62px" }}>Website</p>
                        </div>
                        <hr className={styles.hr}></hr>
                        <p className={styles.bio}>{data.bio}</p>
                    </div>
                    <p style={{ display: "flex", justifyContent: "center", fontSize: "12px", marginTop: "50px" }}><img src={secure}></img>Pembayaran 100% aman dan terenkripsi</p>
                    <img style={{ marginLeft: "140px", width: "92px", height: "29px" }} src={logo}></img>
                </div>
            </div>
        </div>
    )
}

export default ProfilePaymentType2