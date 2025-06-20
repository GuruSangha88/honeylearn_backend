// src/routes/course.routes.ts
import { Router } from "express";
import { getCourseDetail,getAllCourseDetail,getCourseFullContent } from "../controllers/course.controller";
import { getLesson } from "../controllers/lesson.controller";

const router = Router();
router.get("/course/:id", getCourseDetail);
router.get("/courses", getAllCourseDetail);
router.get("/lesson/:id", getLesson);
router.get("/course/:id/full-content", getCourseFullContent);

export default router;
