import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";

export class AddCityController {
  private useCase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.useCase = useCase;
  }
  async addCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, cityname } = req.body;
      console.log(req.body);
      
      const user = await this.useCase.addFavoriteCity(userId, cityname);
      console.log("🚀 ~ AddCityController ~ addCity ~ user:", user)
      return res
        .status(201)
        .json({ status: true, message: "Successful", user });
    } catch (error) {
      console.log("🚀 ~ AddCityController ~ addCity ~ error:", error)
      next(error);
    }
  }
}
