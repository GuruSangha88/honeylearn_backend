// src/middlewares/validateRequest.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = result.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return next(new ApiError("Validation failed", 400, issues));
    }

    req.body = result.data; // Only valid data
    next();
  };
