//src/controllers/lesson.controller.ts
import { Request, Response, NextFunction } from "express";
import { getLessonById } from "../services/lesson.service";
import { ApiError } from "../utils/ApiError";

// export const getLesson = async (req: Request,
//   res: Response,
//   next: NextFunction) => {

    
// };

export const getLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lessonId = Number(req.params.id);
    if (isNaN(lessonId)) {
      res.status(400).json({ error: "Invalid lesson id" });
      return;
    }

    const lesson = await getLessonById(lessonId);
    if (!lesson) {
      throw new ApiError("Lesson not found", 404);
    }
    res.json({ status: true, lesson });
  } catch (error) {
    next(error);
  }
};