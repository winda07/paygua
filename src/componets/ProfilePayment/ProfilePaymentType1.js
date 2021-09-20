import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from "./ProfilePaymentType1.module.css"
import axios from 'axios';
import { useParams } from "react-router"
const ProfilePaymentType1 = (props) => {
    const history = useHistory()
    const [type, setType] = useState(false);
    let paramobj = useParams();
    const [data, setValues] = useState({
        nama: "",
        username: "",
        profilePicture: ""
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
                    <div className={styles.box}>
                        <p className={styles.name}>{data.name}</p>
                        <p className={styles.username}>@{data.username}</p>
                        <Link to="/payment"><button className={styles.button}>Bayar</button></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePaymentType1