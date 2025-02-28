import { Request, Response } from "express";
import serviceChat from "../services/service-chat";
class ControllersChat {
  findChatById = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(404).json({
          message: "missing input",
        });
      }
      const response = await serviceChat.getChatById(id);
      return res.status(200).json({
        ...response,
      });
    } catch (error) {}
  };

  createMessage = async (req: Request, res: Response) => {
    const { roomId, senderId, text } = req.body;
    if (!roomId || !senderId || !text) {
      return res.status(403).json({
        message: "missing input",
      });
    }
    try {
      const response = await serviceChat.createMess({ roomId, senderId, text });
      return res.status(200).json(response);
    } catch (error) {}
  };

  getAllMess = async (req: Request, res: Response) => {
    const { roomId } = req.query;
    if (!roomId) {
      return res.status(403).json({
        message: "missing input",
      });
    }
    try {
      const response = await serviceChat.findAllMess(roomId);
      return res.status(200).json(response);
    } catch (error) {}
  };

  getUserById = async (req: Request, res: Response) => {
    const response = await serviceChat.getUserById(req.query.id);
    return res.status(200).json(response);
  };

  findChat = async (req: Request, res: Response) => {
    const { id1, id2 } = req.query;
    const response = await serviceChat.findChat(id1, id2);
    return res.status(200).json(response);
  };
}
export default new ControllersChat();
