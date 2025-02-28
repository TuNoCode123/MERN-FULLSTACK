import { Request, Response } from "express";
import ServiceBooking from "../services/service-booking";
import { capturePayment, createOrder } from "../payments/service-payment";

class ControllerPayment {
  static payment = async (req: Request, res: Response) => {
    try {
      const { doctorId, patientId } = req.query;
      const getPrice = await ServiceBooking.getCostOfDoctor(doctorId);
      if (!getPrice?.data) return;
      const url = await createOrder(+getPrice.data, doctorId, patientId);
      return res.status(200).json({
        errCode: 0,
        message: "success",
        data: url,
      });
    } catch (error) {}
  };
  static completePayment = async (req: Request, res: Response) => {
    try {
      await capturePayment(req.query.token);
      await ServiceBooking.CompletedBooking(
        req.query.doctorId,
        req.query.patientId
      );
      return res.status(200).json({
        errCode: 0,
        message: "complete",
      });
    } catch (error) {}
  };
  static cencelPayment = (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        errCode: 0,
        message: "cencal success",
      });
    } catch (error) {}
  };
}
export default ControllerPayment;
