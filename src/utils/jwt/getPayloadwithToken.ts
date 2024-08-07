import jwt from "jsonwebtoken";
export const getPayloadWithToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  return payload;
};
