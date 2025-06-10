// src/routes/course.routes.ts
import { Router } from "express";
import { getCourseDetail } from "../controllers/course.controller";

const router = Router();
router.get("/course/:id", getCourseDetail);
export default router;
