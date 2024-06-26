import instance from "../config/axios";
import {
  IallCode,
  IallCode1,
  IallCodeData,
  Iuser,
} from "../constants/interface";
import {
  CounterState,
  iResponseDoctor,
} from "../redux/reducer/reducer-excuteUser";

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
      return await instance.post("create-user", { ...user });
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
}
export default new servicesSystem();
