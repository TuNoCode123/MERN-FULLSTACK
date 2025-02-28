import { Router } from "express";
import ControllerSpeciality from "../controllers/controller-speciality";
import { upload, uploadToCloudinary } from "../storage/strorage";
import ControllerClinic from "../controllers/controller-Clinic";
class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routersClinic = new Routers();

routersClinic.router.post(
  "/create-clinic",
  upload.array("images", 1),
  uploadToCloudinary,
  ControllerClinic.createNewClinic
);
routersClinic.router.get("/getAll-clinic", ControllerClinic.getAllClinic);
routersClinic.router.get(
  "/get-clinic-by-id",
  ControllerClinic.getOneClinicByid
);
routersClinic.router.get(
  "/get-All-Doctor-byId",
  ControllerSpeciality.getAllDocorByIdViaSpeciality
);
routersClinic.router.post(
  "/actions-clinic",
  upload.array("images", 1),
  uploadToCloudinary,
  ControllerClinic.actionClinic
);
export default routersClinic.router;
