import React, { useState, useEffect } from "react";
import styles from "./verifyEmail.module.css"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";

const VerifyEmail = ({ submitForm }) => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  let { tokenid } = useParams();
  console.log(tokenid)

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
              if (result.data.status === 200) {
                submitForm(true)
                history.push("/")
              } else if (result.data.status == 400) {
                submitForm(false)
                history.push("/")
              }
            }
          }
          // history.push("/")
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
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <div className={styles.gbrarow}>
          <p className={styles.kun}>Verify Email</p>
        </div>
        <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Password Baru" name="email" value={data.email} onChange={handleChange} ></input>
        <div className={styles.btnSubmit} onClick={handleFormSubmit}>
          <p class={styles.text} >Submit</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail;