import { Application } from "express";
import express from "express";
export const config = (app: Application) => {
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
};
