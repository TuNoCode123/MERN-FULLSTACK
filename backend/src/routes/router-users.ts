import { Router } from "express";

import ControllerUser from "../controllers/controller-user";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routers = new Routers();
const controllerUser = new ControllerUser();
routers.router.put("/update-user", controllerUser.updateUser);
routers.router.post("/create-user", controllerUser.createUser);
routers.router.get("/findAll-user", controllerUser.findAllUser);
routers.router.delete("/delete-user", controllerUser.deleteUser);
routers.router.get("/all-doctor", controllerUser.findAlldoctor);
routers.router.get(
  "/all-doctor-without-image",
  controllerUser.findAlldoctorWithoutImage
);

export default routers.router;
