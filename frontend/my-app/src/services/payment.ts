import instance from "../config/axios";
import { IdataDetailDoctor } from "../constants/interface";
class service_Payment {
  static payment = async (
    doctorId: any,
    patientId: any
  ): Promise<IdataDetailDoctor<any>> => {
    return await instance.get(
      `pay?doctorId=${doctorId}&patientId=${patientId}`
    );
  };
  static completeOrder = async (
    token: any,
    doctorId: any,
    patientId: any
  ): Promise<IdataDetailDoctor<any>> => {
    return await instance.get(
      `complete-order?token=${token}&doctorId=${doctorId}&patientId=${patientId}`
    );
  };
  static cencalOrder = async (): Promise<IdataDetailDoctor<any>> => {
    return await instance.get("cancel-order");
  };
}
export default service_Payment;
