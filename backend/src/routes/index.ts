import { Application } from "express";
import routerUsers from "./router-users";
import { errorFinal, notFound } from "../utils/error/handlerError";
import routerAuth from "./router-auth";
import routersAllcode from "./allcode";
const route = (app: Application) => {
  app.use("/api/v1", routerUsers);
  app.use("/api/v1", routerAuth);
  app.use("/api/v1", routersAllcode);
  app.use(notFound);
  app.use(errorFinal);
};
export default route;
