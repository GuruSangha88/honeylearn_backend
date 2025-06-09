import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Caught error:", err);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  const response: any = {
    status: false,
    error: message,
  };

  if (err instanceof ApiError && err.issues) {
    response.issues = err.issues;
  }

  res.status(statusCode).json(response);
}
