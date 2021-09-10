import React, { useState, useEffect } from "react";
import styles from "./Lupas.module.css";
import logo from "../../img/logo.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";
import Loading from "../Loading/Loading"

const Lupas = ({ submitForm }) => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const history = useHistory();
  const [loadingPopup, setButtonLoading] = useState(false);
  const [data, setValues] = useState({
    email: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("isClicked: ", isClicked)
    // setErros(validation(data));
    setDataIsCorrect(false);
    setIsClicked(false);
  }, [])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      setButtonLoading(true)
      axios.post("https://paygua.com/api/auth/recover", data)
        .then((result) => {
          if (result.data) {
            setButtonLoading(false)
            history.push({
              pathname: '/verifLupaPassword',
              state: {
                email: data.email
              }
            })
            submitForm()
          }
        })

    } else if (token) {
      history.push('/dashboard')
    }
  }, [errors, dataIsCorrect])
  const handleChange = (e) => {
    setValues({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    setErros(validation(data));
    setDataIsCorrect(true)
    setIsClicked(true);
  }

  return (
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <header className={styles['App-header']}>
          <Link to="/TentangKami"><img src={logo} alt="logo" /></Link>
          <div className="datang">
            <h2 className="judul">Atur Ulang Kata Sandi</h2>
            <p className="text-ketentuan"> Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.</p>
            <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Email" name="email" value={data.email} onChange={handleChange} ></input>
            <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>
            <div className={styles.btnSubmit} onClick={handleFormSubmit}>
              <p class={styles.text} >Lanjut</p>
            </div>
          </div>
        </header>
      </div>
      <Loading trigger={loadingPopup}></Loading>
    </div>
  )
}

export default Lupas