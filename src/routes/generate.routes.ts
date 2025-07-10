import { Router } from "express";
import { generate } from "../controllers/generate.controller";

const router = Router();

router.post("/", generate);

export default router;
