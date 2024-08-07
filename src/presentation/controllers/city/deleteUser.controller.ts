import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../application/interfaces/usecase.interface";

export class DeleteUserController {
  private useCase: IUserUseCase;
  constructor(useCase: IUserUseCase) {
    this.useCase = useCase;
  }
  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, cityId } = req.body;
      const user = await this.useCase.deleteFavoriteCity(userId, cityId);
      return res.status(200).json({ status: true, message: "Deleted", user });
    } catch (error) {
      next(error);
    }
  }
}
