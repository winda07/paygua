import React, { useState, useEffect } from "react";
import styles from "./Lupas.module.css";
import logo from "../../img/logo.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";

const Lupas = ({ submitForm }) => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});

  const history = useHistory();

  const [data, setValues] = useState({
    email: "",
  });

  const sendEmail = () => {
    history.push({
      pathname: '/verifLupas',
      state: {
        email: data.email
      }
    })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      axios
        .post("https://paygua.com/api/auth/recover", data)
        .then((result) => {
          if (result) {
            if (result.data) {
            }
          }
          console.log(result.data);
        })
        .catch((e) => {
        });
      submitForm()

    }
  }, [errors]);

  const handleChange = (e) => {
    setValues({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErros(validation(data));
    setDataIsCorrect(true)
  }
  return (
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <header className={styles['App-header']}>
          <img src={logo} alt="logo" />
          <div className="datang">
            <h2 className="judul">Atur Ulang Kata Sandi</h2>
            <p className="text-ketentuan"> Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.</p>
            <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Email" name="email" value={data.email} onChange={handleChange} ></input>
            <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>
            <div className={styles.btnSubmit} onClick={sendEmail}>
              <p class={styles.text} >Lanjut</p>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Lupas