import { sign } from "jsonwebtoken";

export const generateJWTtoken = (payload: any): string => {
  const token = sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "20d",
  });
  return token;
};
