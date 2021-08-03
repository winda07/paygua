import React, { useEffect } from "react";
import styles from "./TentangKami.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg";
import latar from "../../img/Latar.svg";
import kredit from "../../img/kartukredit.svg"
// import va from "../../img/va.svg"
import wallet from "../../img/E-Wallet.svg"
import black from "../../img/black.svg"
import frame1 from "../../img/Frame 1.svg"
import frame2 from "../../img/Frame 2.svg"
import frame3 from "../../img/Frame 3.svg"
import free from "../../img/freelancer.svg"
import penju from "../../img/penjualonline.svg"
import trainer from "../../img/trainer.svg"
import konsultan from "../../img/konsultan.svg"
import donasi from "../../img/donasi.svg"
import konten from "../../img/kontenkreator.svg"
import bisnisjasa from "../../img/bisnisjasa.svg"
import bawahfot from "../../img/bawahfot.svg"
import logo1 from "../../img/Frame1.svg"
import menu from "../../img/menu.svg"
import retail from "../../img/Retail.svg"
import kreator from "../../img/Kreator.svg"


const TentangKami = () => {


    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <img style={{ marginLeft: "15px" }} src={logo} alt="logo" />
                <span className={styles.menu}>
                    <a href="#" ><img className={styles['menu2']} src={menu} /> </a>
                    <div className={styles.dropdown}>
                        <Link to="/login">Masuk</Link>
                        <Link to="/register">Daftar</Link>
                        <Link to="/tentangKami">Tentang Kami</Link>
                    </div>
                </span>
                <div className={styles.TentangKami}>
                    <img src={latar} alt="latar" />
                    <div className={styles.textBold}>
                        <h1>Terima dan atur invoice bisnismu dengan cara paling mudah</h1>
                    </div>
                    <div className={styles.text}>
                        <p>Paygua membantu kamu menerima invoice dengan mudah dari pelanggan hanya dengan link. Buat halaman invoice hanya dengan beberapa klik, tanpa website, tanpa ribet.</p>
                    </div>
                    <button className={styles.button}>
                        <p>Mulai Sekarang &#x279D;</p>
                    </button>
                </div>
                {/* <div class="a">
                    <p style={{ marginLeft: "12px" }}>Terima invoice dari:</p>
                </div> */}

                {/* <section className="section">
                    <div className={styles.gambar1}>
                        <img src={kredit} alt="logo" />
                        <img style={{ marginLeft: "5px" }} src={va} alt="logo" />
                        <img style={{ marginLeft: "5px" }} src={wallet} alt="logo" />
                    </div>
                    <div className={styles.KK}>
                        <p>&emsp; Transfer Bank</p>
                    </div>
                    <div className={styles.VA}> Virtual  Account</div>
                    <div className={styles['E-Wallet']}> E-Wallet </div>
                </section>

                <div className={styles.TentangKami2}>
                    <img src={black} alt="logo" />
                    <div className={styles.textblack}>
                        <b>Dana dapat dengan mudah  dicairkan ke semua rekening  Bank dan E-Wallet</b>
                    </div>
                </div> */}

                <div className={styles.rules}>
                    <b style={{ fontSize: "18px", color: "#21242B", marginLeft: "12px" }}>Bagaimana Paygua bekerja?</b>
                    <br></br>
                    <br></br>
                    <b style={{ fontSize: "14px", color: "#21242B", marginLeft: "12px" }}>1.&emsp;Daftar dan Buat Halaman</b>
                    <p style={{ fontSize: "14px", color: "#21242B", marginLeft: "35px", margin: "5px 0px 14px 35px " }}>Pendaftaran sangat mudah. <br></br>
                        Klik daftar sekarang untuk memulai.</p>
                    <b style={{ fontSize: "14px", color: "#21242B", marginLeft: "12px" }}>2.&emsp;Buat Tagihan</b>
                    <p style={{ fontSize: "14px", color: "#21242B", marginLeft: "35px", margin: "5px 0px 14px 35px " }}>Buat tagihan hanya dengan <br></br>
                        hitungan detik di dashboard Paygua.</p>
                    <b style={{ fontSize: "14px", color: "#21242B", marginLeft: "12px" }}>3.&emsp;Bagikan Link dan Terima Pembayaran</b>
                    <p style={{ fontSize: "14px", color: "#21242B", marginLeft: "35px", margin: "5px 0px 14px 35px " }}>Salin dan tempel tautan invoice <br></br>
                        di aplikasi pesan, email atau media sosial.</p>
                    <b style={{ fontSize: "14px", color: "#21242B", marginLeft: "12px" }}>4.&emsp;Terima Notifikasi</b>
                    <p style={{ fontSize: "14px", color: "#21242B", marginLeft: "35px", margin: "5px 0px 14px 35px " }}>Terima notifikasi secara real-time <br></br>
                        dengan email.</p>
                </div>

                <div className={styles.why}>
                    <div className={styles.f}>
                        <b style={{ fontSize: "18px", color: "#21242B", marginLeft: "12px" }}>Mengapa Menggunakan Paygua?</b>
                        <img style={{ marginTop: "20px", maxWidth: "330px", marginLeft: "12px", borderRadius: "4px" }} src={frame1} alt="logo" />
                        <img style={{ marginTop: "10px", maxWidth: "330px", marginLeft: "12px", borderRadius: "4px" }} src={frame2} alt="logo" />
                        <img style={{ marginTop: "10px", maxWidth: "330px", marginLeft: "12px", borderRadius: "4px" }} src={frame3} alt="logo" />
                        <div className={styles.img1}>
                            <b style={{ fontSize: "14px" }}>Dapat Dipersonalisasi</b>
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>Gunakan brandmu untuk terlihat  lebih profesional.</p>
                        </div>
                        <div className={styles.img2}>
                            <b style={{ fontSize: "14px" }}>Cepat</b>
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>Pengiriman dana real-time.</p>
                        </div>
                        <div className={styles.img3}>
                            <b style={{ fontSize: "14px" }}>Biaya Terjangkau</b>
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>Biaya dan potongan harga yang  terjangkau.</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginLeft: "12px" }}>
                    <h3 className={styles.n}>Paygua cocok untuk</h3>
                    <div className={styles.g1}>
                        <img style={{ marginBottom: "10px" }} src={free} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={penju} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={trainer} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={konsultan} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={retail} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={kreator} alt="logo" />
                        <img style={{ marginBottom: "10px", marginLeft: "5px" }} src={bisnisjasa} alt="logo" />
                    </div>
                </div>

                <footer>
                    <div className={styles.box1}>
                        <div className={styles.fot1}>
                            {/* <div className={styles.boxdua}>
                                <h3 className={styles.pay}>Pricing</h3>
                                <h6 className={styles.by}>Setiap transaksi akan dikenakan Biaya
                                    sebesar 5.000. Pencarian dana menuju rekening bebas biaya.</h6>
                            </div> */}
                            <img style={{ marginLeft: "12px" }} src={logo1} alt="logo" />
                            <p style={{ fontSize: "12px", color: "white", marginLeft: "12px" }}>PT.Optimal Teknologi Indonesia</p>
                            <br></br>
                            <b style={{ fontSize: "13px", color: "white", marginLeft: "12px" }}>Tentang Kami</b>
                            <br></br>
                            <b style={{ fontSize: "13px", color: "white", marginLeft: "12px" }}>Syarat dan ketentuan</b>
                            <br></br>
                            <b style={{ fontSize: "13px", color: "white", marginLeft: "12px" }}>Kontak kami</b>
                        </div>


                    </div>


                </footer>

            </div>
        </div >
    );
};

export default TentangKami;