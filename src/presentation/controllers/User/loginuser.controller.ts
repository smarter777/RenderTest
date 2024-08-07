import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";
import { CustomeError } from "../../../utils/errors/CustomeErr";
import { generateJWTtoken } from "../../../utils/jwt/generateToken";


export class LoginUserController {
  private userUsecase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.userUsecase = useCase;
  }
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
            
      let user = await this.userUsecase.loginUserUsecase({email:req.body.email,password:req.body.password});
      if (!user) {
        throw new CustomeError(
          "User not found with this email",
          404,
          "Not found"
        );
      }
      const token = generateJWTtoken({ id: user.id });
      res.cookie(process.env.VERIFIED_COOKIE_NAME as string, token);
      return res
        .status(200)
        .json({ status: true, message: "Login successful!!", user });
    } catch (error) {
      next(error);
    }
  }
}
