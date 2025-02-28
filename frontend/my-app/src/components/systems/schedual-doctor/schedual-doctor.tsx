import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  fetchAllDoctorSystem,
  selectListDoctorSystem,
} from "../../../redux/reducer/reducer-excuteUser";
import Select, { SingleValue } from "react-select";
import "./schedual-doctor.scss";
import { Ioptions, cloneToRenderList } from "../../../util/cloneObject";
import Calendar from "react-datepicker/dist/calendar";
import Calender from "../../../util/datePicker";
import momentParser from "../../../util/moment";
import servicesSystem from "../../../services/system";
import { allcode } from "../../../constants/path";
import { IallCode, IallCodeData } from "../../../constants/interface";
import { selectLanguage } from "../../../redux/reducer/reducer-login";
import { languages } from "../../../constants/languages";
import _ from "lodash";
import { toast } from "react-toastify";
export interface Ischdual {
  date?: string;
  timeType?: string;
  doctorId?: number;
}
export interface IdataSchedual<T> {
  data: T[];
}
const SchedualDoctor = () => {
  const [selectedOption, setSelectedOption] = useState<Ioptions | null>();
  const listDoctor = useAppSelector(selectListDoctorSystem);
  const [startDate, setStartDate] = useState(new Date());
  const [listTime, setListTime] = useState<IallCode<IallCodeData>>();
  const language = useAppSelector(selectLanguage);
  const hanldeChangeOptions = (option: Ioptions | null) => {
    setSelectedOption(option);
  };
  const dispath = useAppDispatch();
  const options =
    listDoctor && listDoctor.rows.length > 0
      ? cloneToRenderList(listDoctor.rows)
      : [{ value: -1, label: "" }];

  const fetchTimeDoctor = async () => {
    const res = await servicesSystem.getUserViaType(allcode.time);
    if (res) {
      const newRes = res.data.map((item, data) => {
        item.isSelected = false;
        return item;
      });
      setListTime({
        errCode: res.errCode,
        message: res.message,
        data: newRes,
      });
    }
  };
  const handleClickTimer = (time: IallCodeData) => {
    if (!listTime) return;
    const clone = _.cloneDeep(listTime);
    const findChoseTime = clone?.data.find((item) => item.id == time.id);
    if (!findChoseTime) return;
    if (findChoseTime.isSelected) {
      findChoseTime.isSelected = false;
    } else {
      findChoseTime.isSelected = true;
    }
    const index = clone?.data.findIndex((item) => item.id == time.id);
    clone.data[index] = findChoseTime;
    setListTime(clone);
  };
  const hanldeSubmit = async () => {
    if (!selectedOption) {
      toast.error(`you don't chose any doctor`);
      return;
    }
    if (!listTime) return;
    const data: Ischdual[] = [];
    const clone = _.cloneDeep(listTime?.data);
    const schedualData = clone.map((item, index) => {
      const tmp: Ischdual = {};
      if (item.isSelected == true) {
        tmp.timeType = item.keyMap;
        tmp.doctorId = selectedOption?.value;
        tmp.date = momentParser(startDate);
        data.push(tmp);
      }
    });
    console.log(data);
    // const dataSchedual: IdataSchedual<Ischdual> = {
    //   data: [...data],
    // };
    const res = await servicesSystem.createBulkSchedual(data);
    if (res.errCode == 0) {
      toast.success(res.message);
      return;
    }
    if ((res.errCode = 1)) {
      toast.error(res.message);
      return;
    }
    // console.log(selectedOption?.value, momentParser(startDate), listTime);
  };
  useEffect(() => {
    dispath(fetchAllDoctorSystem());
    fetchTimeDoctor();
  }, []);
  return (
    <div className="schedual-container">
      <div className="s-header">
        <div className="s-list">
          <Select
            value={selectedOption}
            placeholder="Select Doctor ...."
            onChange={hanldeChangeOptions}
            options={options}
          />
        </div>
        <div className="s-calendar">
          <Calender startDate={startDate} setStartDate={setStartDate} />
        </div>
      </div>
      <div className="s-time">
        {listTime &&
          listTime.data.length > 0 &&
          listTime.data.map((item, index) => {
            return (
              <>
                <div
                  className={
                    item.isSelected ? "child-time selected" : "child-time"
                  }
                  key={index}
                  onClick={() => handleClickTimer(item)}
                >
                  {language == languages.vi ? item.valueVi : item.valueEn}
                </div>
              </>
            );
          })}
      </div>
      <button className="btn btn-primary" onClick={hanldeSubmit}>
        Submit
      </button>
    </div>
  );
};
export default SchedualDoctor;
