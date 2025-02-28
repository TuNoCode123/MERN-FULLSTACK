import dbChat from "../models-mongoo.ts/chat";
import dbRoom from "../models-mongoo.ts/room";
import User from "../models/model-user";

class ServicesChat {
  getChatById = async (id: any) => {
    try {
      const res = await dbRoom.find({
        members: { $in: [+id] },
      });
      return {
        data: res,
      };
    } catch (error) {}
  };
  createMess = async ({
    roomId,
    senderId,
    text,
  }: {
    roomId: any;
    senderId: any;
    text: any;
  }) => {
    const res = new dbChat({ roomId, senderId, text });
    await res.save();
    return res;
  };
  findAllMess = async (roomId: any) => {
    try {
      const res = await dbChat.find({
        roomId,
      });
      return res;
    } catch (error) {}
  };
  getUserById = async (id: any) => {
    try {
      const res = await User.findOne({
        where: { id },
        attributes: {
          exclude: ["image", "passWord"],
        },
      });
      return {
        data: res,
      };
    } catch (error) {}
  };
  findChat = async (id1: any, id2: any) => {
    try {
      const res = await dbRoom.findOne({
        members: { $all: [+id1, +id2] },
      });

      return {
        data: res,
      };
    } catch (error) {}
  };
}
export default new ServicesChat();
