import React from 'react'
import styles from "./DetailTagihan.module.css"
import silang from "../../img/ion.svg"
import trash from "../../img/trash.svg"
import { Link } from 'react-router-dom'
const DetailTagihan = () => {
    return (
        <div className={styles.App}>
            <div className={styles['form-signin']}>
                <div className={styles.gbrarow}>
                    <Link to="/tagihan"><img className={styles.silang} src={silang} alt="logo" /></Link>
                    <p className={styles.kun}>Tagihan{ }</p>
                </div>

                <input
                    type="text"
                    class={styles["form-control-nama"]}
                    id="floatingInput"
                    name="name"
                    placeholder="Nama"
                // value={data.name}
                // onChange={handleChange}
                ></input>
                {/* {errors.nama && <p className="error">{errors.nama}</p>} */}
                <input
                    type="email"
                    class={styles["form-control-email"]}
                    id="floatingInput"
                    name="email"
                    placeholder="Email"
                // value={data.email}
                // onChange={handleChange}
                ></input>
                {/* {errors.email && <p className="error">{errors.email}</p>} */}
                <input
                    type="number"
                    class={styles["form-control-nominal"]}
                    id="floatingInput"
                    name="nominal"
                    placeholder="Nominal"
                // value={data.nominal}
                // onChange={handleChange}
                ></input>
                <p className={styles["min"]}>*Mininal Rp10.000</p>
                {/* {errors.nominal && <p className="error">{errors.nominal}</p>} */}
                <textarea
                    type="email"
                    class={styles["form-control-bio"]}
                    id="floatingInput"
                    name="pesan"
                    placeholder="Pesan"
                // value={data.pesan}
                // onChange={handleChange}
                ></textarea>
                <div className={styles.a}>
                    <Link to="/tagihan"> <img src={trash} alt="logo" /></Link>
                    <p className={styles.change}>Ubah</p>
                </div>
                <br></br>
                <p className={styles.nama}>Nama Penerima</p>
                <br></br>
                <hr></hr>
            </div>
        </div>
    )
}

export default DetailTagihan