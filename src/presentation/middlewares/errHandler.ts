import e, { NextFunction, Request, Response } from "express";
import { CustomeError } from "../../utils/errors/CustomeErr";

export const errorHandler = (
  err: Error | CustomeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomeError) {
    return res
      .status(err.statusCode)
      .json({ status: false, message: err.message, details: err.details });
  }
  return res.status(500).json({ status: false, message: err.message });
};
