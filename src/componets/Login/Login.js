import React, { useState, useEffect } from "react";
import styles from './Login.module.css'
import logo from "../../img/logo.svg"
import axios from "axios";
import validation from "./validation"
import { Link, useHistory } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg"
import hidePwdImg from "../../img/hidePassword.svg"
import jwt from "jwt-decode"
import Popup from "../PopupLogin/PopupLogin"
import Loading from "../Loading/Loading"
import silang from "../../img/ion.svg"

const Login = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("")
  const [loadingPopup, setButtonLoading] = useState(false);
  const [data, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      setButtonLoading(true)
      axios
        .post("https://paygua.com/api/auth/login", data)
        .then((result) => {
          if (result) {
            if (result.data) {
              if (result.data.status === 400) {
                setButtonPopup(true);
                setButtonLoading(false)
                setTimeout(() => {
                  setButtonPopup(false)
                }, 1000)
                setMessage(result.data.errors.errorMessage)
              } else if (result.data.status === 200) {
                const token = result.data.data.token;
                const user = jwt(token)
                console.log(token)
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id)
                if (user.isCompleted === false) {
                  setButtonLoading(false)
                  history.push("/daftar")
                } else {
                  setButtonLoading(false)
                  history.push(`/checkLogin/${user.id}`)
                  // history.push("/dashboard")
                }
              }

            }
          }

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
      <form onSubmit={handleFormSubmit} className={styles['form-signin']}>
        <header className={styles['App-header']}>
          <Link to="/TentangKami"><img className={styles.logo} src={logo} /></Link>
          <br></br>
          <br></br>
          <div className="datang">
            <b className={styles.datang}>Selamat Datang</b>
            <br></br>
            <b className={styles.datang2}>kembali</b>
            <br></br>
            <br></br>
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

            {/* <div className={styles.btnSubmit} onClick={handleFormSubmit}>
              <p class={styles.text}>Masuk</p>
            </div> */}
            <button className={styles.btnSubmit} type="submit">
              <p className={styles.text}> Masuk</p>
            </button>

            <Popup
              trigger={buttonPopup}>
              <div onClick={() => {
                setButtonPopup(false)
              }}><img style={{ marginLeft: "320px", cursor: "pointer" }} src={silang}></img>
                <div style={{ marginLeft: "80px", marginBottom: "20px" }}>{message}</div>
              </div>
            </Popup>

            <div class="form-group">
              <p class={styles["text-center1"]}>
                Belum Punya Akun?{" "}
                <Link class={styles["text-center2"]} to="/register">
                  Daftar disini!
                </Link>
              </p>
            </div>
          </div>
        </header>
        <div>
          <Loading trigger={loadingPopup}></Loading>
        </div>
      </form>
    </div>
  );
};

export default Login;
