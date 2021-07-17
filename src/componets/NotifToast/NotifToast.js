import React from 'react'
import styles from './NotifToas.module.css'

const NotifToast = () => {

    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
            <p className={styles.save}>Berhasil disalin ke Clipboard!</p>
            </div>
        </div>
    )
} 

export default NotifToast