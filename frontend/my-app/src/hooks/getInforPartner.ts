import { Ichat } from "../constants/interface";
import service_Chat from "../services/chat";

export const getIdPartner = (room: any, id: any) => {
  const getId = room.members.find((item: any) => item != +id);
  return getId;
};
