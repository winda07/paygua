import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import logo from "../../img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg";
import hidePwdImg from "../../img/hidePassword.svg";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";
import Loading from "../Loading/Loading"
import Popup from "../PopupLogin/PopupLogin"

const Register = ({ submitForm }) => {

  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});
  const [loadingPopup, setButtonLoading] = useState(false);
  const [message, setMessage] = useState("")
  const [buttonPopup, setButtonPopup] = useState(false);
  const history = useHistory();
  const urlPayGua = "Paygua.com/"
  const token = localStorage.getItem("token");
  const [data, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      setButtonLoading(true)
      axios
        .post("https://paygua.com/api/auth/register", data)
        .then((result) => {
          if (result) {
            if (result.data) {
              if (result.data.status === 200) {
                setButtonLoading(false)
                history.push('/registerCheck')
              } else if (result.data.status === 400) {
                setButtonPopup(true);
                setButtonLoading(false)
                setTimeout(() => {
                  setButtonPopup(false)
                }, 1000)
                setMessage(result.data.errors.errorMessage)
              }
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

  console.log("submitForm on Register: ", submitForm)
  return (
    <div className={styles.App}>
      <form onSubmit={handleFormSubmit} className={styles["form-signin"]}>
        <header className={styles["App-header"]}>
          <Link to="/TentangKami"> <img style={{ marginTop: "5px" }} src={logo} alt="logo" /></Link>
          <div className="datang">
            <h1 class="h3 mb-3 fw-normal">Gabung Paygua Sekarang</h1>
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
            <div class={styles["inputContainer"]}>
              <h5 class={styles["usernameLabel"]}>
                {urlPayGua}
              </h5>
              <input
                type="text"
                name="username"
                class={styles["username"]}
                placeholder="Username"
                id="=floatingUsername"
                onChange={handleChange}
              ></input>
            </div>
            <div className={styles["set"]}>{errors.username && <p className="error">{errors.username}</p>}</div>
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
            <div className="sandi">
              <p className={styles["text-ketentuan"]}>
                Dengan mendaftar, kamu setuju dengan{" "}
                <Link to="/SyaratdanKetentuan" class={styles["text"]}>Syarat dan Ketentuan</Link> yang
                berlaku
              </p>
            </div>

            <button className={styles.btnSubmit12} type="submit">
              <p class={styles.text1}>Daftar</p>
            </button>
            <Popup
              trigger={buttonPopup}>
              <div onClick={() => {
                setButtonPopup(false)
              }}><p style={{ marginLeft: "330px", marginBottom: "10px", cursor: "pointer" }}>X</p>
                <div style={{ marginLeft: "100px", marginBottom: "20px" }}>{message}</div>
              </div>
            </Popup>
            <div class="form-group">
              <p class={styles["text-center1"]}>
                Sudah Punya Akun?{" "}
                <Link class={styles["u"]} to="/login">
                  Masuk disini!
                </Link>
              </p>
            </div>
          </div>
        </header>
        <Loading trigger={loadingPopup}></Loading>
      </form>
    </div>
  );
};

export default Register;