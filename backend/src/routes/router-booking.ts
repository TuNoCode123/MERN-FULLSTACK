import { Router } from "express";
import ControllerBooking from "../controllers/controllerBooking";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerBooking = new Routers();

routerBooking.router.post(
  "/confirm-treated",
  ControllerBooking.confirmStreated
);
routerBooking.router.post(
  "/get-booking-by-patientId",
  ControllerBooking.getBookingViaId
);
export default routerBooking.router;
