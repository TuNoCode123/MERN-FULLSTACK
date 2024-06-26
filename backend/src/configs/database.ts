import { Sequelize } from "sequelize-typescript";
import User from "../models/model-user";
import Schedual from "../models/model-schedual";
import History from "../models/model-history";
import Booking from "../models/model-booking";
import Speciality from "../models/model-speciality";
import Clinic from "../models/model-clinic";
import AllCodes from "../models/model-allCode";
import Markdown from "../models/model-markdown";
require("dotenv").config();
class Database {
  public sequelize: Sequelize | undefined;
  private DB_NAME = process.env.DB_NAME as string;
  private DB_DIALECT = process.env.DB_DIALECT as any;
  private DB_USERNAME = process.env.DB_USERNAME as string;
  private DB_PASSWORD = process.env.DB_PASSWORD as string;
  private DB_STORAGE = process.env.DB_STORAGE as string;
  constructor() {
    this.connectToDb();
  }
  private connectToDb = async () => {
    try {
      this.sequelize = new Sequelize({
        database: this.DB_NAME,
        dialect: this.DB_DIALECT,
        username: this.DB_USERNAME,
        password: this.DB_PASSWORD,
        storage: this.DB_STORAGE,
        models: [
          User,
          AllCodes,
          Schedual,
          History,
          Booking,
          Speciality,
          Clinic,
          Markdown,
        ],
        logging: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000, // 30 giây
          idle: 10000, // 10 giây
          evict: 10000, // 10 giây
        },
        dialectOptions: {
          connectTimeout: 60000, // 60 giây
        },
      });
      await this.sequelize.authenticate();
      console.log("Connect DataBase successfully");
    } catch (error) {
      console.log("Connect DataBase fail", error);
    }
  };
}
export default Database;
