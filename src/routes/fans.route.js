import { Router } from "express";
import { getAllFans } from "../controllers/fans.controller.js";

const router = Router();

// get all fans
router.get('/',getAllFans)

export default router;