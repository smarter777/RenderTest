import { NextFunction, Request, Response } from "express";

export class LogoutController {
  constructor() {}
  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(process.env.VERIFIED_COOKIE_NAME as string);
      return res
        .status(200)
        .json({ status: true, user: null, message: "User successful" });
    } catch (error) {
      next(error);
    }
  }
}
