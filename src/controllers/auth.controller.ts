//src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  loginUser,
  registerUser,
  refreshTokens,
} from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { registerSchema } from "../validations/registerSchema";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ✅ Validate request body using zod schema
    const parseResult = registerSchema.safeParse(req.body);

    if (!parseResult.success) {
      const issues = parseResult.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));

      throw new ApiError("Validation failed", 400, issues);
    }

    // Use parsed data
    const result = await registerUser(parseResult.data);
    res.status(201).json(result);
  } catch (error) {
    next(error); // Send to centralized error handler
  }
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  res.json(result);
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new ApiError("Refresh token required", 400);
    }
    const result = await refreshTokens(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
