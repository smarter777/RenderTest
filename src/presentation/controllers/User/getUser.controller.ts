import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";
import { generateJWTtoken } from "../../../utils/jwt/generateToken";
import { getPayloadWithToken } from "../../../utils/jwt/getPayloadwithToken";

export class GetUserController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies[process.env.VERIFIED_COOKIE_NAME as string];
      if (!token) {
        throw new CustomeError("Un autherized", 401, "un auth");
      }
      const payload: { id: string } = getPayloadWithToken(token) as {
        id: string;
      };

      if (!payload) {
        throw new CustomeError("Un autherized", 401, "un auth");
      }
      const user = await this.userUsecase.getUserUsecase(payload.id);
      console.log("🚀 ~ GetUserController ~ getUser ~ user:", user)

      return res
        .status(200)
        .json({ status: true, message: "getuser successful!!", user });
    } catch (error) {
      next(error);
    }
  }
}
