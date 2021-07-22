import React from "react"
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
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (<div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Form} />
      <Route path="/lupaPassword" component={LupaPassword} />
      <Route path="/auth/reset/:tokenid" component={ResetPassword} />
      <Route path="/auth/recover/:tokenid" component={VerifyEmail}></Route>
      <Route path="/Success" component={Success}></Route>
      <Route path="/Expired" component={Expired}></Route>
      <Route path="/gantiPassword" component={ChangePassword}></Route>
      <Route path="/settings" component={Settings}></Route>
      <Route path="/editProfile" component={Editprofile} ></Route>
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
      <Route path="/detailTagihan" component={DetailTagihan}></Route>
    </Switch>

  </div>
  )
};
export default App

// import React from 'react'
// import Login  from './componets/Login/Login';
// import Register from './componets/Register/Register';
// import Lupas from './componets/LupaPassword/Lupas';
// import VerivLupas from './componets/VerivLupas/VerivLupas';
// import Daftar2 from './componets/Daftar2/Daftar2';
// import Dashboard from './componets/Dashboard/Dashboard';
// import Notification from './componets/Notification/Notification';
// import TentangKami from './componets/TentangKami/TentangKami';
// import DigitalWallet from './componets/DigitalWallet/DigitalWallet';
// import EditProfile from './componets/EditProfile/EditProfile';
// import Password from './componets/Password/Password';
// import Share from './componets/Share/Share';
// import NotifToast from './componets/NotifToast/NotifToast';
// import PopupSukses from './componets/PopupSuksesPembayaran/PopupSukses';
// import Tagihan from './componets/Tagihan/Tagihan';
// import DetailTagihan from './componets/DetailTagihan/DetailTagihan';
// import BuatTagihan from './componets/BuatTagihan/BuatTagihan';
// import PopupSuksesTagihan from './componets/PopupSuksesBuatTagihan/PopupSuksesTagihan';
// import PopupSuksesPencairan from './componets/PopupSuksesPencairan/PopupSuksesPencairan';
// import Pencairan from './componets/Pencairan/Pencairan';
// import Transaksi from './componets/Transaksi/Transaksi';
// import ProfileGeneral from './componets/Profile-General/ProfileGeneral';
// import ProfileGeneral2 from './componets/ProfileGeneral2/ProfileGeneral2';
// import ResetPassword from './componets/ResetPassword/ResetPassword';
// import ThanksEmail from './componets/ThanksEmail/ThanksEmail';
// import Success from './componets/Success/Succes';
// import LinkExpired from './componets/LinkExpired/LinkExpired';
// import Settings from './componets/Settings/Settings';
// import {Route,Switch} from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route path="/register" component={Register}/>
//         <Route path="/daftar2" component={Daftar2}/>
//         <Route path="/lupas" component={Lupas}/>
//         <Route path="/password" component={Password}/>
//         <Route path="/verivlupas" component={VerivLupas}/>
//         <Route path="/dashboard" component={Dashboard}/>
//         <Route path="/notification" component={Notification}/>
//         <Route path="/tentangkami" component={TentangKami}/>
//         {/* <Route path="/digitalwallet" component={DigitalWallet}/> */}
//         <Route path="/editprofile" component={EditProfile}/>
//         <Route path="/share" component={Share}/>
//         <Route path="/notiftoast" component={NotifToast}/>
//         <Route path="/popupsukses" component={PopupSukses}/>
//         <Route path="/tagihan" component={Tagihan}/>
//         <Route path="/buattagihan" component={BuatTagihan}/>
//         <Route path="/popupsuksestagihan" component={PopupSuksesTagihan}/>
//         <Route path="/popupsuksespencairan" component={PopupSuksesPencairan}/>
//         <Route path="/pencairan" component={Pencairan}/>
//         <Route path="/transaksi" component={Transaksi}/>
//         <Route path="/profilegeneral" component={ProfileGeneral}/>
//         <Route path="/profilegeneral2" component={ProfileGeneral2}/>
//         <Route path="/resetpassword" component={ResetPassword}/>
//         <Route path="/thanksemail" component={ThanksEmail}/>
//         <Route path="/success" component={Success}/>
//         <Route path="/linkexpired" component={LinkExpired}/>
//         <Route path="/detailtagihan" component={DetailTagihan}/>
//         <Route path="/settings" component={Settings}/>
//       </Switch>
//       {/* <Login /> */}

//     </div>
//   );
// }

// export default App;
