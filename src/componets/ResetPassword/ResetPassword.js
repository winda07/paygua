import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";

const ResetPassword = ({ submitForm }) => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});

  let { tokenid } = useParams();
  console.log(tokenid)

  const history = useHistory();

  const [data, setValues] = useState({
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      axios
        .post("https://paygua.com/api/auth/reset/" + tokenid, data)
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
        <div className={styles.gbrarow}>
          <p className={styles.kun}>Reset Password</p>
        </div>
        <input type="password" className={styles['form-control']} id="floatingInput" placeholder="Password Baru" name="password" value={data.password} onChange={handleChange} ></input>
        <input type="password" className={styles['form-control']} id="floatingInput" placeholder="Konfirmasi Password Baru" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} ></input>
        <div className={styles.btnSubmit} onClick={handleFormSubmit}>
          <p class={styles.text} >Reset Password</p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword