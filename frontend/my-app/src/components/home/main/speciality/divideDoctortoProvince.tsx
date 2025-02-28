import { useSelector } from "react-redux";
import "./divideDoctor.scss";
import { useEffect, useState } from "react";
import servicesSystem from "../../../../services/system";
import { typeDoctorInfor } from "../../../../constants/path";
import { IallCode, IallCodeData } from "../../../../constants/interface";
import { ParSerToDataSelect } from "../../../../util/cloneObject";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import Select, { SingleValue } from "react-select";
import { useSearchParams } from "react-router-dom";
const DivideDoctorViaProvice = ({
  handlerChangeProvice,
}: {
  handlerChangeProvice: (province: any) => void;
}) => {
  const [listProvince, setListProvice] = useState<
    | {
        value: any;
        label: string | undefined;
      }[]
    | undefined
  >();
  const [selected, setSelected] = useState<{
    value: any;
    label: string | undefined;
  } | null>();
  const language = useSelector(selectLanguage);
  const getProvice = async () => {
    const res = await servicesSystem.getUserViaType(typeDoctorInfor.PROVINCE);
    const tmp = ParSerToDataSelect(res, typeDoctorInfor.PROVINCE, language);
    setListProvice(tmp);
  };
  const hanlderChangeSelect = (option: { value: any; label: any } | null) => {
    handlerChangeProvice(option?.value);
    setSelected(option);
  };
  useEffect(() => {
    getProvice();
  }, [language]);

  return (
    <div className="divide-container">
      <Select
        value={selected}
        placeholder="Select Provice ...."
        onChange={hanlderChangeSelect}
        options={listProvince}
      />
    </div>
  );
};
export default DivideDoctorViaProvice;
