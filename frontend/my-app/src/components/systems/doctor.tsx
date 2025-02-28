import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import Select, { SingleValue } from "react-select";
import "./doctor.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import servicesSystem from "../../services/system";
import {
  fetchAllDoctor,
  fetchAllDoctorSystem,
  selectListDoctor,
  selectListDoctorSystem,
} from "../../redux/reducer/reducer-excuteUser";
import { ParSerToDataSelect, cloneToRenderList } from "../../util/cloneObject";
import { toast } from "react-toastify";
import { CHOSE, typeDoctorInfor } from "../../constants/path";
import { selectLanguage } from "../../redux/reducer/reducer-login";
import { assert } from "console";
import _, { isNull } from "lodash";
import { selectSpeciality } from "../../redux/reducer/reducer-speciality";
export interface Iresponse<T> {
  errCode: number;
  message: string;
  data: T;
  data2: T;
}
export interface IdataMarkDown {
  id: number;
  contentHtml: string;
  contentText: string;
  contentIntroText: string;
  contentIntroHtml: string;
  priceId?: string;
  provinceId?: string;
  paymentId?: string;
  addressClinic?: string;
  nameClinic?: string;
  note?: string;
  doctorId?: number;
  specialityId?: number;
  clinicId?: number;
}
interface IOptions {
  value: number | undefined;
  label: string | undefined;
}
export interface IOptions1 {
  value: string | undefined;
  label: string | undefined;
}
const mdParser = new MarkdownIt();
const Doctor = () => {
  const listDoctor = useAppSelector(selectListDoctorSystem);
  const dispath = useAppDispatch();
  const [contentHtml, setContentHtml] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [contentIntroHtml, setContentIntroHtml] = useState<string>("");
  const [contentIntroText, setContentIntroText] = useState<string>("");
  const [listPrice, setListPrice] = useState<IOptions1[]>();
  const [listProvince, setListProvice] = useState<IOptions1[]>();
  const [listPayment, setListPayment] = useState<IOptions1[]>();
  const [listSpeciality, setListSpeciality] = useState<IOptions[]>();
  const [listClinic, setListClinic] = useState<IOptions[]>();

  const [note, setNote] = useState();
  const [action, setAction] = useState<string>(CHOSE.CREATE);
  const language = useAppSelector(selectLanguage);
  const options =
    listDoctor && listDoctor.rows.length > 0
      ? cloneToRenderList(listDoctor.rows)
      : [{ value: -1, label: "" }];
  const [selectedOption, setSelectedOption] = useState<IOptions | null>();
  const [selectedPrice, setSelectedPrice] = useState<IOptions1 | null>();
  const [selectedProvice, setSelectedProvice] = useState<IOptions1 | null>();
  const [selectedPayment, setSelectedPayment] = useState<IOptions1 | null>();
  const [selectedSpeciality, setSelectedSpeciality] =
    useState<IOptions | null>();
  const [selectedClinic, setSelectedClinic] = useState<IOptions | null>();
  const handleEditorChange = ({ html, text }: { html: any; text: any }) => {
    setContentHtml(html);
    setContentText(text);
  };
  const getInforDoctor = async () => {
    const res = servicesSystem.getUserViaType(typeDoctorInfor.PRICE);
    const res1 = servicesSystem.getUserViaType(typeDoctorInfor.PAYMENT);
    const res2 = servicesSystem.getUserViaType(typeDoctorInfor.PROVINCE);
    const res3 = servicesSystem.fetchAllSpeciality();
    const res4 = servicesSystem.fetchAllCinic();
    const listData = await Promise.all([res, res1, res2, res3, res4]);

    const tmp = ParSerToDataSelect(
      listData[0],
      typeDoctorInfor.PRICE,
      language
    );
    const tmp1 = ParSerToDataSelect(
      listData[1],
      typeDoctorInfor.PAYMENT,
      language
    );
    const tmp2 = ParSerToDataSelect(
      listData[2],
      typeDoctorInfor.PROVINCE,
      language
    );
    const tmp3 = ParSerToDataSelect(
      listData[3],
      typeDoctorInfor.SPECIALITY,
      language
    );
    const tmp4 = ParSerToDataSelect(
      null,
      typeDoctorInfor.CLINIC,
      language,
      listData[4]
    );
    console.log(tmp4);
    setListPrice(tmp);
    setListPayment(tmp1);
    setListProvice(tmp2);
    setListSpeciality(tmp3);
    setListClinic(tmp4);
  };
  console.log(listClinic);
  const handleEditorChangeIntro = ({
    html,
    text,
  }: {
    html: any;
    text: any;
  }) => {
    setContentIntroHtml(html);
    setContentIntroText(text);
  };
  const hanldeChangeOptions = async (option: IOptions | null) => {
    const rs = await servicesSystem.isExistMarkdown(option?.value);
    if (!rs.data) {
      setAction(CHOSE.CREATE);
      setContentText("");
      setContentIntroText("");
    } else {
      setAction(CHOSE.EDIT);
      setContentText(rs.data.contentText);
      setContentIntroText(rs.data.contentIntroText);
      setContentHtml(rs.data.contentHtml);
      setContentIntroHtml(rs.data.contentIntroHtml);
      const clone1 = _.cloneDeep(listPrice);
      const price = clone1?.find((item) => item.value == rs.data2?.priceId);
      const clone2 = _.cloneDeep(listProvince);
      const provice = clone2?.find(
        (item) => item.value == rs.data2?.provinceId
      );
      const clone3 = _.cloneDeep(listPayment);
      const payment = clone3?.find((item) => item.value == rs.data2?.paymentId);

      const clone4 = _.cloneDeep(listSpeciality);
      const sepciality = clone4?.find(
        (item) => item.value == rs.data2?.specialityId
      );
      const clone5 = _.cloneDeep(listClinic);
      const clinic = clone5?.find((item) => item.value == rs.data2?.clinicId);
      setSelectedPrice(price);
      setSelectedPayment(payment);
      setSelectedProvice(provice);
      setSelectedSpeciality(sepciality);
      setSelectedClinic(clinic);
    }
    setSelectedOption(option);
  };
  const hanlderChangeInfor = async (
    option: IOptions1 | null,
    typeSelect: { name?: string }
  ) => {
    const name = typeSelect.name;
    if (name == typeDoctorInfor.PAYMENT) {
      setSelectedPayment(option);
    }
    if (name == typeDoctorInfor.PRICE) {
      setSelectedPrice(option);
    }
    if (name == typeDoctorInfor.PROVINCE) {
      setSelectedProvice(option);
    }
    if (name == typeDoctorInfor.PROVINCE) {
      setSelectedProvice(option);
    }
  };
  const hanlderChangeInforSpeciality = async (option: IOptions | null) => {
    console.log(option);
    setSelectedSpeciality(option);
  };
  const hanlderChangeInforClinic = async (option: IOptions | null) => {
    console.log(option);
    setSelectedClinic(option);
  };
  const handleSubmitAddInforDoctor = async () => {
    const dataInfor = {
      priceId: selectedPrice?.value,
      provinceId: selectedProvice?.value,
      paymentId: selectedPayment?.value,
      doctorId: selectedOption?.value,
      specialityId: selectedSpeciality?.value,
      clinicId: selectedClinic?.value,
    };
    const response = await servicesSystem.createInfoDoctor({
      contentHtml,
      contentText,
      doctorId: selectedOption?.value,
      contentIntroText,
      contentIntroHtml,
      action,
      dataInfor,
    });
    if (response.errCode == 0) {
      toast.success(response.message);
      setContentHtml("");
      setContentText("");
      setContentIntroText("");
      setSelectedOption(null);
      setAction(CHOSE.CREATE);
      setSelectedPayment(null);
      setSelectedProvice(null);
      setSelectedPrice(null);
      setSelectedSpeciality(null);
      setSelectedClinic(null);
    }
  };
  useEffect(() => {
    if (!selectedOption) return;
    hanldeChangeOptions(selectedOption);
  }, [listPrice]);
  useEffect(() => {
    dispath(fetchAllDoctorSystem());
    getInforDoctor();
  }, [language]);
  return (
    <>
      <div className="d-container">
        <div className="d-tittle">Create Information Doctor</div>
        <div className="d-content">
          <div className="d-content-left">
            <Select
              value={selectedOption}
              placeholder="Select Doctor ...."
              onChange={hanldeChangeOptions}
              options={options}
            />
          </div>
          <div className="d-content-right">
            <MdEditor
              style={{ height: "200px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChangeIntro}
              value={contentIntroText}
            />
          </div>
        </div>
        <div className="d-content-infor row">
          <div className="infor-child1 col-4">
            {" "}
            <Select
              value={selectedPrice}
              placeholder="Select PRICE ...."
              onChange={hanlderChangeInfor}
              options={listPrice}
              name={typeDoctorInfor.PRICE}
            />
          </div>
          <div className="infor-child2 col-4">
            {" "}
            <Select
              value={selectedPayment}
              placeholder="Select PAYMENT ...."
              onChange={hanlderChangeInfor}
              options={listPayment}
              name={typeDoctorInfor.PAYMENT}
            />
          </div>
          <div className="infor-child3 col-4">
            {" "}
            <Select
              value={selectedProvice}
              placeholder="Select PROVINCE ...."
              onChange={hanlderChangeInfor}
              options={listProvince}
              name={typeDoctorInfor.PROVINCE}
            />
          </div>
          <div className="infor-child4 col-4 mt-3">
            <Select
              value={selectedSpeciality}
              placeholder="Select SPECIALITY ...."
              onChange={hanlderChangeInforSpeciality}
              options={listSpeciality}
              name={typeDoctorInfor.SPECIALITY}
            />
          </div>
          <div className="infor-child5 col-4 mt-3">
            <Select
              value={selectedClinic}
              placeholder="Select Clinic ...."
              onChange={hanlderChangeInforClinic}
              options={listClinic}
            />
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={contentText}
        />
        {action == CHOSE.CREATE ? (
          <>
            {" "}
            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={handleSubmitAddInforDoctor}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              className="btn btn-success mt-3 mb-3"
              onClick={handleSubmitAddInforDoctor}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default Doctor;
