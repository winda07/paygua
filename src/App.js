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
import Tagihan from "./componets/Tagihan/Tagihan"
import DetailTagihan from "./componets/DetailTagihan/DetailTagihan"
import ProfileGeneral2 from "./componets/ProfileGeneral2/ProfileGeneral2"
import VerivLupas from "./componets/VerivLupas/VerivLupas";
import DummyCmp from "./componets/DummyCmp/DummyCmp"
import TentangKami from "./componets/TentangKami/TentangKami"
import Notification from "./componets/Notification/Notification"
import VerfifResetPasswrod from "./componets/VerfiResetPassword/VerifResetPassword"
import RegisterCheck from "./componets/Register/RegisterCheck"
import SuksesPembayaran from "./componets/SuksesPembayaran/SuksesPembayaran"
import { Route, Switch, useHistory } from 'react-router-dom';
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt(token)
      const dateNow = new Date();
      const expToken = new Date(user.exp * 1000);
      if (dateNow > expToken) {
        history.push('/')
      }
    }

  })
  return (
    <div>
      <Switch>

        {/* {isMobileDevice && <Route exact path="/" component={TentangKami} />} */}
        <Route exact path="/" component={TentangKami} />
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Form} />
        <Route path="/verifLupaPassword" component={VerivLupas}></Route>
        <Route path="/lupaPassword" component={LupaPassword} />
        <Route path="/auth/reset/:tokenid" component={ResetPassword} />
        <Route path="/auth/verify/:email/:tokenid" component={VerifyEmail}></Route>
        <Route path="/Success" component={Success}></Route>
        <Route path="/Expired" component={Expired}></Route>
        <Route path="/gantiPassword" component={ChangePassword}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/editProfile" component={Editprofile} ></Route>
        <Route path="/successPayment" component={SuksesPembayaran}></Route>
        {/* <Route history={CMHistory} path="/daftar" component={Daftar2}></Route> */}
        <Route path="/daftar" component={Daftar2}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/share" component={Share}></Route>
        <Route path="/notifToast" component={notifToast}></Route>
        <Route path="/pencairan" component={Pencairan}></Route>
        <Route path="/successPencairan" component={SuccessPencairan}></Route>
        <Route path="/transaksi" component={Transaksi}></Route>
        <Route path="/buatTagihan" component={BuatTagihan}></Route>
        <Route path="/successTagihan" component={SuksesTagihan}></Route>
        <Route path="/tagihan" component={Tagihan}></Route>
        <Route exact path="/detailTagihan" component={DetailTagihan}></Route>
        <Route path="/profileGeneral" component={ProfileGeneral2}></Route>
        <Route path="/notification" component={Notification}></Route>
        <Route path="/verifResetPassword" component={VerfifResetPasswrod}></Route>
        <Route path="/registerCheck" component={RegisterCheck}></Route>
        <Route path="/404error" component={UserNotFound}></Route>
        <Route exact path="/:username">
          <DummyCmp type="type1" />
        </Route>
        <Route exact path="/:username/:invoiceId">
          <DummyCmp type="type2" />
        </Route>
      </Switch>


    </div>
  )
};
export default App
