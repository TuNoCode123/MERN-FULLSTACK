import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { Buffer } from "buffer";
import "./modal.scss";
import { useAppSelector } from "../../../../redux/hook";
import { selectModalDoctor } from "../../../../redux/reducer/reducer-excuteUser";
import { IchildSchedualAllcodes } from "../../../../constants/interface";
import {
  selectIsLogin,
  selectLanguage,
} from "../../../../redux/reducer/reducer-login";
import { languages } from "../../../../constants/languages";
import { Modal } from "react-responsive-modal";
import { WEEKDAYS_EN, WEEKDAYS_VI } from "../../../../constants/path";
import BodyModal, { Ibooking, IdataBookng, User } from "./bodyModal";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { servicePatient } from "../../../../services/patient";
interface Imodal {
  isShowModal: boolean;
  setIsShowModal: any;
  dataItem: IchildSchedualAllcodes | undefined;
}

const arr = [
  "email",
  "firstName",
  "lastName",
  "gender",
  "phoneNumber",
  "address",
  "genderName",
];
function ModalDoctor({ isShowModal, setIsShowModal, dataItem }: Imodal) {
  const nav = useNavigate();
  const isLoggin = useAppSelector(selectIsLogin);
  const handleClose = () => {
    setIsShowModal(false);
  };
  const language = useAppSelector(selectLanguage);
  const infor = useAppSelector(selectModalDoctor);
  const handlerSubmit = async (data?: User) => {
    const tmp: Ibooking = {
      doctorId: dataItem?.doctorId,
      timeType: dataItem?.schedualAllcodes.keyMap,
      date: dataItem?.date,
    };
    if (!data) {
      return;
    }
    const {
      email,
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      genderName,
    } = data;
    if (
      !email ||
      !firstName ||
      !lastName ||
      !gender ||
      !phoneNumber ||
      !address ||
      !genderName
    ) {
      toast.error("missing imput");
      return;
    }
    const time =
      language == languages.vi
        ? dataItem?.schedualAllcodes.valueVi
        : dataItem?.schedualAllcodes.valueEn;
    const dataInput: IdataBookng = {
      ...data,
      inforDoctor: {
        id: infor?.data.id,
        fullName: `${infor?.data.firstName} ${infor?.data.lastName}`,
        position:
          language == languages.vi
            ? infor?.data.position.valueVi
            : infor?.data.position.valueEn,
      },
      calender: {
        time: `${time} - ${buidWeesDay()} - ${dataItem?.date}`,
      },
      inforBooking: tmp,
      language: language,
    };
    const res = await servicePatient(dataInput);
    if (res.errCode == 0) {
      toast.success(res.message);
      setIsShowModal(false);
      return;
    }
    if (res.errCode == 1) {
      toast.error(res.message);
      // setIsShowModal(false);
      return;
    }
  };
  const buidWeesDay = () => {
    if (!dataItem) return;
    const [day, month, year] = dataItem.date.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = date.getDay();
    return language == languages.vi
      ? WEEKDAYS_VI[dayOfWeek]
      : WEEKDAYS_EN[dayOfWeek];
  };

  return (
    <>
      <Modal open={isShowModal} onClose={handleClose}>
        <div className="titler-header">
          <div className="th">
            <div className="th-left">
              <div
                className="th-img"
                style={
                  infor
                    ? {
                        backgroundImage: `url(${Buffer.from(
                          infor.data.image.data,
                          "base64"
                        ).toString("binary")})`,
                      }
                    : { display: "none" }
                }
              ></div>
            </div>
            <div className="th-right">
              <div className="child1">ĐẶT LỊCH KHÁM</div>
              <div className="child2">
                <div className="d-flex gap-2">
                  <span className="c-description">
                    {language == languages.en
                      ? `${infor?.data.position.valueEn}:`
                      : `${infor?.data.position.valueVi}:`}
                  </span>

                  <span className="c-description">
                    {infor?.data.firstName} {infor?.data.lastName}
                  </span>
                </div>
              </div>
              <div className="child3">
                <span>
                  {language == languages.vi
                    ? `${
                        dataItem?.schedualAllcodes.valueVi
                      } - ${buidWeesDay()} - ${dataItem?.date}`
                    : `${
                        dataItem?.schedualAllcodes.valueEn
                      } - ${buidWeesDay()} - ${dataItem?.date}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 title-body">
          <BodyModal handlerSubmit={handlerSubmit} />
        </div>
        <div className="mt-2 title-close">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ModalDoctor;
