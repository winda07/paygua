import React, { useState, useEffect } from "react"
import cashIn from "../../img/cashIn.svg"
import cashOut from "../../img/cashOut.svg"
import withdrawProcess from "../../img/withdrawProcess.svg"
import withdrawSuccess from "../../img/withdrawSuccess.svg"
import styles from "./Notification.module.css"
import axios from "axios"

const GetNotif = () => {
    const [data, setValues] = useState({
        notif: []
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
                        setValues({
                            ...data, notif: result.data.data
                        })

                    }
                    console.log(result)

                })

        }
    }, []);
    console.log(data.notif)

    return (
        < div >
            {
                data.notif.map(ntif => (
                    <div className={styles.a}>
                        <div className={styles.boxdua}>
                            <div className={styles.img}>
                                <p>{ntif.type === "cashIn" ? <img src={cashIn}></img> : null ||
                                    ntif.type === "cashOut" ? <img src={cashOut}></img> : null ||
                                        ntif.type === "withdrawProcess" ? <img src={withdrawProcess}></img> : null ||
                                            ntif.type === "withdrawSuccess" ? <img src={withdrawSuccess}></img> : null}
                                    {ntif.message} </p>
                            </div>


                        </div>
                    </div>
                ))
            }
        </div >
    )

}
export default GetNotif;