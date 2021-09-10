import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect, useHistory } from "react-router-dom";
import Frame from "../../img/Frame.svg"
import styles from "./Dashboard.module.css";
import { Copyright, DataUsageSharp } from "@material-ui/icons"
import Popup from "../PopupCopy/PopupCopy"
import SharePopup from "../Share/Share"

const GetProfile = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [sharePopup, setSharePopup] = useState(false)
    const urlPayGua = "Paygua.com/"
    const history = useHistory()
    const [data, setValues] = useState({
        bio: "",
        username: "",
        profilePicture: "",
        name: "",
        qr: ""
    })
    const setPush = () => {
        history.push({
            pathname: '/Qr',
            state: {
                name: data.name,
                qr: data.qr
            }
        });
    }
    const setcopy = () => {
        setButtonPopup(true)
        setTimeout(() => {
            setButtonPopup(false)
        }, 1000)
        navigator.clipboard.writeText(`paygua.com/${data.username}`)
    }
    const setshare = () => {
        setSharePopup(true);
        setTimeout(() => {
            setSharePopup(false)
        }, 3000)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/profile", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        history.push({
                            pathname: "/dashboard",
                            state: {
                                name: result.data.data.name,
                                qr: result.data.data.qr
                            }
                        })
                        console.log("name", data.name)
                        setValues({
                            ...data,
                            bio: result.data.data.bio,
                            name: result.data.data.name,
                            username: result.data.data.username,
                            profilePicture: result.data.data.profilePicture,
                            qr: result.data.data.qr
                        })
                    }
                    else {
                        // setButtonLoading(false)
                        history.push('/login')
                    }
                    console.log(result)
                })

        }
    }, []);
    return (
        <div>
            <div className={styles.boxdua}>
                <img className={styles.boxdalam} src={data.profilePicture}></img>
                <b className={styles.usernameCard}>@{data.username}</b>
                <p className={styles.info}>{data.bio}</p>
                <div>
                </div>
            </div>
        </div>
    )
}

export default GetProfile;