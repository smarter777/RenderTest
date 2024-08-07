import { Router } from "express";
import { UserRepository } from "../../respositories/user.repository";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { AddCityController } from "../../presentation/controllers/city/addcity.controller";
import { DeleteUserController } from "../../presentation/controllers/city/deleteUser.controller";
import { authCheck } from "../../presentation/middlewares/authChecker";

const cityRouter = Router();

const repository = new UserRepository();
const useCase = new UserUseCase(repository);

const addCity = new AddCityController(useCase);
const delteCity = new DeleteUserController(useCase);

cityRouter.use(authCheck);
cityRouter
  .route("/favorites")
  .post(addCity.addCity.bind(addCity))
  .delete(delteCity.deleteCity.bind(delteCity));

export default cityRouter;
