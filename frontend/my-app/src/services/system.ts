import { asSafePromise } from "@reduxjs/toolkit/dist/tsHelpers";
import { IdataMarkDown, Iresponse } from "../components/systems/doctor";
import {
  IdataSchedual,
  Ischdual,
} from "../components/systems/schedual-doctor/schedual-doctor";
import { Ispeciality } from "../components/systems/speciality/manageSpeciality";
import instance from "../config/axios";
import {
  IallCode,
  IallCode1,
  IallCode2,
  IallCodeData,
  IchildSchedualAllcodes,
  Iclinic1,
  IdataDetailDoctor,
  IinforDoctor,
  Imarkdown,
  Ispeciality1,
  Iuser,
} from "../constants/interface";
import {
  CounterState,
  IlistPatient,
  iResponseDoctor,
} from "../redux/reducer/reducer-excuteUser";
import { promises } from "dns";
import { Iclinic } from "../components/systems/clinic/manageClinic";

class servicesSystem {
  getUserViaType = async (
    type: string
  ): Promise<IallCode<IallCodeData> | undefined> => {
    try {
      return await instance.post(`allcode?type=${type}`);
    } catch (error) {}
  };
  getAllUser = async (): Promise<Partial<CounterState>> => {
    try {
      return await instance.get("findAll-user");
    } catch (error) {
      return {};
    }
  };
  createUswer = async (
    user: Partial<Iuser<string>>
  ): Promise<IallCode1<number>> => {
    try {
      const form = new FormData();
      const {
        email,
        passWord,
        address,
        images,
        gender,
        phoneNumber,
        firstName,
        lastName,
        roleId,
        positionId,
      } = user;
      if (email) {
        form.append("email", email);
      }
      if (passWord) {
        form.append("passWord", passWord);
      }
      if (address) {
        form.append("address", address);
      }
      if (images) {
        form.append("images", images);
      }
      if (gender) {
        form.append("gender", gender);
      }
      if (phoneNumber) {
        form.append("phoneNumber", phoneNumber);
      }
      if (firstName) {
        form.append("firstName", firstName);
      }
      if (lastName) {
        form.append("lastName", lastName);
      }
      if (roleId) {
        form.append("roleId", roleId);
      }
      if (positionId) {
        form.append("positionId", positionId);
      }
      return await instance.post("create-user", form);
    } catch (error) {
      return {};
    }
  };
  update = async (user: Partial<Iuser<string>>): Promise<IallCode1<number>> => {
    try {
      return await instance.put("update-user", { ...user });
    } catch (error) {
      return {};
    }
  };
  delete = async (id: number): Promise<IallCode1<number>> => {
    try {
      return await instance.delete("delete-user", { data: { id } });
    } catch (error) {
      return {};
    }
  };
  getAllDoctorWithoutImage = async (): Promise<Partial<iResponseDoctor>> => {
    return await instance.get("all-doctor-without-image");
  };
  createInfoDoctor = async (
    data: Imarkdown
  ): Promise<Iresponse<IdataMarkDown>> => {
    return await instance.post("/create-infor", { ...data });
  };
  isExistMarkdown = async (
    id: number | undefined
  ): Promise<Iresponse<IdataMarkDown>> => {
    return await instance.post("/existing-mardown", { id });
  };
  fetchDetailDoctor = async (
    id: string | undefined
  ): Promise<IdataDetailDoctor<Iuser<Imarkdown>>> => {
    return await instance.post(`get-infor-with-id?id=${id}`);
  };
  createBulkSchedual = async (
    data: Ischdual[]
  ): Promise<IdataDetailDoctor<IallCode<number>>> => {
    return await instance.post(`create-bulk-schedual`, { data });
  };
  getAllSchedualOfday = async (
    doctorId: any,
    date: any
  ): Promise<IallCode2<IchildSchedualAllcodes>> => {
    return await instance.post("fetch-Schedual", { doctorId, date });
  };
  fetchInforDoctor = async (
    id: number
  ): Promise<IdataDetailDoctor<IinforDoctor<IallCodeData>>> => {
    return await instance.get(`get-infor-doctor?id=${id}`);
  };
  fetchModalsDoctor = async (
    id: number
  ): Promise<IdataDetailDoctor<Iuser<IinforDoctor<IallCodeData>>>> => {
    return await instance.post(`fetch-inforDoctor-all`, { id });
  };
  creatNewSpeciality = async (
    data: Ispeciality
  ): Promise<IallCode1<number>> => {
    const tmp = new FormData();
    const { contentHtml, contentText, images, name } = data;
    tmp.append("contentHtml", contentHtml);
    tmp.append("contentText", contentText);
    tmp.append("nameSpeciality", name);
    tmp.append("images", images);
    return await instance.post("create-speciality", tmp);
  };
  fetchAllSpeciality = async (): Promise<IallCode<Ispeciality1>> => {
    return await instance.get("getAll-speciality");
  };
  getAllPatientForDoctor = async (id: any): Promise<IallCode<IlistPatient>> => {
    return await instance.post("get-schedual", { id });
  };
  //iResponseDoctor
  confirmTreatedForPatient = async (
    data: any,
    type: string
  ): Promise<IallCode1<number>> => {
    return await instance.post("confirm-treated", { data, type });
  };
  createNewClinic = async (data: Iclinic): Promise<IallCode1<number>> => {
    const tmp = new FormData();
    const { contentHtml, contentText, images, nameClinic } = data;
    tmp.append("contentHtml", contentHtml);
    tmp.append("contentText", contentText);
    tmp.append("nameClinic", nameClinic);
    tmp.append("images", images);
    return await instance.post("create-clinic", tmp);
  };
  fetchAllCinic = async (): Promise<IallCode<Iclinic1>> => {
    return await instance.get("getAll-clinic");
  };
}
export default new servicesSystem();
