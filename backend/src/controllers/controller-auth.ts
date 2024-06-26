import { Request, Response } from "express";
import serviceAuth from "../services/service-auth";
class ControllerAuth {
  login = async (req: Request, res: Response) => {
    const { email, passWord } = req.body;
    const response = await serviceAuth.loginUser(email, passWord);
    const status = !response.errCode
      ? 200
      : response.errCode == 500
      ? 500
      : 200;
    res.status(status).json({
      data: response.data,
      errCode: response.errCode,
      message: response.message,
    });
  };
}
export default ControllerAuth;
