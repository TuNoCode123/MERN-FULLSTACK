import { Application } from "express";
import routerUsers from "./router-users";
import { errorFinal, notFound } from "../utils/error/handlerError";
import routerAuth from "./router-auth";
import routersAllcode from "./allcode";
import routerInfor from "./infor-doctor";
import routersSpeciality from "./speciality";
import routerBooking from "./router-booking";
import routerClinic from "./router-clinic";
import routerPayment from "./router-payment";
import routerChat from "./router-chat";
import routerChatAi from "./router-chatAi";
const route = (app: Application) => {
  app.use("/api/v1", routerUsers);
  app.use("/api/v1", routerAuth);
  app.use("/api/v1", routersAllcode);
  app.use("/api/v1", routerInfor);
  app.use("/api/v1", routersSpeciality);
  app.use("/api/v1", routerBooking);
  app.use("/api/v1", routerClinic);
  app.use("/api/v1", routerPayment);
  app.use("/api/v1", routerChat);
  app.use("/api/v1", routerChatAi);
  app.use(notFound);
  app.use(errorFinal);
};
export default route;
