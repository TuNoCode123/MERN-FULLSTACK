import {
  IallCode,
  IallCode1,
  IallCodeData,
  IallCodeData1,
  Ispeciality1,
  Iuser,
} from "../constants/interface";
import _ from "lodash";
import { typeDoctorInfor } from "../constants/path";
import { languages } from "../constants/languages";
export interface Ioptions {
  value: number | undefined;
  label: string | undefined;
}
export const cloneToRenderList = (
  listDoctor: Partial<Iuser<IallCodeData>[]> | undefined
): Ioptions[] | undefined => {
  if (!listDoctor) return;
  const options: Ioptions[] = [];
  const cloneListDoctor = _.cloneDeep(listDoctor);
  cloneListDoctor.map((item, index) => {
    const tmp = { value: item?.id, label: item?.email };
    options.push(tmp);
  });
  return options;
};
export const ParSerToDataSelect = (
  types?: IallCode<IallCodeData> | null,
  typeData?: string,
  language?: string,
  types1?: IallCode<IallCodeData1>
): { value: any; label: string | undefined }[] | undefined => {
  const results: {
    value: string | undefined | number;
    label: string | undefined;
  }[] = [];
  if (typeData == typeDoctorInfor.PRICE) {
    types?.data.map((item, index) => {
      let tmp: { value: string | undefined; label: string | undefined } = {
        value: "",
        label: "",
      };
      tmp.label =
        language == languages.vi ? item.valueVi : `${item.valueEn} USD`;
      tmp.value = item.keyMap;
      results.push(tmp);
    });
  } else if (typeData == typeDoctorInfor.SPECIALITY) {
    types?.data.map((item, index) => {
      let tmp: { value: number | undefined; label: string | undefined } = {
        value: -1,
        label: "",
      };
      tmp.label = item.nameSpeciality;
      tmp.value = item?.id;
      results.push(tmp);
    });
  } else if (typeData == typeDoctorInfor.CLINIC) {
    types1?.data.map((item, index) => {
      let tmp: { value: number | undefined; label: string | undefined } = {
        value: -1,
        label: "",
      };
      tmp.label = item.nameClinic;
      tmp.value = item?.id;
      results.push(tmp);
    });
  } else {
    types?.data.map((item, index) => {
      let tmp: { value: string | undefined; label: string | undefined } = {
        value: "",
        label: "",
      };
      tmp.label = language == languages.vi ? item.valueVi : item.valueEn;
      tmp.value = item.keyMap;
      results.push(tmp);
    });
  }
  return results;
};
export interface Idate {
  th: number;
  dd: string;
  mm: string;
  yyyy: number;
}
export const dmy = (): Idate => {
  let date = new Date();
  let th = date.getDay();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  return {
    th,
    dd,
    mm,
    yyyy,
  };
};
