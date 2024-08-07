import jwt from "jsonwebtoken";
export const generateVerficationLink = (
  payload: { email: string },
  queryPerfix: string
) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "10m", 
  });

  return `${process.env.CLIENT_ORIGIN}/signup?${queryPerfix}=${jwtToken}`;
};
