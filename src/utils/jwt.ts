import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "24h" });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, accessSecret);
export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, refreshSecret);
