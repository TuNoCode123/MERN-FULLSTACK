import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/login";
import { PATH } from "./constants/path";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/home";
import { useAppSelector } from "./redux/hook";
import { selectLanguage } from "./redux/reducer/reducer-login";
import System from "./components/systems/system";
import Doctor from "./components/systems/doctor";
import ManageUser from "./components/systems/manage-user";
import "react-markdown-editor-lite/lib/index.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.Login} element={<Login />} />
          <Route path={PATH.Home} element={<Home />} />
          <Route path={PATH.System} element={<System />}>
            <Route index path={PATH.user} element={<ManageUser />} />
            <Route path={PATH.doctor} element={<Doctor />} />
            <Route path={PATH.admin} element={<Doctor />} />
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
