import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";
import { generateJWTtoken } from "../../../utils/jwt/generateToken";
import { getPayloadWithToken } from "../../../utils/jwt/getPayloadwithToken";
import { nodeCache } from "../../../config/node-cache.config";
import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export class VerifyUserController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const { email } = getPayloadWithToken(token) as string | JwtPayload | any;
      let userExist = await this.userUsecase.checkUserWithEmail(email);
      if (userExist) {
        throw new CustomeError(
          "User already exist please login",
          401,
          "already exist"
        );
      }
      if (!email) {
        throw new CustomeError("Verification failed", 500, "failed");
      }
      const userData = nodeCache.get(email as string);
      if (!userData) {
        throw new CustomeError("User not found", 404, "Not found");
      }
      const user = await this.userUsecase.createUserUsecase({
        ...userData,
        verificationStatus: true,
      } as User);
      const verifyToken = generateJWTtoken({ id: user.id });
      res.cookie(process.env.VERIFIED_COOKIE_NAME as string, verifyToken);
      nodeCache.set(user.email, null);
      console.log(user);
      
      return res
        .status(201)
        .json({ status: true, message: "User created", user });
    } catch (error) {
      next(error);
    }
  }
}
