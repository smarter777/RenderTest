import { NextFunction, Request, Response } from "express";
import { signupUserSchema } from "../../utils/Schema/user.schema";
import { CustomeError } from "../../utils/errors/CustomeErr";
import { loginSchema } from "../../utils/Schema/login.schema";

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validation =
    req.url == "/register"
      ? signupUserSchema.validate(req.body, { abortEarly: false })
      : loginSchema.validate(req.body, { abortEarly: false });

  const { error } = validation;
  if (error) {
    const errorMessages = error.details.map((va) => va.message).join(" , ");
    throw new CustomeError(errorMessages, 400, "Validation failed");
  }
  next();
};
