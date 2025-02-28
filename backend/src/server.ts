import express from "express";
import { Application, Request, response } from "express";
import { config } from "./configs/configApp";
import route from "./routes";
require("dotenv").config();
import Database from "./configs/database";
import { createOrder } from "./payments/service-payment";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
const cors = require("cors");
import { ClientToServerEvents, ServerToClientEvents } from "../../typeSocket";
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.toConnect();
  }
  toConnect = () => {
    const db = new Database();
    db.sequelize?.sync();
    mongoose
      .connect(process.env.MONGO ? process.env.MONGO : "")
      .then(() => console.log("Connected mongo successfully!"))
      .catch(() => {
        console.log("Connected mongo failed!");
      });
  };
}
const port: number = Number(process.env.PORT);
const app = new App().app;
app.use(cors());
config(app);
route(app);
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let userOnline: {
  socketId?: string;
  userId?: number;
}[] = [];
io.on("connection", (socket) => {
  socket.on("online", (id) => {
    const isOnlined = userOnline.some((o) => o.userId == id);
    if (!isOnlined) {
      const tmp = {
        socketId: socket.id,
        userId: id,
      };
      userOnline.push(tmp);
    }
    io.emit("totalUserOnline", userOnline);
  });
  socket.on("disconnect", () => {
    userOnline = userOnline.filter((u) => u.socketId != socket.id);
    io.emit("totalUserOnline", userOnline);
  });
  socket.on("sentMess", (data) => {
    const isOnline = userOnline.find((u) => u.userId == data.receiverId);
    if (isOnline && isOnline.socketId) {
      io.to(isOnline.socketId).emit("receiverMess", data.mess);
      io.to(isOnline.socketId).emit("notification", {
        text: data.mess.text,
        senderId: data.mess.senderId,
        date: new Date(),
      });
    }
  });
});

httpServer.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
