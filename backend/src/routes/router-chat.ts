import { Router } from "express";
import controllerChat from "../controllers/controller-chat";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerChat = new Routers();

routerChat.router.get("/get-chat-by-id", controllerChat.findChatById);
routerChat.router.post("/create-mess", controllerChat.createMessage);
routerChat.router.get("/get-all-mess", controllerChat.getAllMess);
routerChat.router.get("/get-user-by-id", controllerChat.getUserById);
routerChat.router.get("/find-chat", controllerChat.findChat);

export default routerChat.router;
