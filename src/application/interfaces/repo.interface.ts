import { User } from "../../domain/entities/user.entity";

export interface IUserRepository {
  createUserRepo(user: User): Promise<User>;
  loginUserRepo(data: { email: string; password: string }): Promise<User>;
  getUserRepo(userId: string): Promise<User>;
  checkUserWithEmailRepo(email: string): Promise<User | null>;
  addFavouriteCityRepo(userId: string, cityname: string): Promise<User>;
  deleteFavoriteCityRepo(userId: string, cityId: string): Promise<User>;
}
