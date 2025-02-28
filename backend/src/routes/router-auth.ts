import { Router } from "express";

import ControllerUser from "../controllers/controller-user";
import ControllerAuth from "../controllers/controller-auth";
import MarkdownController from "../controllers/controller-markdown";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerAuth = new Routers();
const controllerAuth = new ControllerAuth();
routerAuth.router.post("/login", controllerAuth.login);
routerAuth.router.post(
  "/create-infor",
  MarkdownController.createMarkDownForDoctor
);
routerAuth.router.post("/existing-mardown", MarkdownController.findOneMarkDown);
export default routerAuth.router;
