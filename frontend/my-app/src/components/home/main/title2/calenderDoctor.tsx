import { FaCalendarAlt } from "react-icons/fa";
import { TbHandFinger } from "react-icons/tb";
import Select from "react-select";
import { WEEKDAYS_EN, WEEKDAYS_VI } from "../../../../constants/path";
import { languages } from "../../../../constants/languages";
import { IselectSchedual } from "./detailDoctor";
import { dmy } from "../../../../util/cloneObject";
import { useAppSelector } from "../../../../redux/hook";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { useEffect, useState } from "react";
import servicesSystem from "../../../../services/system";
import "./calenderDoctor.scss";
import {
  IallCode2,
  IchildSchedualAllcodes,
} from "../../../../constants/interface";
interface Icalender {
  id?: string | undefined;
  handlerOnclick: (item: IchildSchedualAllcodes) => void;
}
const CalenderDocTor = ({ id, handlerOnclick }: Icalender) => {
  const language = useAppSelector(selectLanguage);
  const [dates, setDates] = useState<IallCode2<IchildSchedualAllcodes>>();
  const { th, dd, mm, yyyy } = dmy();
  const [selectedOption, setSelectedOption] = useState<IselectSchedual | null>({
    label:
      language == languages.vi
        ? `${WEEKDAYS_VI[th]} - ${dd}/${mm}`
        : `${WEEKDAYS_EN[th]} - ${dd}/${mm}`,
    value: dd + "/" + mm + "/" + yyyy,
  });
  const [options, setOptions] = useState<IselectSchedual[]>();
  const hanlderChangeOptions = async (option: IselectSchedual | null) => {
    const res = await servicesSystem.getAllSchedualOfday(id, option?.value);
    console.log(id, option);
    setDates(res);
    setSelectedOption(option);
  };
  const fireFirst = async () => {
    const res = await servicesSystem.getAllSchedualOfday(
      id,
      selectedOption?.value
    );
    setDates(res);
  };
  useEffect(() => {
    let date = new Date();
    const dataDate: IselectSchedual[] = [];
    for (let i = 0; i < 7; ++i) {
      const tmp = {
        label: "",
        value: "",
      };
      let th = date.getDay();
      let dd = String(date.getDate()).padStart(2, "0");
      let mm = String(date.getMonth() + 1).padStart(2, "0");
      tmp.label =
        language == languages.vi
          ? `${WEEKDAYS_VI[th]} - ${dd}/${mm}`
          : `${WEEKDAYS_EN[th]} - ${dd}/${mm}`;
      let yyyy = date.getFullYear();
      tmp.value = dd + "/" + mm + "/" + yyyy;
      dataDate.push(tmp);
      date.setDate(date.getDate() + 1);
    }

    setOptions(dataDate);
    fireFirst();
  }, [id, language]);
  return (
    <>
      <div className="calender-container">
        <div className="c-select">
          <Select
            defaultValue={selectedOption}
            onChange={hanlderChangeOptions}
            options={options}
          />
        </div>
        <div className="c-t">
          <div>
            <FaCalendarAlt />
          </div>
          <div className="t1">LỊCH KHÁM</div>
        </div>
        <div className="c-list-date">
          {dates && dates.data.length > 0 ? (
            dates.data.map((item, index) => {
              return (
                <>
                  <div className="child" onClick={() => handlerOnclick(item)}>
                    {item.schedualAllcodes.valueVi}
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div className="c-child">
                Hiện không có lịch, Vui lòng đợi bác sĩ thêm lịch !!!!
              </div>
            </>
          )}
        </div>
        <div className="c-t2">
          Chọn{" "}
          <span>
            <TbHandFinger />
          </span>{" "}
          và đặt Phí đặt lịch 0đ
        </div>
      </div>
    </>
  );
};
export default CalenderDocTor;
