import express from "express";
import { Application, Request, response } from "express";
import { config } from "./configs/configApp";
import route from "./routes";
require("dotenv").config();
import Database from "./configs/database";
const cors = require("cors");
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.toConnect();
  }
  toConnect = () => {
    const db = new Database();
    db.sequelize?.sync();
  };
}
const port: number = Number(process.env.PORT);
const app = new App().app;
app.use(cors());
config(app);
route(app);
app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
