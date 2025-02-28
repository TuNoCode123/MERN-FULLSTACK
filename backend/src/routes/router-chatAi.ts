import { Router } from "express";

import cotrollerChatAi from "../controllers/cotroller-chatAi";

class Routers {
  public router: Router;
  constructor() {
    this.router = Router();
  }
}
const routerChatAi = new Routers();
routerChatAi.router.post("/chat-ai", cotrollerChatAi.chatAi);

export default routerChatAi.router;
