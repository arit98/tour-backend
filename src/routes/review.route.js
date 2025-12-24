import express from "express"
import { createReview } from "../controllers/review.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";

const router = express.Router()

// create review
router.post('/:tourId' , createReview)

export default router;