// src/controllers/parent.controller.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import { ApiError } from "../../utils/ApiError";
import { addStudent } from "../../services/student.service";
import { createStudentSchema } from "../../validations/studentSchema";
import { create } from "domain";

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
      include: {
        user: {
          include: {
            students: true, // This will fetch all students for this parent user
          },
        },
      },
    });

    if (!parent) {
      throw new ApiError("Parent not found", 404);
    }
    console.log("Parent details fetched successfully", parent);
    res.status(200).json({
      status: true,
      parent: {
        id: parent.id,
        firstName: parent.firstName,
        lastName: parent.lastName,
        email: parent.email,
        role: parent.user?.role,
        createdAt: parent.createdAt,
        students: parent.user?.students || [],
      },
    });
  } catch (error) {
    next(error);
  }
};
export const createStudent = async (
  req: Request, // ✅ THIS IS THE KEY
  res: Response,
  next: NextFunction
) => {
  try {
    const parentId = (req as any).user.id;
    const parent = await prisma.parentProfile.findUnique({
      where: { id: parentId },
      include: { user: true },
    });

    if (!parent) {
      throw new ApiError("Parent not found", 404);
    }

    // ✅ Validate request body using zod schema
    const parseResult = createStudentSchema.safeParse(req.body);

    if (!parseResult.success) {
      const issues = parseResult.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));

      throw new ApiError("Validation failed", 400, issues);
    }

    // Now `req.body` is fully typed
    const { firstName, lastName, birthday, avatarUrl, ageGroup } =
      parseResult.data;

    const student = await addStudent({
      parentId,
      firstName,
      lastName,
      birthday,
      avatarUrl,
      ageGroup,
    });

    res.status(201).json({ status: true, student });
  } catch (error) {
    next(error);
  }
};
