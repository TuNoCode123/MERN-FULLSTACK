import instance from "../config/axios";
import { iResponseDoctor } from "../redux/reducer/reducer-excuteUser";
class service_Home {
  static getAllDoctor = async (): Promise<Partial<iResponseDoctor>> => {
    return await instance.get("all-doctor");
  };
}
export default service_Home;
