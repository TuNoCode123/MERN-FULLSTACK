import { Request, Response } from "express";
import { getResponseAi } from "../services/service-geminiAl";
class CotrollerChatAi {
  chatAi = async (req: Request, res: Response) => {
    try {
      const { prompt, img } = req.body;
      if (!prompt) {
        return res.status(404).json({
          message: "missing input",
        });
      }
      const response = await getResponseAi(prompt, img);
      return res.status(200).json({
        text: response,
      });
    } catch (error) {}
  };
}
export default new CotrollerChatAi();
