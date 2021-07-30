import React from "react";
import styles from "./TentangKami.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg";
import latar from "../../img/Latar.svg";
import kredit from "../../img/kartukredit.svg"
import va from "../../img/VA.svg"
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
import logo1 from "../../img/logobawah.png"


const TentangKami = () => {
    return (
        <div className={styles.App}>
            <div className={styles["form-signin"]}>
                <img src={logo} alt="logo" />
                <span className={styles.menu}>
                    <a href="#">
                        <img src="https://img.icons8.com/android/24/000000/menu.png" />{" "}
                    </a>
                    <div className={styles.dropdown}>
                        <Link to="/login">Masuk</Link>
                        <Link to="/register">Daftar</Link>
                        <Link to="/tentangKami">TentangKami</Link>
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
                <div class="a">
                    <p>Terima invoice dari:</p>
                </div>

                <section className={styles.choose}>
                    <div className={styles.gambar1}>
                        <img src={kredit} alt="logo" />
                        <img src={va} alt="logo" />
                        <img src={wallet} alt="logo" />
                    </div>
                    <div className={styles.KK}>
                        <p>&emsp; Kartu Kredit/Debit</p>
                    </div>
                    <div className={styles.VA}> Virtual  Account</div>
                    <div className={styles['E-Wallet']}> E-Wallet </div>
                </section>

                <div className={styles.TentangKami2}>
                    <img src={black} alt="logo" />
                    <div className={styles.textblack}>
                        <p>Dana dapat dengan mudah  dicairkan ke semua rekening  Bank dan E-Wallet</p>
                    </div>
                </div>

                <div className={styles.rules}>
                    <h3>Bagaimana Paygua bekerja?</h3>
                    <h4>1. &emsp;Daftar dan Buat Halaman</h4>
                    <p className={styles.b}>Pendaftaran sangat mudah.
                        Klik daftar sekarang untuk memulai.</p>

                    <h4>2.&emsp;Buat Tagihan</h4>
                    <p className={styles.c}>Buat tagihan hanya dengan
                        hitungan detik di dashboard Paygua.</p>

                    <h4>3. &emsp;Bagikan Link dan Terima Pembayaran</h4>
                    <p className={styles.d}>Salin dan tempel tautaninvoice
                        di aplikasi pesan, email atau media sosial.</p>

                    <h4>4. &emsp;Terima Notifikasi</h4>
                    <p className={styles.e}>Terima notifikasi secara real-time
                        dengan email.</p>
                </div>

                <div className={styles.why}>
                    <div className={styles.f}>
                        <h3 className={styles.g}>Mengapa Menggunakan Paygua?</h3>
                        <img src={frame1} alt="logo" />
                        <img src={frame2} alt="logo" />
                        <img src={frame3} alt="logo" />
                        <div className={styles.img1}>
                            <h5>Dapat Dipersonalisasi</h5>
                            <p>Gunakan brandmu untuk terlihat  lebih profesional.</p>
                        </div>
                        <div className={styles.img2}>
                            <h5>Cepat</h5>
                            <p>Pengiriman dana real-time.</p>
                        </div>
                        <div className={styles.img3}>
                            <h5>Biaya Terjangkau</h5>
                            <p>Biaya dan potongan harga yang  terjangkau.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.cocok}>
                    <h3 className={styles.n}>Paygua cocok untuk</h3>
                    <div className={styles.g1}>
                        <img src={free} alt="logo" />
                        &emsp;
                        <img src={penju} alt="logo" />
                        &emsp;
                        <img src={trainer} alt="logo" />
                        &emsp;
                        <img src={konsultan} alt="logo" />
                        &emsp;
                        <img src={donasi} alt="logo" />
                        <img src={konten} alt="logo" />
                        &emsp;
                        <img src={bisnisjasa} alt="logo" />
                    </div>
                </div>

                <footer>
                    <div className={styles.box1}>
                        <div className={styles.fot1}>
                            <div className={styles.boxdua}>
                                <h3 className={styles.pay}>Pricing</h3>
                                <h6 className={styles.by}>Setiap transaksi akan dikenakan Biaya
                                    sebesar 5.000. Pencarian dana menuju rekening bebas biaya.</h6>
                            </div>
                            <img src={logo1} alt="logo" />
                            <h6 className={styles.pt}>PT.Pembayaran Mudah Indonesia</h6>

                            <p className={styles.p1}>TentangKami</p>

                            <p className={styles.p2}>Syarat dan Ketentuan</p>

                            <p className={styles.p3}>Kontak Kami</p>
                        </div>


                    </div>


                </footer>

            </div>
        </div>
    );
};

export default TentangKami;
