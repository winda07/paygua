import React, { useEffect } from "react"
import "./App.css"
import Form from "./componets/Register/Form"
import Login from './componets/Login/Form';
import LupaPassword from "./componets/LupaPassword/Form"
import ResetPassword from "./componets/ResetPassword/Form";
import VerifyEmail from "./componets/VerifyEmail/Form";
import Success from "./componets/Success/Succes"
import Expired from "./componets/LinkExpired/LinkExpired"
import ChangePassword from "./componets/Password/Password"
import Settings from "./componets/Settings/Settings"
import Editprofile from "./componets/EditProfile/EditProfile"
import Daftar2 from "./componets/Daftar2/Daftar2"
import Dashboard from "./componets/Dashboard/Dashboard";
import Share from "./componets/Share/Share"
import notifToast from "./componets/NotifToast/NotifToast"
import Pencairan from "./componets/Pencairan/Pencairan"
import SuccessPencairan from "./componets/PopupSuksesPencairan/PopupSuksesPencairan"
import Transaksi from "./componets/Transaksi/Transaksi";
import BuatTagihan from "./componets/BuatTagihan/BuatTagihan"
import SuksesTagihan from "./componets/PopupSuksesBuatTagihan/PopupSuksesTagihan"
import Tagihan from "./componets/Tagihan/GetUserInvoice"
import DetailTagihan from "./componets/DetailTagihan/DetailTagihan"
import ProfileGeneral2 from "./componets/ProfileGeneral2/ProfileGeneral2"
import VerivLupas from "./componets/VerivLupas/VerivLupas";
import DummyCmp from "./componets/DummyCmp/DummyCmp"
import TentangKami from "./componets/TentangKami/TentangKami"
import Notification from "./componets/Notification/Notification"
import VerfifResetPasswrod from "./componets/VerfiResetPassword/VerifResetPassword"
import RegisterCheck from "./componets/Register/RegisterCheck"
import SuksesPembayaran from "./componets/SuksesPembayaran/SuksesPembayaran"
import KirimDana from "./componets/KirimDana/KirimDana";
import QrStatis from "./componets/QrStatis/QrStatis";
import LandingPage from "./componets/LandingPage/LandingPage";
import AdminLogin from "./componets/Admin/AdminLogin";
import AdminHome from "./componets/AdminHome/AdminHome";
import SyaratdanKetentuan from "./componets/SyaratdanKetentuan/SyaratdanKetentuan";
import PaymentSuccess from "./componets/PaymentSuccess/PaymentSuccess"
import Qris from "./componets/Qris/Qris";
import pilihBank from "./componets/Pencairan/PilihBank"
import RekeningBank from "./componets/Pencairan/RekeningBank";
import ProfilePaymentType1 from "./componets/ProfilePayment/ProfilePaymentType1";
import ProfilePaymentType2 from "./componets/ProfilePayment/ProfilePaymentType2";
import ProfilePayment from "./componets/ProfilePayment2/PaymentProfile"
import ProfilePayment2 from "./componets/ProfilePayment2/PaymentProfile2"
import DetailNotif from "./componets/Notification/DetailNotif";
import PrivateRoute from './PrivateRoute'
import PrivateRoute2 from './PrivateRoute2'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
// import { createMemoryHistory } from "history";
// import { Router } from "react-router";
import jwt from "jwt-decode"
import UserNotFound from "./componets/404/Notfound"
import { useMediaQuery } from 'react-responsive'
const App = () => {
  // const isMobileDevice = useMediaQuery({
  //   query: "(min-device-width: 480px)",
  // });
  const history = useHistory()
  // const { location } = props;
  // const CMHistory = createMemoryHistory(location)
<<<<<<< HEAD
  const remove = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    history.push('/')
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt(token)
      const dateNow = new Date();
      const expToken = new Date(user.exp * 1000);
      if (dateNow > expToken) {
        remove()
      }
    } else {
      remove()
    }
  })
