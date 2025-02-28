import { useParams } from "react-router-dom";
import Header from "../../header/header";
import "./detailSpeciality.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { useEffect, useState } from "react";
import {
  getSpecialityByid,
  selectDetailSpeciality,
} from "../../../../redux/reducer/reducer-speciality";
import IntroDoctor from "../title2/introDoctor";
import CalenderDocTor from "../title2/calenderDoctor";
import { IchildSchedualAllcodes } from "../../../../constants/interface";
import { fetchModalsDoctor } from "../../../../redux/reducer/reducer-excuteUser";
import ModalDoctor from "../title2/modal-doctor";
import InforCalender from "../title2/inforCalender";
import DivideDoctorViaProvice from "./divideDoctortoProvince";
const DetailSpeciality = () => {
  const { id } = useParams<{ id: string }>();
  const dispath = useAppDispatch();
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const selectedSpeciality = useAppSelector(selectDetailSpeciality);
  const [dataItem, setDataItem] = useState<IchildSchedualAllcodes>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handlerOnclick = (item: IchildSchedualAllcodes) => {
    setDataItem(item);
    dispath(fetchModalsDoctor(item.doctorId));
    setIsShowModal(!isShowModal);
  };
  const handlerChangeProvice = (province: any) => {
    setSelectedProvince(province);
  };
  const [click, setClick] = useState<boolean>(false);
  useEffect(() => {
    dispath(getSpecialityByid(id));
  }, [id]);
  return (
    <>
      <>
        <div className="detail-container">
          <div className="detail-header">
            <Header />
          </div>
          <div className={click ? "detail-banner click" : "detail-banner"}>
            <div className="detail-content-up"></div>
            <div className="content-bot">
              <div
                className="bot-img"
                style={{
                  backgroundImage: `
                      linear-gradient(
                        rgba(255, 255, 255, 0.8),
                        rgba(255, 255, 255, 0.898),
                        rgb(255, 255, 255)
                      ),
                      url(${selectedSpeciality?.data.image})
                    `,
                }}
              ></div>
              <div
                className="content-html"
                dangerouslySetInnerHTML={{
                  __html: `${selectedSpeciality?.data.contentHtml}`,
                }}
              ></div>
            </div>
          </div>
          <div className="detail-list" onClick={() => setClick(!click)}>
            {click ? "Ẩn Bớt" : "  Xem Thêm"}
          </div>
          <div className="detail-manner">
            <div className="manner-child1">
              <DivideDoctorViaProvice
                handlerChangeProvice={handlerChangeProvice}
              />
            </div>
            <div className="list-doctor">
              {selectedSpeciality &&
                selectedSpeciality.data &&
                selectedSpeciality.data.specialityDoctor &&
                selectedSpeciality.data.specialityDoctor.length > 0 &&
                selectedSpeciality.data.specialityDoctor.map((item, index) => {
                  if (
                    item?.provinceId == selectedProvince ||
                    !selectedProvince
                  ) {
                    return (
                      <>
                        <div className="detail-child mt-4" key={index}>
                          <div className="child-left">
                            <div className="intro">
                              <IntroDoctor
                                infor={item?.doctorInfor?.image}
                                htmlIntro={
                                  item?.doctorInfor?.userMarkdown
                                    ?.contentIntroHtml
                                }
                                id={item?.doctorInfor.id}
                              />
                            </div>
                          </div>
                          <div className="child-right">
                            <div className="right-up">
                              <CalenderDocTor
                                id={item?.doctorInfor.id}
                                handlerOnclick={handlerOnclick}
                              />
                            </div>
                            <div className="right-bot">
                              <InforCalender id={item?.doctorInfor.id} />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </>
      <>
        <ModalDoctor
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          dataItem={dataItem}
          // id={id}
        />
      </>
    </>
  );
};
export default DetailSpeciality;
