import { Router } from "express";

import ControllerUser from "../controllers/controller-user";
import ControllerAuth from "../controllers/controller-auth";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerAuth = new Routers();
const controllerAuth = new ControllerAuth();
routerAuth.router.post("/login", controllerAuth.login);
export default routerAuth.router;
