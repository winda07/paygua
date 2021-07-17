import React, { useState } from "react";
import styles from './Login.module.css'
import logo from "../../img/logo.svg"
import { Link } from "react-router-dom";
import showPdwImg from "../../img/showPassword.svg"
import hidePwdImg from "../../img/hidePassword.svg"

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isRevealPwd, setIsRevealPwd] =useState(false);

  const onChangeEmail = (e) => {
      const value = e.target.value
      setEmail(value)
  }

  const onChangePassword = (e) =>{
      const value = e.target.value
      setPassword(value)
  }

  

  return (
    <div className={styles.App}>
      <div className={styles['form-signin']}>
        <header className={styles['App-header']}>
          <img src={logo}  alt="logo" />
            <div className="datang">
                <h1 class="h3 mb-3 fw-normal">Selamat Datang kembali</h1>
                <input type="email" className={styles['form-control']} id="floatingInput" placeholder="Email" 
                value={email} onChange={onChangeEmail}></input>

                <input type={isRevealPwd ? "text" : "password"} class={styles['form-control']} id="floatingPassword" placeholder="Password"
                value={password} onChange={e=> setPassword(e.target.value)}/>
                <img className={styles['img']} title={isRevealPwd ? "Hide password" : "Show Password"} src={isRevealPwd ? hidePwdImg : showPdwImg} onClick={()=> setIsRevealPwd(prevState => !prevState)}/>

                <div className={styles.sandi}>
                   <Link style={{textDecoration:'none'}} to="/lupas"> <a class={styles['ForgetPwd']}>Lupa Kata Sandi?</a></Link>  
                </div>

                <div className={styles.btnSubmit}>
                <Link style={{textDecoration:'none'}} to="/dashboard"><p className={styles.text}  >Masuk</p></Link>
                </div>

                <div class="form-group">
                 <p class={styles['text-center1']}>Belum Punya Akun? <Link to="/register"> <strong><u>Daftar disini!</u></strong></Link></p>
                </div>
            </div>
        </header>
      </div>
    </div>
  );
};

export default Login;