=======
  // const remove = () => {
  //   localStorage.removeItem("token")
  //   localStorage.removeItem("username")
  //   localStorage.removeItem("userId")
  //   history.push('/')
  // }
  // useEffect(() => {
  //   checkRoute()
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt(token)
  //     const dateNow = new Date();
  //     const expToken = new Date(user.exp * 1000);
  //     if (dateNow > expToken) {
  //       remove()
  //     } else {
  //       history.push("/dashboard")
  //     }
  //   } else {
  //     remove()
  //   }
  // })

  // function checkRoute() {
  //   const location = useLocation();
  //   console.log(location.pathname);
  // }
>>>>>>> 83000267aacfa844a95dd5ca2cca8ee3aea137f6
  return (
    <div>
      <Switch>

        {/* {isMobileDevice && <Route exact path="/" component={TentangKami} />} */}
        <PrivateRoute2 exact path="/" component={LandingPage} />
        <PrivateRoute2 path="/TentangKami" component={TentangKami} />
        <PrivateRoute2 path="/login" component={Login} />
        <PrivateRoute2 path="/register" component={Form} />
        <PrivateRoute2 path="/verifLupaPassword" component={VerivLupas} />
        <PrivateRoute2 path="/lupaPassword" component={LupaPassword} />
        <Route path="/auth/reset/:tokenid" component={ResetPassword} />
        <Route path="/auth/verify/:email/:tokenid" component={VerifyEmail}></Route>
        <Route path="/Success" component={Success}></Route>
        <Route path="/Expired" component={Expired}></Route>
        <PrivateRoute path="/gantiPassword" component={ChangePassword} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/editProfile" component={Editprofile} />
        <PrivateRoute path="/successPayment" component={SuksesPembayaran} />
        {/* <Route history={CMHistory} path="/daftar" component={Daftar2}></Route> */}
        <Route path="/daftar" component={Daftar2}></Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/share" component={Share} />
        <Route path="/notifToast" component={notifToast}></Route>
        <PrivateRoute path="/pencairan" component={Pencairan} />
        <PrivateRoute path="/successPencairan" component={SuccessPencairan} />
        <PrivateRoute path="/transaksi" component={Transaksi} />
        <PrivateRoute path="/buatTagihan" component={BuatTagihan} />
        <Route path="/successTagihan" component={SuksesTagihan}></Route>
        <PrivateRoute path="/tagihan" component={Tagihan} />
        <PrivateRoute exact path="/detailTagihan" component={DetailTagihan} />
        <Route path="/profileGeneral" component={ProfileGeneral2}></Route>
        <PrivateRoute path="/notification" component={Notification} />
        <Route path="/verifResetPassword" component={VerfifResetPasswrod}></Route>
        <Route path="/registerCheck" component={RegisterCheck}></Route>
        <Route path="/404error" component={UserNotFound}></Route>
        <PrivateRoute path="/kirimDana" component={KirimDana} />
        <PrivateRoute exact path="/Qr" component={QrStatis} />
        <Route path="/AdminLogin" component={AdminLogin}></Route>
        <Route path="/AdminHome" component={AdminHome}></Route>
        <Route path="/SyaratdanKetentuan" component={SyaratdanKetentuan}></Route>
        <PrivateRoute path="/paymentSuccess" component={PaymentSuccess} />
        <PrivateRoute path="/Qris" component={Qris} />
        <PrivateRoute path="/PilihBank" component={pilihBank} />
        <PrivateRoute path="/RekeningBank" component={RekeningBank} />
        <Route path="/PaymentProfile" component={ProfilePayment}></Route>
        <Route path="/PaymentProfileInvoice" component={ProfilePayment2}></Route>
        <PrivateRoute path="/detailNotif" component={DetailNotif} />
        <Route exact path="/:username" component={ProfilePaymentType1}></Route>
        <Route exact path="/:username/:invoiceId" component={ProfilePaymentType2}></Route>
        {/* <Route exact path="/:username">
          <DummyCmp type="type1" />
        </Route>
        <Route exact path="/:username/:invoiceId">
          <DummyCmp type="type2" />
        </Route> */}
      </Switch>


    </div>
  )
};
export default App
