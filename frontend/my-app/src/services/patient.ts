import instance from "../config/axios";
import { IallCode1 } from "../constants/interface";
export const servicePatient = async (data: any): Promise<IallCode1<number>> => {
  return await instance.post("set-calender-for-patient", { data });
};
export const verify = async (
  token: string,
  doctorId: number
): Promise<IallCode1<number>> => {
  return await instance.post("verify-booking", { token, doctorId });
};
