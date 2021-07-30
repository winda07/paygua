import React, { useState, useEffect } from "react"
import jwt from "jwt-decode"
import axios from "axios"
import share from "../../img/share.svg"
import copy from "../../img/copy.svg"
import { Link, Redirect, useHistory } from "react-router-dom";
import Frame from "../../img/Frame.svg"
import styles from "./Dashboard.module.css";
import { Copyright, DataUsageSharp } from "@material-ui/icons"

const GetProfile = () => {
    const urlPayGua = "Paygua.com/"
    const history = useHistory()
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
                    console.log(result)
                })

        } else {
            history.push('/login')
        }
    }, []);
    return (
        <div>
            <img className={styles.picture} src={data.profilePicture}></img>

            <div className={styles.boxdua}>
                <p style={{ fontSize: "24px", color: "#21242B", marginLeft: "25px", height: "10px" }}>{data.name}</p>
                <p style={{ fontSize: "12px", color: "#838790", marginLeft: "25px", position: "relative" }}>{data.bio}</p>
                <Link to="/share" ><img className={styles.share} src={share} alt="logo" /></Link>
                <button className={styles["a"]} onClick={() => { navigator.clipboard.writeText(`paygua.com/${data.username}`) }}>
                    <Link to="/notiftoast"><img className={styles["cop"]} src={copy}></img></Link>
                </button>
                <div class={styles["inputContainer"]}>
                    <input type="text" className={styles.boxdalam} value={`paygua.com/${data.username}`} disabled></input>
                </div>
                <br></br>
            </div>
        </div>
    )
}

export default GetProfile;