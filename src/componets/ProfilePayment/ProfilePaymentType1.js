import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import styles from "./Qris.module.css"
import axios from 'axios';
import { useParams } from "react-router"
const ProfilePaymentType1 = (props) => {
    const history = useHistory()
    const [type, setType] = useState(false);
    let paramobj = useParams();
    const [data, setValues] = useState({
        nama: "",
        username: ""
    })
    useEffect(() => {
        axios.get("https://paygua.com/api/transaction/" + paramobj.username, null, {
        })
            .then((result) => {
                if (result.data.status === 200) {
                    setValues({
                        ...data,
                        name: result.data.data.name,
                        username: paramobj.username
                    })

                } else if (result.data.status === 400) {
                    history.push("/404error")
                }

            })


    }, [])
    const handleClick = () => {
        history.push({
            pathname: "/dashbord",
            state: {
                name: data.name
            }
        })
    }
    return (
        <div >
            <p>{data.name}</p>
            <p>@{data.username}</p>
            <button>Bayar</button>
        </div>
    )
}

export default ProfilePaymentType1