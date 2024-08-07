import { IUserRepository } from "../application/interfaces/repo.interface";
import { db } from "../config/prisma";
import { User } from "../domain/entities/user.entity";
import { CustomeError } from "../utils/errors/CustomeErr";
import { comparePassword } from "../utils/security/comparePassword";

export class UserRepository implements IUserRepository {
  async createUserRepo(user: User): Promise<User> {
    try {
      const newuser = await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          verificationStatus: user.verificationStatus,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          favouriteCities: {
            create: user.favouriteCities ?? [],
          },
        },
        include: {
          favouriteCities: true,
        },
      });
      return newuser;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
  async loginUserRepo(data: {
    email: string;
    password: string;
  }): Promise<User> {
    console.log("🚀 ~ UserRepository ~ data:", data);
    try {
      const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
        include: {
          favouriteCities: true,
        },
      });
      if (!user) {
        throw new CustomeError(
          "User not found or invalid credentials",
          404,
          "not found"
        );
      }

      console.log(user, " ->");

      const passMatch = await comparePassword(
        data.password.trim(),
        user.password.trim()
      );
      console.log("🚀 ~ UserRepository ~ passMatch:", passMatch);
      console.log(data.password, user.password);
      if (!passMatch) {
        throw new CustomeError(
          "User not found or invalid credentials",
          400,
          "not found"
        );
      }
      return user;
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  }
  async getUserRepo(userId: string): Promise<User> {
    try {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          favouriteCities: true,
        },
      });

      if (!user) {
        throw new CustomeError("User not found", 404, "not found");
      }

      return user;
    } catch (error: any) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }
  async checkUserWithEmailRepo(email: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      
      return user ? user : null;
    } catch (error: any) {
      throw new Error(`Failed to check user with email: ${error.message}`);
    }
  }

  async addFavouriteCityRepo(userId: string, cityname: string): Promise<User> {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: { favouriteCities: true },
      });
      if (!user) {
        throw new CustomeError("Something went wrong", 404, "wrong");
      }
      await db.favouriteCity.create({
        data: {
          cityname,
          userId,
        },
      });
      return await this.getUserRepo(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteFavoriteCityRepo(userId: string, cityId: string): Promise<User> {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: { favouriteCities: true },
      });
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      await db.favouriteCity.delete({
        where: { id: cityId },
      });
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
