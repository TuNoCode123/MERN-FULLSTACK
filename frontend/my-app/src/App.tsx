import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/login";
import { PATH } from "./constants/path";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/home";
import { useAppSelector } from "./redux/hook";
import { selectIsLogin, selectLanguage } from "./redux/reducer/reducer-login";
import System from "./components/systems/system";
import Doctor from "./components/systems/doctor";
import ManageUser from "./components/systems/manage-user";
import "react-markdown-editor-lite/lib/index.css";
import DetailDoctor from "./components/home/main/title2/detailDoctor";
import SchedualDoctor from "./components/systems/schedual-doctor/schedual-doctor";
import "react-datepicker/dist/react-datepicker.css";
import VerifyBooking from "./components/home/main/title2/verifyBooking";
import ManageSpeciality from "./components/systems/speciality/manageSpeciality";
import DetailSpeciality from "./components/home/main/speciality/detailSpeciality";
import "react-responsive-modal/styles.css";
import PatientSchedualManage from "./components/systems/schedual-doctor/patentSchedualManage";
import ManageClinic from "./components/systems/clinic/manageClinic";
import DetailClinic from "./components/home/main/clinic/detailClinic";
import Payment from "./components/home/main/title2/payment";
import CompleteOrder from "./components/home/main/title2/completeOrder";
import CencalPayment from "./components/home/main/title2/cancelOrder";
import Chat from "./components/pages/chat/chat";
import "@chatui/core/dist/index.css";
function App() {
  const isLogin = useAppSelector(selectIsLogin);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.Login} element={<Login />} />
          <Route path={PATH.Home} element={<Home />} />
          <Route path={PATH.chat} element={!isLogin ? <Login /> : <Chat />} />
          <Route path={`${PATH.detailDoctor}/:id`} element={<DetailDoctor />} />
          <Route path={PATH.invoice} element={<Payment />} />
          <Route path={PATH.detailSpeciality} element={<DetailSpeciality />} />
          <Route path={PATH.detailClinic} element={<DetailClinic />} />
          <Route path={PATH.verify} element={<VerifyBooking />} />
          <Route path={PATH.complete} element={<CompleteOrder />} />
          <Route path={PATH.cancel} element={<CencalPayment />} />

          <Route path={PATH.System} element={<System />}>
            <Route index path={PATH.user} element={<ManageUser />} />
            <Route path={PATH.doctor} element={<Doctor />} />
            <Route path={PATH.admin} element={<Doctor />} />
            <Route path={PATH.schedua_doctor} element={<SchedualDoctor />} />
            <Route
              path={PATH.manageSpeciality}
              element={<ManageSpeciality />}
            />

            <Route path={PATH.clinic} element={<ManageClinic />} />
            <Route
              path={PATH.patientSchedualManage}
              element={<PatientSchedualManage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        // transition: {Bounce},
      />
    </>
  );
}

export default App;
