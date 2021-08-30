import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./AdminHome.module.css";
import AdminPopupEdit from "../AdminPopupEdit/AdminPopupEdit"

const GetUser = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [data, setValues] = useState({
        getuserinAdmin: [],
        totaluser: ""
    })
    const [setbalance, getnewbalance] = useState({
        balance: "",
    })
    useEffect(() => {
        const token = localStorage.getItem("tokenAdmin");
        console.log(token)
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
                    console.log(result)
                })
            // console.log(data.getuser)
        }
    }, []);
    const handlePopup = (userId) => {
        getBalance(userId)
        // setTimeout(() => {
        //     setButtonPopup(true)
        // }, 1000);
    }
    useEffect(() => {
        var input = document.getElementById("search");
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
        const value = document.getElementById("search").value
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
                console.log(result)
            })
        console.log("submited", value);
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
                            console.log(result)
                        })
                }
                console.log(result)
            })
        console.log("handleBlock", userId);
    }
    const getBalance = (userId) => {
        console.log(userId)
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
                        setTimeout(() => {
                            setButtonPopup(true)
                        }, 1000);
                    } catch (error) {
                        alert(result.data.errors.errorMessage);
                    }
                }
                console.log(result)
            })
    }
    const updateUser = (userId, idx) => {
        console.log(userId)
        const token = localStorage.getItem("tokenAdmin");
        const password = document.getElementById("password" + idx).value;
        // const nominal = document.getElementById("nominal").value
        console.log({
            password: password,
            nominal: parseInt(setbalance.balance)
        })
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
                    alert("success")
                }
                console.log(result)
            })
    }
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value)
        console.log(e.target)
        getnewbalance({
            balance: value
        })
    }
    return (

        <div>
            {console.log(data.getuserinAdmin)}

            <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <b style={{ fontSize: "18px", marginRight: "280px" }}>Total User : {data.totaluser}</b>
                    <input style={{ width: "227px", height: "38px", border: "1px solid white", backgroundColor: "#E5E5E5", borderRadius: "15px" }}
                        type="text"
                        class={styles["form-control"]}
                        name="search"
                        id="search"
                    ></input>
                    <button onClick={handleSearchSubmit} hidden id="hiddenSubmit" />
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
                                        <p onClick={() => handlePopup(userinAdmin._id)} >Edit</p>
                                        {userinAdmin.isBlocked ? <p style={{ color: "red" }}>Block</p> : <p onClick={() => handleBlock(userinAdmin._id)}>Block</p>}
                                    </div>
                                </div>
                                <AdminPopupEdit
                                    trigger={buttonPopup}
                                >
                                    <div>
                                        <div>
                                            <input type="password"
                                                class={styles["form-control"]}
                                                name="password" placeholder="password" id={"password" + idx} />
                                        </div>
                                        <div>
                                            <input type="number"
                                                class={styles["form-control"]} id={"nominal" + idx}
                                                name="nominal" value={setbalance.balance} onChange={handleChange}
                                            />
                                        </div>
                                        <button onClick={() => updateUser(userinAdmin._id, idx)}>Edit</button>
                                        {console.log(userinAdmin._id)}
                                    </div>

                                </AdminPopupEdit>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default GetUser