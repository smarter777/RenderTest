import e, { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";

import { hashPassword } from "../../../utils/security/hashPassword";
import { nodeCache } from "../../../config/node-cache.config";
import { generateVerficationLink } from "../../../utils/common/generateVerificationLink";
import { sendVerficationLink } from "../../../infra/nodemailer/sendVerficationLink";
import { comparePassword } from "../../../utils/security/comparePassword";
import { generateJWTtoken } from "../../../utils/jwt/generateToken";
import { User } from "../../../domain/entities/user.entity";

export class UserRegisterController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      let user = await this.userUsecase.checkUserWithEmail(email as string);
      if (user) {
        throw new CustomeError(
          "User already exist with this email",
          409,
          "Conflict"
        );
      }
      req.body.password = await hashPassword(String(req.body.password));

      nodeCache.set(email, req.body);
      console.log(req.body);

      user = await this.userUsecase.createUserUsecase({
        ...req.body,
        verificationStatus: true,
      } as User);
      const verifyToken = generateJWTtoken({ id: user.id });
      res.cookie(process.env.VERIFIED_COOKIE_NAME as string, verifyToken);
      return res.status(201).json({
        status: true,
        message: "User created",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
