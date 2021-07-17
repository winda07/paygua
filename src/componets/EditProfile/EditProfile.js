import React from 'react'
import styles from "./EditProfile.module.css"
import logo  from "../../img/logo.svg"
import arrow from "../../img/arrow-left.svg"
import check from "../../img/check.svg"
import user  from "../../img/profile.svg"
import { Link } from "react-router-dom";

const EditProfile = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>

            <div className={styles.gbrarow}>
            <Link to="/register"><img src={arrow}  alt="logo" /></Link>
            <p className={styles.kun}>General</p>
            <Link to="/Login"><img src={check}  alt="logo" /></Link>
           
            </div>

            
            
                <div className={styles.user}>
            <img src={user}  alt="logo" />
            </div>
            <p className={styles.kun1}>Ganti Foto Profile</p>
            <input type="text" class={styles['form-control']} id="floatingNama" placeholder="Nama"></input>

            <input type="text" class={styles['form-control']}  id="=floatingUsername"  placeholder="Username"></input>

            {/* <input type="text" class={styles['form-control-bio']} id="floatingPassword" placeholder="Bio"></input> */}
            <textarea type="text" class={styles['form-control-bio']} id="floatingBio" placeholder="Bio"></textarea>
            <input type="email" class={styles['form-control']} id="floatingEmail" placeholder="Email"></input>


            </div>
        </div>
    )
}

export default EditProfile