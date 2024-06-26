import { Request, Response, NextFunction } from "express";
import { ErrorType } from "../interfaces/interface-user";
var createError = require("http-errors");
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "Not Found"));
};
export const errorFinal = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status || 500).json({
    status: error.status,
    error: error.message,
  });
};
