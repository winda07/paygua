import React, { useState, useEffect } from "react";
import styles from "./verifyEmail.module.css"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Success from "../Success/Succes";
import LinkExpired from "../LinkExpired/LinkExpired";
import validation from "./validation.js";

const VerifyEmail = () => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  let { tokenid } = useParams();
  console.log(tokenid)
  const [formIsSubmitted, setFormIsSubmitted] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const submitForm = (isDataValid = false) => {
    setFormIsSubmitted(true)
    if (isDataValid) {
      setFormIsValid(true)
    } else {
      setFormIsValid(false)
    }
  }

  const history = useHistory();

  const [data, setValues] = useState({
    email: ""
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      axios
        .post("https://paygua.com/api/auth/verify/" + tokenid, data)
        .then((result) => {
          if (result) {
            if (result.data) {
              // if (result.data.status === 200) {
              //   submitForm(true)
              // } else if (result.data.status == 400) {
              //   submitForm(false)
              // }
            }
          }
          console.log(result.data);
        })
        .catch((e) => {
        });


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

  console.log("submitForm data: ", submitForm)

  return (
    <div>
      {!formIsSubmitted ? <VerifyEmail submitForm={submitForm} /> : (formIsValid ? <Success /> : <LinkExpired />)}
      <button><Link to="/login">Login</Link></button>
    </div>
    // <div className={styles.App}>
    //   <div className={styles['form-signin']}>
    //     <div className={styles.gbrarow}>
    //       <p className={styles.kun}>Verify Email</p>
    //     </div>
    //     <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Email" name="email" value={data.email} onChange={handleChange} ></input>
    //     <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>
    //     <div className={styles.btnSubmit} onClick={handleFormSubmit}>
    //       <p class={styles.text} >Submit</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default VerifyEmail;