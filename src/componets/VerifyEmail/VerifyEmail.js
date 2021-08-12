import React, { useState, useEffect } from "react";
import styles from "./verifyEmail.module.css"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Success from "../Success/Succes"
import LinkExpired from "../LinkExpired/LinkExpired";
import validation from "./validation.js";

const VerifyEmail = () => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  let { email, tokenid } = useParams();
  console.log(tokenid)
  // const [formIsSubmitted, setFormIsSubmitted] = useState(false)
  // const [formIsValid, setFormIsValid] = useState(false)
  // const submitForm = (isDataValid = false) => {
  //   setFormIsSubmitted(true)
  //   if (isDataValid) {
  //     setFormIsValid(true)
  //   } else {
  //     setFormIsValid(false)
  //   }
  // }

  const history = useHistory();

  const verify = () => {
    axios
      .post("https://paygua.com/api/auth/verify/" + tokenid, { email: email })
      .then((result) => {
        if (result) {
          if (result.data) {
            if (result.data.status === 200) {
              history.push('/Success')
            } else if (result.data.status === 400) {
              history.push('/Expired')
            }
          }
        }
        console.log(result.data);
      })
      .catch((e) => {
      });
  }


  return (

    <div className={styles.App}>
      {verify()}

      <div>
      </div>

    </div>
  )
}

export default VerifyEmail;