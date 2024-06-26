import { useEffect, useState } from "react";
import InterfaceD from "./interfaceDoctor";
import Interface from "./interfaceUser";
import "./login.scss";
import Input from "./input";
const Login = () => {
  const [touch, setTouch] = useState(true);
  const [click, setClick] = useState(true);
  return (
    <div className="overview">
      <div className="container">
        <div className="choose">Choose Account Type</div>
        <div className="interface d-flex justify-content-evenly gap-2 mt-2">
          <div className="patient ">
            <InterfaceD touch={touch} setTouch={setTouch} />
          </div>
          <div className="doctor">
            <Interface touch={touch} setTouch={setTouch} />
          </div>
        </div>
        <div className="guild mt-2">
          {!touch ? (
            <>
              <span className="mx-auto">Hello Doctor!</span>
              <span className="mx-auto">
                Please fill out the form below to get started
              </span>
            </>
          ) : (
            <>
              <span className="mx-auto">Hello Patient!</span>
              <span className="mx-auto">
                Please fill out the form below to get started
              </span>
            </>
          )}
        </div>
        <div className="form-login">
          <Input click={click} setClick={setClick} />
        </div>
        <div className="p-other"></div>
      </div>
    </div>
  );
};
export default Login;
