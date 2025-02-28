import { FaLocationDot } from "react-icons/fa6";
import "./introDoctor.scss";
import { useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { languages } from "../../../../constants/languages";
import { Buffer } from "buffer";
import { selectInforDoctor } from "../../../../redux/reducer/reducer-excuteUser";
import { useEffect, useState } from "react";
import servicesSystem from "../../../../services/system";
import {
  IallCodeData,
  IdataDetailDoctor,
  IinforDoctor,
} from "../../../../constants/interface";
interface IinforDoctorCalender {
  infor?: any;
  htmlIntro?: any;
  id?: any;
}
const IntroDoctor = ({ infor, htmlIntro, id }: IinforDoctorCalender) => {
  const language = useAppSelector(selectLanguage);
  const [inforDoctor, SetInforDoctor] =
    useState<IdataDetailDoctor<IinforDoctor<IallCodeData>>>();
  const hanldeFetchInforById = async () => {
    const response = await servicesSystem.fetchInforDoctor(id);
    SetInforDoctor(response);
  };
  useEffect(() => {
    hanldeFetchInforById();
  }, [id]);
  return (
    <>
      <div className="intro-container">
        {" "}
        <div className="content-left">
          <div
            className="detail-img"
            style={
              infor
                ? {
                    backgroundImage: `url(${Buffer.from(infor).toString(
                      "binary"
                    )}
                    )`,
                  }
                : { display: "none" }
            }
          ></div>
        </div>
        <div className="content-right">
          <div dangerouslySetInnerHTML={{ __html: `${htmlIntro}` }}></div>
          <div className="r-bottom">
            <span>
              <FaLocationDot />
            </span>
            {language == languages.vi
              ? inforDoctor?.data?.provice?.valueVi
              : inforDoctor?.data?.provice?.valueEn}
          </div>
        </div>
      </div>
    </>
  );
};
export default IntroDoctor;
