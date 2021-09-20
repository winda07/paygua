import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from "./ProfilePaymentType1.module.css"
import axios from 'axios';
import { useParams } from "react-router"
import instagram from "../../img/instagram.svg"
import whatsapp from "../../img/whatssapp.svg"
import web from "../../img/web.svg"
import secure from "../../img/secure.svg"
import logo from "../../img/logo.svg"
const ProfilePaymentType1 = (props) => {
    const history = useHistory()
    const [type, setType] = useState(false);
    let paramobj = useParams();
    const [data, setValues] = useState({
        nama: "",
        username: "",
        profilePicture: "",
        bio: ""
    })
    useEffect(() => {
        axios.get("https://paygua.com/api/transaction/" + paramobj.username, null, {
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        ...data,
                        name: result.data.data.name,
                        profilePicture: result.data.data.profilePicture,
                        bio: result.data.data.bio,
                        username: paramobj.username
                    })

                } else if (result.data.status === 400) {
                    history.push("/404error")
                }

            })


    }, [])
    return (
        <div >
            <div className={styles.App}>
                <div className={styles["form-signin"]}>
                    <img className={styles.image} src={data.profilePicture}></img>
                    <div className={styles.box}>
                        <p className={styles.name}>{data.name}</p>
                        <p className={styles.username}>@{data.username}</p>
                        <Link to="/PaymentProfile"><button className={styles.button}>Bayar</button></Link>
                        <div className={styles.divimage}>
                            <img style={{ cursor: "pointer" }} src={whatsapp}></img>
                            <img style={{ cursor: "pointer" }} src={instagram}></img>
                            <img style={{ cursor: "pointer" }} src={web}></img>
                        </div>
                        <div className={styles.divimage2}>
                            <p style={{ marginLeft: "27px" }}>WhatsApp</p>
                            <p style={{ marginLeft: "57px" }}>Instagram</p>
                            <p style={{ marginLeft: "65px" }}>Website</p>
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

export default ProfilePaymentType1