// src/routes/course.routes.ts
import { Router } from "express";
import { getCourseDetail,getAllCourseDetail } from "../controllers/course.controller";

const router = Router();
router.get("/course/:id", getCourseDetail);
router.get("/courses", getAllCourseDetail);
export default router;
