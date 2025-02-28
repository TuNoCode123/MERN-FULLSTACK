import instance from "../config/axios";
import {
  IallCode1,
  Iclinic1,
  IdataDetailDoctor,
  IinforDoctor,
  Ispeciality1,
} from "../constants/interface";
class ServiceClinic {
  static getClinicById = (id: any): Promise<IdataDetailDoctor<Iclinic1>> => {
    return instance.get(`get-clinic-by-id?id=${id}`);
  };
  static getAllDoctorViaSpecialityId = (
    id: any
  ): Promise<IallCode1<IinforDoctor<any>>> => {
    return instance.get(`get-All-Doctor-byId?id=${id}`);
  };
  static actionsClinic = (data: any): Promise<IallCode1<number>> => {
    const form = new FormData();
    if (data.contentHtml) form.append("contentHtml", data.contentHtml);
    if (data.contentText) form.append("contentText", data.contentText);
    if (data.id) form.append("id", data.id);
    if (data.nameClinic) form.append("nameClinic", data.nameClinic);
    if (data.action) form.append("action", data.action);
    if (data.images) form.append("images", data.images);
    return instance.post(`actions-clinic`, form);
  };
}
export default ServiceClinic;
