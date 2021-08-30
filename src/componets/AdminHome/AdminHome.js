import React, { useState, useEffect } from "react";
import styles from "./AdminHome.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo.svg"
import GetUser from "./GetUser"
import GetTransaction from "./GetTransaction";
import GetWithdrawal from "./GetWithdrawal"

const AdminHome = () => {
    const [setUser, User] = useState(false);
    const handle = () => {
        setUser(false)
    }
    const [selectedSidebar, setSelected] = useState("GetUser");
    const handleSidebarChange = (selected) => {
        setSelected(selected);
    }
    const showSelected = (componentName) => {
        switch (componentName) {
            case "GetUser":
                console.log("1")
                return <GetUser />
            case "GetTransaction":
                console.log("2")
                return <GetTransaction />
            case "GetWithdrawal":
                console.log("3")
                return <GetWithdrawal />
            default:
                console.log("def")
                return <GetUser />
        }
    }
    return (
        <div>
            <div className={styles.box}>
                <div className={styles.kiri}>
                    <div className={styles.divkiri}>
                        <img src={logo}></img>
                        <p className={selectedSidebar == "GetUser" ? styles.selected : null} style={{ marginTop: "30px", cursor: "pointer" }} onClick={() => { handleSidebarChange("GetUser") }}>User</p>
                        <p className={selectedSidebar == "GetTransaction" ? styles.selected : null} style={{ marginTop: "30px", cursor: "pointer" }} onClick={() => { handleSidebarChange("GetTransaction") }}>Daftar Pembayaran</p>
                        <p className={selectedSidebar == "GetWithdrawal" ? styles.selected : null} style={{ marginTop: "30px", cursor: "pointer" }} onClick={() => { handleSidebarChange("GetWithdrawal") }}>Withdrawal</p>
                        <Link style={{ textDecoration: "none" }} to="/AdminLogin"><p style={{ marginTop: "450px", cursor: "pointer", color: "black" }}>Sign Out</p></Link>
                    </div>

                </div>
                <div className={styles.kanan}>
                    {showSelected(selectedSidebar)}
                    {/* <GetUser></GetUser> */}
                    {/* <GetTransaction></GetTransaction> */}
                    {/* <GetWithdrawal></GetWithdrawal> */}
                </div>

            </div>
        </div >
    )

}
export default AdminHome