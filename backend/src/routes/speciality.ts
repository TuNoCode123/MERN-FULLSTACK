import { Router } from "express";
import ControllerSpeciality from "../controllers/controller-speciality";
import { upload, uploadToCloudinary } from "../storage/strorage";
class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routersSpeciality = new Routers();

routersSpeciality.router.post(
  "/create-speciality",
  upload.array("images", 1),
  uploadToCloudinary,
  ControllerSpeciality.createNewSpeciality
);
routersSpeciality.router.get(
  "/getAll-speciality",
  ControllerSpeciality.getAllSpeciality
);
routersSpeciality.router.get(
  "/get-speciality-byId",
  ControllerSpeciality.getOneSpecialityByid
);
routersSpeciality.router.get(
  "/get-All-Doctor-byId",
  ControllerSpeciality.getAllDocorByIdViaSpeciality
);
routersSpeciality.router.post(
  "/actions-speciality",
  upload.array("images", 1),
  uploadToCloudinary,
  ControllerSpeciality.actionSpeciality
);
export default routersSpeciality.router;
