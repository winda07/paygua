import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./AdminHome.module.css";
import AdminPopupEdit from "../AdminPopupEdit/AdminPopupEdit"
import silang from "../../img/ion.svg"
import AdminPopupSuccess from "../AdminPopupEdit/AdminPopupSuccess";
import AdminPopupAfterUpdate from "../AdminPopupEdit/AdminPopupAfterUpdate";
const GetUser = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupError, setpopupError] = useState(false);
    const [message, setMessage] = useState("")
    const [popupAfterUpdate, setpopupAfterUpdate] = useState(false)
    const [messageAfterUpdate, setmessageAfterUpdate] = useState("")
    const [data, setValues] = useState({
        getuserinAdmin: [],
        totaluser: ""
    })
    const [setbalance, getnewbalance] = useState({
        balance: "",
    })
    const [selectedPopUp, setSelectedPopUp] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("tokenAdmin");
        if (token) {
            axios.get("https://paygua.com/api/admin/user", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        setValues({
                            ...data, getuserinAdmin: result.data.data.users,
                            totaluser: result.data.data.total
                        })
                    }
                })
        }
    }, []);
    const handlePopup = (userId, idx) => {
        setSelectedPopUp("popUp" + idx);
        getBalance(userId)
        setTimeout(() => {
            setButtonPopup(true)
        }, 1000);
    }
    useEffect(() => {
        var input = document.getElementById("searchEmail");
        input.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.getElementById("hiddenSubmit").click();
            }
        });
    })
    const handleSearchSubmit = (e) => {
        const token = localStorage.getItem("tokenAdmin");
        e.preventDefault();
        const value = document.getElementById("searchEmail").value
        axios.get("https://paygua.com/api/admin/user/" + value, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        getuserinAdmin: result.data.data.users,
                        totaluser: result.data.data.total
                    })
                }
            })
    }
    const handleBlock = (userId) => {
        const token = localStorage.getItem("tokenAdmin");
        axios.post("https://paygua.com/api/admin/user/block", {
            userId: userId
        }, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    axios.get("https://paygua.com/api/admin/user", {
                        headers: {
                            Authorization: token,
                        }
                    })
                        .then((result) => {
                            if (result.data.status === 200) {
                                setValues({
                                    getuserinAdmin: result.data.data.users,
                                    totaluser: result.data.data.total
                                })
                            }
                        })
                }
            })
    }
    const getBalance = (userId) => {
        const token = localStorage.getItem("tokenAdmin");
        axios.get("https://paygua.com/api/admin/user/balance/" + userId, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    try {
                        getnewbalance({
                            balance: result.data.data.balance.replace(/\./g, '')
                        })
                        setButtonPopup(true)
                    } catch (error) {
                        setButtonPopup(false)
                        setpopupError(true)
                        setTimeout(() => {
                            setpopupError(false)
                        }, 1000);
                        setMessage(result.data.errors.errorMessage)
                    }
                }
            })
    }
    const updateUser = (userId, idx) => {
        const token = localStorage.getItem("tokenAdmin");
        const password = document.getElementById("password" + idx).value;
        axios.post("https://paygua.com/api/admin/user/updateUser/" + userId, {
            password: password,
            nominal: parseInt(setbalance.balance)
        }, {
            headers: {
                Authorization: token,
            }
        })
            .then((result) => {
                if (result.data.status === 200) {
                    // alert("success")
                    setpopupAfterUpdate(true)
                    setTimeout(() => {
                        setpopupAfterUpdate(false)
                    }, 1000);
                    setmessageAfterUpdate("Success")
                } else if (result.data.status === 400) {
                    setpopupError(true)
                    setTimeout(() => {
                        setpopupError(false)
                    }, 1000);
                    setMessage(result.data.errors.errorMessage)
                }
            })
    }
    const handleChange = (e) => {
        const value = e.target.value;
        getnewbalance({
            balance: value
        })
    }
    return (

        <div>
            <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <b style={{ fontSize: "18px", marginRight: "280px" }}>Total User : {data.totaluser}</b>
                    <form autocomplete="off">
                        <input style={{ width: "227px", height: "38px", border: "1px solid white", backgroundColor: "#E5E5E5", borderRadius: "15px", padding: "12px 20px", boxSizing: "border-box" }}
                            type="text"
                            class={styles["form-control"]}
                            name="searchEmail"
                            id="searchEmail"
                            autocomplete="no"
                        />
                        <button onClick={handleSearchSubmit} hidden id="hiddenSubmit" />
                    </form>
                </div>
                {

                    data.getuserinAdmin.map((userinAdmin, idx) => (
                        <div>
                            <div className={styles.isiUser}>
                                <div style={{ width: "10%" }}>
                                    <b>Name</b>
                                    <p>{userinAdmin.name}</p>
                                </div>
                                <div style={{ width: "10%" }}>
                                    <b>Username</b>
                                    <p>{userinAdmin.username}</p>
                                </div>
                                <div style={{ width: "10%" }}>
                                    <b>Email</b>
                                    <p style={{ textDecoration: "underline" }}>{userinAdmin.email}</p>
                                </div>
                                <div style={{ width: "10%" }}>
                                    <b>Action</b>
                                    <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                                        <p onClick={() => handlePopup(userinAdmin._id, idx)} >Edit</p>
                                        {userinAdmin.isBlocked ? <p style={{ color: "red" }}>Block</p> : <p onClick={() => handleBlock(userinAdmin._id)}>Block</p>}
                                    </div>
                                </div>
                            </div>
                            <AdminPopupEdit
                                showPopUp={selectedPopUp}
                                trigger={buttonPopup}
                                name={"popUp" + idx}
                            >
                                <div >
                                    <img style={{ marginLeft: "320px", cursor: "pointer" }} onClick={() => { setButtonPopup(false) }} src={silang}></img>
                                    <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                                        <input type="password"
                                            class={styles["form-control"]}
                                            name="password" placeholder="password" id={"password" + idx} />
                                    </div>
                                    <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                                        <input type="number"
                                            class={styles["form-control"]} id={"nominal" + idx}
                                            name="nominal" value={setbalance.balance} onChange={handleChange}
                                        />
                                    </div>
                                    <button className={styles.btnSubmit} onClick={() => updateUser(userinAdmin._id, idx)}>
                                        <p className={styles.text}> Edit</p>
                                    </button>
                                </div>

                            </AdminPopupEdit>

                        </div>
                    ))
                }
                <AdminPopupSuccess trigger={popupError}><div onClick={() => {
                    setpopupError(false)
                }}><img style={{ marginLeft: "320px", cursor: "pointer" }} src={silang}></img>
                    <div style={{ marginLeft: "100px", marginBottom: "20px" }}>{message}</div>
                </div>

                </AdminPopupSuccess>
                <AdminPopupAfterUpdate trigger={popupAfterUpdate}><div onClick={() => {
                    setpopupError(false)
                }}>
                    <div style={{ textAlign: "center", justifyContent: "center" }}>{messageAfterUpdate}</div>
                </div>
                </AdminPopupAfterUpdate>
            </div>
        </div>
    )
}

export default GetUser