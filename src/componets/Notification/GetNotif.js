import React, { useState, useEffect } from "react"
import cashIn from "../../img/cashIn.svg"
import cashOut from "../../img/cashOut.svg"
import withdrawProcess from "../../img/withdrawProcess.svg"
import withdrawSuccess from "../../img/withdrawSuccess.svg"
import styles from "./Notification.module.css"
import axios from "axios"
import red from "../../img/reddd.svg"
import { Link, useHistory } from "react-router-dom";

const GetNotif = () => {
    const history = useHistory()
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
                            setValues({
                                ...data, notif: result.data.data
                            })
                            setRead()
                        } else {
                            history.push('/login')
                        }


                    }
                })

        }
    }, []);

    const setRead = (() => {

        const token = localStorage.getItem("token");
        const array = []
        for (let i = 0; i < data.notif.length; i++) {
            // console.log()
            if (!data.notif[i].isSeen) {
                array.push(data.notif[i]._id)
            }
        }
        console.log(array)
        if (token) {
            axios.post("https://paygua.com/api/user/notification", { notifId: array }, {

                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    console.log("set read started")
                })
                .catch(e => {
                    console.log("errror")
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
                                <p className={styles.message}>
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