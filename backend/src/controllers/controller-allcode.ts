import { Request, Response } from "express";
import servicesAllcode from "../services/sevice-allcode";
class Allcode {
  getTypeAllcodes = async (req: Request, res: Response) => {
    try {
      const params: any = req.query?.type;
      if (params) {
        const response = await servicesAllcode.getType(params);
        const status = response && response.length > 0 ? 200 : 404;
        return res.status(status).json({
          errCode: response && response.length > 0 ? 0 : 1,
          message:
            response && response.length > 0
              ? `type ${params} is got successfully`
              : `type ${params} don't exist`,
          data: response,
        });
      }
    } catch (error) {
      return res.status(404).json({
        errCode: 1,
        message: "failed",
      });
    }
  };
}
export default Allcode;
