import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

// register user
router.post('/register',register)

// login user
router.post('/login',login)

export default router;
