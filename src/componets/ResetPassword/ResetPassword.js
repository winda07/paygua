import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css"
import arrow from "../../img/arrow-left.webp"
import check from "../../img/check.webp"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";
import showPdwImg from "../../img/showPassword.webp"
import hidePwdImg from "../../img/hidePassword.webp"


const ResetPassword = ({ submitForm }) => {
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState(false);
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
            if (result.data.status === 200) {
              // submitForm()
              history.push('/verifResetPassword')
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
  return (
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <div className={styles.gbrarow}>
          <p className={styles.kun}>Reset Password</p>
        </div>
        <input type={isRevealPwd2 ? "text" : "password"} className={styles['form-control']} id="floatingInput" placeholder="Password Baru" name="password" value={data.password} onChange={handleChange} ></input>
        <img
          className={styles["img"]}
          title={isRevealPwd2 ? "Hide password" : "Show Password"}
          src={isRevealPwd2 ? hidePwdImg : showPdwImg}
          onClick={() => setIsRevealPwd2((prevState) => !prevState)}
        />
        <div className={styles["set"]}>{errors.password && <p className="error">{errors.password}</p>}</div>
        <input type={isRevealPwd ? "text" : "password"} className={styles['form-control']} id="floatingInput" placeholder="Konfirmasi Password Baru" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} ></input>
        <img
          className={styles["img"]}
          title={isRevealPwd ? "Hide password" : "Show Password"}
          src={isRevealPwd ? hidePwdImg : showPdwImg}
          onClick={() => setIsRevealPwd((prevState) => !prevState)}
        />
        <div className={styles["set"]}>{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}</div>
        <div className={styles.btnSubmit} onClick={handleFormSubmit}>
          <p class={styles.text} >Reset Password</p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword