import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import logo from "../../img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg";
import hidePwdImg from "../../img/hidePassword.svg";
import axios from "axios";
import { AirlineSeatIndividualSuiteSharp, Message } from "@material-ui/icons";
import validation from "./validation.js";
import values from "postcss-modules-values";
import RegisterCheck from "./RegisterCheck";

const Register = () => {
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [alert, setAlert] = useState("");

  const [errors, setErros] = useState({});
    const history = useHistory();
 
    const [data,setValues] = useState({
      username: "",
      email: "",
      password: "",
    });

    useEffect(() => {
      if (localStorage.getItem("user-info")){
        history.pushState({RegisterCheck})
      }
    }, []);

    async function register(){
      console.warn(email,username,password)
      let item={email,username,password};
      let result= await fetch("https://paygua.com/api/auth/login",{
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      localStorage.setItem("yser-info",JSON.stringify(result))
      history.push({RegisterCheck})
    }
        


    axios
      .post("https://paygua.com/api/auth/register", data)
      .then((result) => {
        if (result) {
          if (result.data) {
            // setUsername('')
            // setEmail('')
            // setPassword('')
            // setAlert(result.data.errors);
            // setTimeout(()=>{
            //   setAlert('')
            // },3000)
          }
        }
        console.log(result.data);
      })

      .catch((e) => {
        // console.log('error', e.response.data.errors.errorMessage)
      });
  
      const handleChange = (e) => {
        setValues({
          ...data,
          [e.target.name]: e.target.value,
        });
      };

  

    const handleFormSubmit = (e) =>{
      e.preventDefault();
      setErros(validation(data));
    }
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
            <input
              type="text"
              name="username"
              class={styles["form-control"]}
              id="=floatingUsername"
              placeholder="paygua.com/Username"
              value={data.username}
              onChange={handleChange}
            ></input>
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
              <p  class={styles["text-center1"]}>
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