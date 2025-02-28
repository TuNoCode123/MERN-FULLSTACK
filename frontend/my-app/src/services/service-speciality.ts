import instance from "../config/axios";
import {
  IallCode1,
  IdataDetailDoctor,
  IinforDoctor,
  Ispeciality1,
} from "../constants/interface";
class ServiceSpeciality {
  static getSpecialityById = (
    id: any
  ): Promise<IdataDetailDoctor<Ispeciality1>> => {
    return instance.get(`get-speciality-byId?id=${id}`);
  };
  static getAllDoctorViaSpecialityId = (
    id: any
  ): Promise<IallCode1<IinforDoctor<any>>> => {
    return instance.get(`get-All-Doctor-byId?id=${id}`);
  };
  static actionsSpeciality = (data: any): Promise<IallCode1<number>> => {
    const form = new FormData();
    if (data.contentHtml) form.append("contentHtml", data.contentHtml);
    if (data.contentText) form.append("contentText", data.contentText);
    if (data.id) form.append("id", data.id);
    if (data.name) form.append("nameSpeciality", data.name);
    if (data.action) form.append("action", data.action);
    if (data.images) form.append("images", data.images);
    return instance.post(`actions-speciality`, form);
  };
}
export default ServiceSpeciality;
