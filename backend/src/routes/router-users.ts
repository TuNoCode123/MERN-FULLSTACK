import { Router } from "express";

import ControllerUser from "../controllers/controller-user";
import { upload, uploadToCloudinary } from "../storage/strorage";
class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routers = new Routers();
const controllerUser = new ControllerUser();
routers.router.put("/update-user", controllerUser.updateUser);
routers.router.post(
  "/create-user",
  upload.array("images", 1),
  uploadToCloudinary,
  controllerUser.createUser
);
routers.router.get("/findAll-user", controllerUser.findAllUser);
routers.router.delete("/delete-user", controllerUser.deleteUser);
routers.router.get("/all-doctor", controllerUser.findAlldoctor);
routers.router.get(
  "/all-doctor-without-image",
  controllerUser.findAlldoctorWithoutImage
);
routers.router.post("/get-infor-with-id", controllerUser.fetchMarkDownWithId);
routers.router.post(
  "/create-bulk-schedual",
  controllerUser.creatSchedualDoctor
);
routers.router.post("/fetch-Schedual", controllerUser.findSchedualOfDoctor);
routers.router.post("/fetch-inforDoctor-all", controllerUser.getDoctorWithAll);
routers.router.post(
  "/set-calender-for-patient",
  controllerUser.setSchedualForPatient
);
routers.router.post("/verify-booking", controllerUser.verifyBooking);

export default routers.router;
