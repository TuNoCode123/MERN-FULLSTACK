import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import {
  login,
  selectIsLogin,
  selectUserInfor,
} from "../../../redux/reducer/reducer-login";
import { useLocation, useNavigate } from "react-router-dom";
const Input = ({
  click,
  setClick,
}: {
  click: boolean;
  setClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>();
  const location = useLocation();
  const [maxtoase, setMaxToast] = useState<number>(1);
  const [passWord, setPassWord] = useState<string>();
  const dispath = useAppDispatch();
  const userInfor = useAppSelector(selectUserInfor);
  const nav = useNavigate();
  const islogin = useAppSelector(selectIsLogin);
  if (islogin && maxtoase == 1) {
    setMaxToast(2);
    if (userInfor?.errCode == 0) {
      toast.success(userInfor?.message);
      nav(`/chat`);
    } else {
      toast.error(userInfor?.message);
    }
  }
  const handlerSubmit = async () => {
    if (email && passWord) {
      dispath(login({ email, passWord }));
      setEmail("");
      setPassWord("");
    }
  };
  return (
    <>
      <div
        className={!click ? "child mt-3 click" : "child mt-3"}
        onClick={() => setClick(false)}
      >
        <div className="icon">
          <MdOutlineEmail />
        </div>
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div
        className={click ? "child mt-2 click" : "child mt-2"}
        onClick={() => setClick(true)}
      >
        <div className="icon">
          <IoMdLock />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="PassWord"
            value={passWord}
            onChange={(event) => setPassWord(event.target.value)}
          />
        </div>
        <div className="forgot">Forgot?</div>
      </div>
      <div className="footer d-flex justify-content-between mt-2 align-items-center">
        <div>
          No account? <a href="#">Singup</a>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handlerSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Input;
