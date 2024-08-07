import { NextFunction, Request, Response } from "express";
import { CustomeError } from "../../utils/errors/CustomeErr";
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const verificationToken =
    req.cookies[process.env.VERIFIED_COOKIE_NAME as string];
  console.log("🚀 ~ authCheck ~ verificationToken:", verificationToken);
  console.log(req.cookies);

  if (!verificationToken) {
    throw new CustomeError("Un autherized", 403, "");
  } else {
    next();
  }
};
