import { Router } from "express";

import Allcode from "../controllers/controller-allcode";
import ControllerPayment from "../controllers/controller-payment";
import { linkPayment } from "../utils/actions/actions";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerPayment = new Routers();
routerPayment.router.get("/pay", ControllerPayment.payment);
routerPayment.router.get("/complete-order", ControllerPayment.completePayment);
routerPayment.router.get(linkPayment.cancel, ControllerPayment.cencelPayment);

export default routerPayment.router;
