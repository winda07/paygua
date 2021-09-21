import React, { useState, useEffect } from "react"
import cashIn from "../../img/cashIn.webp"
import cashOut from "../../img/cashOut.webp"
import withdrawProcess from "../../img/withdrawProcess.webp"
import withdrawSuccess from "../../img/withdrawSuccess.webp"
import styles from "./Notification.module.css"
import axios from "axios"
import red from "../../img/reddd.webp"
import { Link, useHistory } from "react-router-dom";
import animation from "../../img/animation5.webp"
import Loading from "../Loading/Loading"

const GetNotif = () => {
    const [loadingPopup, setButtonLoading] = useState(false);
    const history = useHistory();
    const [render, setRender] = useState(false);
    const [data, setValues] = useState({
        notif: [],
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setButtonLoading(true)

            axios.get("https://paygua.com/api/user/notification", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data) {
                        if (result.data.status === 200) {
                            setButtonLoading(false)
                            setRender(true);
                            setValues({
                                ...data, notif: result.data.data
                            })
                            setRead()
                        } else {
                            setButtonLoading(false)
                            history.push('/login')
                        }


                    }
                })

        }
    }, []);

    const setRead = (() => {

        const token = localStorage.getItem("token");
        const array = []
        for (var i = 0; i < data.notif.length; i++) {
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
            {render ? <div>
                {data.notif.length === 0 ? (<div className={styles.animation1} style={{ marginLeft: "70px", marginTop: "70px" }}>
                    <img className={styles.animation2} style={{ width: "246px", height: "246px" }} src={animation}></img>
                    <figcaption className={styles.animation3} style={{ fontSize: "20px", color: "black" }}>Belum ada notifikasi, bos..</figcaption>
                    <button style={{ width: "115px", height: "36px", border: "1px solid #21242B", borderRadius: "100px", background: "transparent", marginTop: "20px", marginLeft: "50px", cursor: "pointer" }} onClick={() => { window.location.reload() }}>Refresh</button></div>) :
                    (data.notif.map(ntif => (
                        <div className={styles.a}>
                            <p></p>
                            <button onClick={setRead} className={styles.boxdua}>
                                {ntif.isSeen === false ? <img className={styles['redd']} src={red}></img> : null}
                                <div className={styles.img}>
                                    <p className={styles.message}>
                                        {ntif.type === "cashIn" ? <img src={cashIn}></img> : null ||
                                            ntif.type === "cashOut" ? <img src={cashOut}></img> : null ||
                                                ntif.type === "withdrawProcess" ? <img src={withdrawProcess}></img> : null ||
                                                    ntif.type === "withdrawSuccess" ? <img src={withdrawSuccess}></img> : null || ntif.isSeen === "false" ? <img className={styles.rednotif} src={red}></img> : null}
                                        {ntif.message}</p>
                                </div>
                            </button>
                        </div>
                    )))

                }
            </div> : null}

            <Loading trigger={loadingPopup}></Loading>
        </div >
    )

}
export default GetNotif;