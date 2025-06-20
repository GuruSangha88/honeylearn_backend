// src/app.ts
import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import courseRoutes from "./routes/course.routes";
import ttsRoutes from "./routes/tts.routes"; // ✅ Correct: router, not app


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root health check
app.get("/", (_req, res) => {
  res.send("API is running!");
});

// Prefix all auth routes with /api/auth
app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", ttsRoutes); 

app.use(errorHandler);

export default app;
