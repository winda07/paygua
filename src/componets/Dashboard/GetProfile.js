import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect } from "react-router-dom";
import Frame from "../../img/Frame.svg"
import styles from "./Dashboard.module.css";
import { DataUsageSharp } from "@material-ui/icons"
import GetName from "./getName"

const GetProfile = () => {
    const urlPayGua = "Paygua.com/"
    const [data, setValues] = useState({
        bio: "",
        username: "",
        profilePicture: "",
        name: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("https://paygua.com/api/user/profile", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    setValues({
                        ...data,
                        bio: result.data.data.bio,
                        name: result.data.data.name,
                        username: result.data.data.username,
                        profilePicture: result.data.data.profilePicture
                    })
                })
            console.log(data)
        }
    }, []);
    return (
        <div>
            <div className={styles.box1}>
                <p className={styles.usertext}>Foto User</p>
                {/* <p className={styles.usertext}>{data.profilePicture}</p> */}

            </div>
            <div className={styles.boxdua}>
                {/* <GetName></GetName> */}
                <p>{data.name}</p>
                <p>{data.bio}</p>
                <Link to="/share"><img className={styles.share} src={share} alt="logo" /></Link>
                <Link to="/notiftoast"> <img className={styles.cop} src={copy} alt="logo" /></Link>
                <div class={styles["inputContainer"]}>
                    {/* <h5 class={styles["usernameLabel"]}>
                        {urlPayGua}
                    </h5> */}
                    <input type="text" className={styles.boxdalam} value={`paygua.com/${data.username}`} disabled></input>
                </div>
            </div>
        </div>
    )
}

export default GetProfile;