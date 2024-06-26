import { Router } from "express";

import Allcode from "../controllers/controller-allcode";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routersAllcode = new Routers();
const controllerAllcode = new Allcode();
routersAllcode.router.post("/allcode", controllerAllcode.getTypeAllcodes);
export default routersAllcode.router;
