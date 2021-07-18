import React from 'react';
import styles from "./Register.module.css"

const RegisterCheck = () =>{
    return(
        <div className={styles.App}>
             <div className={styles['text-check']}>
             <p className={styles.textCheck}>Please check your email to verify your Account</p>
             </div>
        </div>
    )
}
export default RegisterCheck