import { useEffect, useState } from "react";
import Header from "../../header/header";
import "./detailDoctor.scss";
import { useParams } from "react-router-dom";
import servicesSystem from "../../../../services/system";
import {
  IchildSchedualAllcodes,
  IdataDetailDoctor,
  Imarkdown,
  Iuser,
} from "../../../../constants/interface";

import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import {
  fetchModalsDoctor,
  getInforDoctor,
  selectInforDoctor,
} from "../../../../redux/reducer/reducer-excuteUser";
import ModalDoctor from "./modal-doctor";
import CalenderDocTor from "./calenderDoctor";
import InforCalender from "./inforCalender";
import IntroDoctor from "./introDoctor";
export interface IselectSchedual {
  value: string;
  label: string;
}

const DetailDoctor = () => {
  const { id } = useParams<{ id: string }>();
  const language = useAppSelector(selectLanguage);
  const dispath = useAppDispatch();
  const [infor, setInfor] = useState<IdataDetailDoctor<Iuser<Imarkdown>>>();
  const [html, setHtml] = useState<any>();
  const [htmlIntro, setHtmlIntro] = useState<any>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const getDetailDoctor = async () => {
    const res = await servicesSystem.fetchDetailDoctor(id);
    setInfor(res);
    setHtml(res.data.userMarkdown?.contentHtml);
    setHtmlIntro(res.data.userMarkdown?.contentIntroHtml);
  };
  const [dataItem, setDataItem] = useState<IchildSchedualAllcodes>();
  useEffect(() => {
    if (!id) return;
    dispath(getInforDoctor(id));
  }, [id]);
  useEffect(() => {
    getDetailDoctor();
  }, [id, language]);
  const handlerOnclick = (item: IchildSchedualAllcodes) => {
    setDataItem(item);
    dispath(fetchModalsDoctor(item.doctorId));
    setIsShowModal(!isShowModal);
  };
  return (
    <>
      <div className="deltail-doctor-container">
        <div className="header">
          <Header />
        </div>
        <div className="banner mt-5">
          <div className="intro mt-3">
            <IntroDoctor
              infor={infor?.data.image.data}
              htmlIntro={htmlIntro}
              id={id}
            />
          </div>
          <div className="calendar mt-3">
            <div className="content-left">
              <CalenderDocTor id={id} handlerOnclick={handlerOnclick} />
            </div>
            <div className="content-right">
              <InforCalender id={id} />
            </div>
          </div>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: `${html}` }}
        ></div>
        <div className="set-modal">
          <ModalDoctor
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            dataItem={dataItem}
          />
        </div>
      </div>
    </>
  );
};
export default DetailDoctor;
