import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import logo from "../../img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg";
import hidePwdImg from "../../img/hidePassword.svg";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";

const Register = ({ submitForm }) => {

  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [dataIsCorrect, setDataIsCorrect] = useState(false)
  const [errors, setErros] = useState({});

  const history = useHistory();
  const urlPayGua = "Paygua.com/"

  const [data, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      axios
        .post("https://paygua.com/api/auth/register", data)
        .then((result) => {
          if (result) {
            if (result.data) {
              if (result.data.status !== "200") {
              }
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
    // paygua.com/
    if (e.target.name === "username") {
      let currentUsername = e.target.value;
      let username = currentUsername.split('/')[1]

      if (username == undefined) {
        username = ""
      }

      setValues({
        ...data,
        [e.target.name]: username,
      });
    } else {
      setValues({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErros(validation(data));
    setDataIsCorrect(true)
  }

  console.log("submitForm on Register: ", submitForm)
  return (
    <div className={styles.App}>
      <div className={styles["form-signin"]}>
        <header className={styles["App-header"]}>
          <img src={logo} alt="logo" />
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
            {errors.email && <p className="error">{errors.email}</p>}
            {/* <input
              type="text"
              name="username"
              class={styles["form-control"]}
              id="=floatingUsername"
              placeholder="Paygua.com/Username"
              // value={urlPayGua.concat(data.username)}
              value={data.username}
              onChange={handleChange}
            ></input> */}
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
            {errors.username && <p className="error">{errors.username}</p>}
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
            {errors.password && <p className="error">{errors.password}</p>}
            <div className="sandi">
              <p className={styles["text-ketentuan"]}>
                Dengan mendaftar, kamu setuju dengan{" "}
                <Link class={styles["text"]}>Syarat dan Ketentuan</Link> yang
                berlaku
              </p>
            </div>

            <div className={styles.btnSubmit12} onClick={handleFormSubmit}>
              <p class={styles.text1}>Daftar</p>
            </div>
            <div class="form-group">
              <p class={styles["text-center1"]}>
                Sudah Punya Akun?{" "}
                <Link class={styles["u"]} to="/">
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

export default Register;