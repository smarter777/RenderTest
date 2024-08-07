import { Router } from "express";
import { UserRegisterController } from "../../presentation/controllers/User/userregister.controller";
import { UserRepository } from "../../respositories/user.repository";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { LoginUserController } from "../../presentation/controllers/User/loginuser.controller";
import { VerifyUserController } from "../../presentation/controllers/User/verifyuser.controller";
import { validateUserData } from "../../presentation/middlewares/validateuserSignup";
import { GetUserController } from "../../presentation/controllers/User/getUser.controller";
import { LogoutController } from "../../presentation/controllers/User/logoutUser.controller";
const router = Router();

const repo = new UserRepository();
const useCase = new UserUseCase(repo);

const register = new UserRegisterController(useCase);
const login = new LoginUserController(useCase);
const verify = new VerifyUserController(useCase);
const getuser = new GetUserController(useCase);
const logout = new LogoutController();
router.post(
  `/register`,
  validateUserData,
  register.registerUser.bind(register)
);
router.post(`/login`, validateUserData, login.loginUser.bind(login));
router.post(`/verify`, verify.verifyUser.bind(verify));
router.get(`/get-user`, getuser.getUser.bind(getuser));
router.delete(`/logout`, logout.logoutUser);

export default router;
