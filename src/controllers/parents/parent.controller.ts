// src/controllers/parent.controller.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import { ApiError } from "../../utils/ApiError";

export const getParentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user id from token
    const userId = (req as any).user.id;

    const parent = await prisma.parentProfile.findUnique({
      where: { id: userId },
      include: { user: true },
    });

    if (!parent) {
      throw new ApiError("Parent not found", 404);
    }

    res.status(200).json({
      status: true,
      parent: {
        id: parent.id,
        name: parent.name,
        email: parent.email,
        role: parent.user?.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
