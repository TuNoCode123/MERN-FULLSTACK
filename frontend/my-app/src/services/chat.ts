import instance from "../config/axios";
import {
  Ichat,
  IdataDetailDoctor,
  Ifont,
  IMess,
  Iuser,
} from "../constants/interface";
class service_Chat {
  static getAllChat = async (id: any): Promise<Ichat> => {
    return await instance.get(`get-chat-by-id?id=${id}`);
  };
  static createMess = async (
    roomId: any,
    senderId: any,
    text: any
  ): Promise<Ifont> => {
    return await instance.post(`create-mess`, {
      roomId,
      senderId,
      text,
    });
  };
  static getAllMess = async (roomId: any): Promise<Ifont[]> => {
    return await instance.get(`get-all-mess?roomId=${roomId}`);
  };
  static getUserById = async (id: any): Promise<Iuser<any>> => {
    return await instance.get(`get-user-by-id?id=${id}`);
  };

  static findChat = async (id1: any, id2: any) => {
    return await instance.get(`find-chat?id1=${id1}&id2=${id2}`);
  };

  static chatAi = async (prompt: any, img: any) => {
    return await instance.post("chat-ai", { prompt, img });
  };
}
export default service_Chat;
