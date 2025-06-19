// src/routes/course.routes.ts
import { Router } from "express";
import { getCourseDetail,getAllCourseDetail } from "../controllers/course.controller";
import { getLesson } from "../controllers/lesson.controller";

const router = Router();
router.get("/course/:id", getCourseDetail);
router.get("/courses", getAllCourseDetail);
router.get("/lesson/:id", getLesson);

export default router;
