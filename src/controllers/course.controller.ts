// src/controllers/course.controller.ts
import { Request, Response, NextFunction } from "express";
import { getCourseDetails } from "../services/course.service";
import { ApiError } from "../utils/ApiError";

export const getCourseDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = Number(req.params.id);
    const course = await getCourseDetails(courseId);
    if (!course) {
      throw new ApiError("Course not found", 404);
    }
    res.json({ status: true, course });
  } catch (error) {
    next(error);
  }
};
