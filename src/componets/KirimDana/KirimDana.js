import React from 'react';
import styles from "./KirimDana.module.css";
import arrow from "../../img/arrow-left.svg"
import { Link } from "react-router-dom";
import animation from "../../img/animation4.webp"


const KirimDana = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.div1}>
                    <Link to="/dashboard"><img className={styles.arrow} src={arrow}></img></Link>
                    <p className={styles.judul}>Kirim Dana </p>
                </div>
                <img className={styles.image} src={animation}></img>
                <figcaption className={styles.caption}>Fitur sedang dikembangkan</figcaption>
            </div>
        </div>
    )
}

export default KirimDana