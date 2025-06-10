//src/routes/auth.routes.ts
import { Router } from "express";
import { register, login, refresh } from "../controllers/auth.controller";
import { loginSchema } from "../validations/loginSchema";
import { validateRequest } from "../middleware/validateRequest";
import {
  getParentDetails,
  createStudent,
} from "../controllers/parents/parent.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.post("/register", register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/parent/profile", authenticate, getParentDetails);
router.post("/refresh", refresh);
router.post("/add/student", authenticate, createStudent);
export default router;
