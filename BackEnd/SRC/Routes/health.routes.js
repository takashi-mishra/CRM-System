import { Router } from "express";
import { getHealth } from "../Controllers/health.controller.js";

const router = Router();

router.get("/health", getHealth);

export default router;