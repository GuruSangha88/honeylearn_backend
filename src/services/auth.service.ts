//src/services/auth.service.ts
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import { verifyRefreshToken, generateTokens } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import type { JwtPayload } from "jsonwebtoken";

type UserRole = "parent" | "admin";

export const registerUser = async ({
  email,
  password,
  role = "parent",
  name,
}: {
  email: string;
  password: string;
  role?: "parent" | "admin";
  name?: string;
}) => {
  const existingEmail = await getExistingEmail(email);
  if (existingEmail.exists) {
    throw new ApiError("Email already exists", 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });

  let parent = null;
  if (role === "parent") {
    parent = await prisma.parentProfile.create({
      data: {
        id: user.id,
        email: user.email,
        name: name || "",
      },
    });
  }

  return {
    status: true,
    message: "User created",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: parent?.name,
    },
  };
};

export const getExistingEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return { exists: !!user, user };
};
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError("User not found", 400);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError("Incorrect Password", 400);
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return { message: "Login successful", tokens };
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

    if (!decoded?.id || isNaN(Number(decoded.id))) {
      throw new ApiError("Invalid refresh token payload", 401);
    }

    const userId = Number(decoded.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError("User not found", 400);

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { message: "Tokens refreshed", tokens };
  } catch (err) {
    console.error("Refresh token error:", err);
    throw new ApiError("Invalid refresh token", 401);
  }
};
