import React, { useEffect, useState } from "react";
import styles from "./TentangKami.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo.webp";
import latar from "../../img/latarr.webp";
import kredit from "../../img/kartukredit.webp"
import va from "../../img/VA.webp"
import wallet from "../../img/E-Wallet.webp"
import black from "../../img/black.webp"
import frame1 from "../../img/Frame 1.webp"
import frame2 from "../../img/Frame 2.webp"
import frame3 from "../../img/Frame 3.webp"
import free from "../../img/freelancer.webp"
import penju from "../../img/penjualonline.webp"
import trainer from "../../img/trainer.webp"
import konsultan from "../../img/konsultan.webp"
import donasi from "../../img/donasi.webp"
import konten from "../../img/kontenkreator.webp"
import bisnisjasa from "../../img/bisnisjasa.webp"
import bawahfot from "../../img/bawahfot.webp"
import logo1 from "../../img/Frame1.svg"
import menu from "../../img/menu.webp"
import retail from "../../img/Retail.webp"
import kreator from "../../img/Kreator.webp"
import group from "../../img/Group 211.webp"
import blue from "../../img/blue.webp"
import axios from "axios"


const TentangKami = () => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    const [data, setValues] = useState({
        name: "",
    })
    useEffect(() => {

        if (token) {
            axios.get("https://paygua.com/api/user/profile", {
                headers: {
                    Authorization: token,
                }
            })
                .then((result) => {
                    if (result.data.status === 200) {
                        history.push('/dashboard')
                        setValues({
                            ...data,
                            name: result.data.data.name,
                        })
                    }

                    console.log(result)
                })

        }
    }, []);
    const scrollToTop = () => {
        // document.querySelector("body").scrollTo({ top: 0, behavior: "smooth" })
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("test")
    }
    // console.log(scrollToTop)
    // const token = localStorage.getItem("token");
    // console.log(token)
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <div className={styles.atas}>
                    <img className={styles.logo} src={logo} alt="logo" />
                    <button className={styles.buttonLogin}>
                        {
                            token ?
                                <Link className={styles.textlogin} style={{ textDecoration: "none" }} to="/dashboard">
                                    Hi, {data.name}
                                </Link>
                                :
                                <Link className={styles.textlogin} style={{ textDecoration: "none" }} to="/login">
                                    Masuk
                                </Link>
                        }
                    </button>
                </div>
                <div className={styles.TentangKami}>
                    <img className={styles.latar} src={latar} alt="latar" />
                    <div className={styles.textBold}>
                        <h1>mobile point of sale paling simpel untukmu dan bisnismu</h1>
                    </div>
                    <div className={styles.text}>
                        <p>Paygua adalah mobile point of sale yang paling mudah, aman dan simpel untuk bisnismu. Buat halaman untuk bisnismu hanya dengan beberapa klik, tanpa ribet.</p>
                    </div>
                    <button className={styles.button}>
                        <Link style={{ textDecoration: "none", color: "white" }} to="/register">
                            <p>Mulai Sekarang &#x279D;</p>
                        </Link>

                    </button>
                </div>
                <div class="a">
                    <p className={styles.accept}>Terima pembayaran dengan:</p>
                </div>

                <section className="section">
                    <div className={styles.gambar1}>
                        <img className={styles.gmb1} src={kredit} alt="logo" />
                        <img className={styles.gmb2} src={va} alt="logo" />
                        <img className={styles.gmb3} src={wallet} alt="logo" />
                    </div>
                    <div className={styles.KK}>
                        <p>&emsp; Transfer Bank</p>
                    </div>
                    <div className={styles.VA}> Virtual  Account</div>
                    <div className={styles['E-Wallet']}> E-Wallet </div>
                </section>

                <img className={styles.group} src={group}></img>
                <div style={{ marginLeft: "17px", marginTop: "30px" }}>
                    <b className={styles.text10}>Terima pembayaran produk digital dengan mudah
                        aman dan terpercaya</b>
                    <p className={styles.text11}>Terima pembayaran di point of sale dengan mudah aman dan terpercaya
                        <br></br>
                        <br></br>
                        Catat transaksi dan terima pembayaran untuk bisnismu dengan mudah. Paygua menggunakan gerbang pembayaran yang aman dan terpercaya</p>
                    <Link style={{ textDecoration: 'none' }} className={styles.text12} to={'/register'}><p>Mulai daftar Paygua <img src={blue}></img></p>
                    </Link>
                </div>

                {/* <div className={styles.TentangKami2}>
                    <img src={black} alt="logo" />
                    <div className={styles.textblack}>
                        <b>Dana dapat dengan mudah  dicairkan ke semua rekening  Bank dan E-Wallet</b>
                    </div>
                </div> */}

                <div className={styles.rules}>
                    <b style={{ fontSize: "18px", color: "#21242B" }}>Bagaimana Paygua bekerja?</b>
                    <br></br>
                    <br></br>
                    <b className={styles.judul} >1.&emsp; Daftar dan Buat Halaman</b>
                    <p className={styles.isi1} >Pendaftaran sangat mudah. <br></br>
                        Klik daftar sekarang untuk memulai.</p>
                    <b className={styles.judul} >2.&emsp;Buat Tagihan</b>
                    <p className={styles.isi2} >Buat tagihan hanya dengan <br></br>
                        hitungan detik di dashboard Paygua.</p>
                    <b className={styles.judul} >3.&emsp;Terima Pembayaran</b>
                    <p className={styles.isi3}>Terima pembayaran di aplikasi Paygua dengan QRIS dan berbagai metode lainnya</p>
                    <b className={styles.judul} >4.&emsp;Notifikasi Realtime</b>
                    <p className={styles.isi4} >Dapatkan notifikasi transaksi ke emailmu dan email pelanggan</p>
                </div>

                <div className={styles.why}>
                    <div className={styles.f}>
                        <b className={styles.use} >Mengapa Menggunakan Paygua?</b>
                        <img className={styles.imgwhy1} src={frame1} alt="logo" />
                        <img className={styles.imgwhy2} src={frame2} alt="logo" />
                        <img className={styles.imgwhy3} src={frame3} alt="logo" />
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
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>Biaya dan potongan harga yang <br></br> terjangkau.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.tes}>
                    <h3 className={styles.n}>Paygua cocok untuk</h3>
                    <div className={styles.g1}>
                        <img className={styles.cocok1} src={free} alt="logo" />
                        <img className={styles.cocok2} src={penju} alt="logo" />
                        <img className={styles.cocok3} src={trainer} alt="logo" />
                        <img className={styles.cocok4} src={konsultan} alt="logo" />
                        <img className={styles.cocok5} src={retail} alt="logo" />
                        <img className={styles.cocok6} src={kreator} alt="logo" />
                        <img className={styles.cocok7} src={bisnisjasa} alt="logo" />
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
                            <b style={{ fontSize: "13px", color: "white", marginLeft: "12px", cursor: "pointer" }} onClick={scrollToTop}>Tentang Kami</b>
                            <br></br>
                            <Link style={{ textDecoration: "none" }} to="/SyaratdanKetentuan"><b style={{ fontSize: "13px", color: "white", marginLeft: "12px" }}>Syarat dan ketentuan</b></Link>
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