import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import styles from "./ProfileGeneral2.module.css"
import logo from "../../img/logo.svg"
import ovo from "../../img/OVO.svg"
import gopay from "../../img/GOPAY.svg"
import dana from "../../img/DANA.svg"
import linkaja from "../../img/LINKAJA.svg"
import shopeepay from "../../img/SHOPEEPAY.svg"
// import qris from "../../img/QRIS.svg"
import transfer from "../../img/Bank Transfer.svg"
import axios from 'axios';
import jwt from "jwt-decode"
import validation from "./validation";
import Popup from "../PopupSuksesPembayaran/PopupSukses"
import DummyCmp from "../DummyCmp/DummyCmp";
const ProfileGeneral2 = () => {
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const [errors, setErros] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const history = useHistory();
    const [showResults, setShowResults] = useState('');
    const [show, setShow] = useState('');
    const [data, setValues] = useState({
        name: "",
        nominal: "",
        email: "",
        pesan: "",
        bank: ""
    })
    const handleChange = (e) => {

        setValues({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            const token = localStorage.getItem('token');
            if (token) {
                const user = jwt(token);
                axios
                    .post("https://paygua.com/api/transaction/create", {
                        name: data.name,
                        nominal: data.nominal,
                        email: data.email,
                        pesan: data.pesan,
                        bank: data.bank
                    }, {
                        headers: {
                            'Authorization': token,
                        }
                    })
                    .then((result) => {
                        if (result.data) {
                            if (result.data.status == 200 && result.data.success) {
                                setButtonPopup(true);
                            } else {
                                localStorage.clear()
                                history.push('/login')
                            }
                        }
                    })
                    .catch((e) => {
                    });
            }


        }

    }, [errors, dataIsCorrect]);

    const handleFormSubmit = (e) => {
        setErros(validation(data));
        setDataIsCorrect(true)
        setIsClicked(true);

    }
    return (
        <div></div>
    )
}

export default ProfileGeneral2