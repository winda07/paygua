import React, { useState, useEffect } from "react"
import cashIn from "../../img/cashIn.svg"
import cashOut from "../../img/cashOut.svg"
import withdrawProcess from "../../img/withdrawProcess.svg"
import withdrawSuccess from "../../img/withdrawSuccess.svg"
import styles from "./Notification.module.css"
import axios from "axios"
import red from "../../img/reddd.svg"

const GetNotif = () => {
    const [data, setValues] = useState({
        notif: [],
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/notification", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            if (data.notif.isSeen === false) {
                                return data.notif.isSeen === true
                            }
                            setValues({
                                ...data, notif: result.data.data
                            })
                        }
                    }

                })

        }
    }, []);

    const setRead = (() => {
        const token = localStorage.getItem("token");
        const array = []
        for (const notif in data.notif) {
            if (!notif.isSeen) {
                array.push(notif)
            }
        }
        if (token) {
            axios.post("https://paygua.com/api/user/notification", array, {

                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (data.notif.isSeen === false) {
                            return data.notif.isSeen === true
                        }
                        setValues({
                            ...data, setReadNotif: data.notif
                        })

                    }

                })
        }
    })

    return (
        < div >
            {
                data.notif.map(ntif => (
                    <div className={styles.a}>
                        <p></p>
                        <div className={styles.boxdua}>
                            {ntif.isSeen === false ? <img className={styles['redd']} src={red}></img> : null}
                            <div className={styles.img}>
                                <p>
                                    {ntif.type === "cashIn" ? <img src={cashIn}></img> : null ||
                                        ntif.type === "cashOut" ? <img src={cashOut}></img> : null ||
                                            ntif.type === "withdrawProcess" ? <img src={withdrawProcess}></img> : null ||
                                                ntif.type === "withdrawSuccess" ? <img src={withdrawSuccess}></img> : null || ntif.isSeen === "false" ? <img src={red}></img> : null}
                                    {ntif.message}</p>
                            </div>



                        </div>
                    </div>
                ))
            }
        </div >
    )

}
export default GetNotif;