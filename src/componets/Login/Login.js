import React, { useState, useEffect } from "react";
import styles from './Login.module.css'
import logo from "../../img/logo.svg"
import axios from "axios";
import validation from "./validation"
import { Link, useHistory } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg"
import hidePwdImg from "../../img/hidePassword.svg"
import jwt from "jwt-decode"

const Login = ({ submitForm }) => {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});

  const history = useHistory();

  const [data, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      axios
        .post("https://paygua.com/api/auth/login", data)
        .then((result) => {
          if (result) {
            if (result.data) {
              if (result.data.status === 400) {
                alert("password salah")
              } else if (result.data.status === 200) {
                const token = result.data.data.token;
                const user = jwt(token)
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id)
                console.log("iscompleted", user.isCompleted)
                // console.log("userId", user.id.type)
                // console.log('jwt: ', user)
                if (user.isCompleted === false) {
                  submitForm(false)
                } else {
                  submitForm(true)
                }
                // submitForm();

              }

              // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTg0Mjg0NGViNmMyZTc2MTg2ZmNkZiIsInVzZXJuYW1lIjoiU2FtIiwiaXNDb21wbGV0ZWQiOmZhbHNlLCJpYXQiOjE2MjY2MjA4NjEsImV4cCI6MzI1ODQyNTcyMn0.4w4tArc0MsqFxriJrh8GoOKR9DVmvg5pcYgJjOFxpf4
            }
          }
          console.log(result.data.data.token);

        })
        .catch((e) => {

        });
      // submitForm();
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

  // console.log("submitForm on Register: ", submitForm)

  return (
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <header className={styles['App-header']}>
          <img src={logo} alt="logo" />
          <div className="datang">
            <h1 class="h3 mb-3 fw-normal">Selamat Datang kembali</h1>
            <input
              type="email"
              class={styles["form-control"]}
              id="floatingInput"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            ></input>
            <div className={styles["set"]}>{errors.email && <p className="error">{errors.email}</p>}</div>

            <input
              type={isRevealPwd ? "text" : "password"}
              class={styles["form-control"]}
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />

            <img
              className={styles["img"]}
              title={isRevealPwd ? "Hide password" : "Show Password"}
              src={isRevealPwd ? hidePwdImg : showPdwImg}
              onClick={() => setIsRevealPwd((prevState) => !prevState)}
            />
            <div className={styles["set"]}>{errors.password && <p className="error">{errors.password}</p>}</div>


            <div className={styles.sandi}>
              <Link style={{ textDecoration: 'none' }} to="/lupaPassword"> <a class={styles['ForgetPwd']}>Lupa Kata Sandi?</a></Link>
            </div>

            <div className={styles.btnSubmit} onClick={handleFormSubmit}>
              <p class={styles.text}>Masuk</p>
            </div>

            <div class="form-group">
              <p class={styles["text-center1"]}>
                Belum Punya Akun?{" "}
                <Link class={styles["text-center2"]} to="/register">
                  Masuk disini!
                </Link>
              </p>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Login;
