import { Router } from "express";
import DoctorInfor from "../controllers/controller-inforDoctor";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routersInfor = new Routers();

routersInfor.router.get("/get-infor-doctor", DoctorInfor.getInforDoctor);
routersInfor.router.post("/get-schedual", DoctorInfor.getSchedualForDoctor);
export default routersInfor.router;
