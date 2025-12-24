import { Router } from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getFeaturedTours,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tour.controller.js";
import { verifyAdmin } from "../middlewares/user.middleware.js";

const router = Router();

// create a new tour
router.post("/", verifyAdmin, createTour);

// update an existing tour
router.put("/:id", verifyAdmin, updateTour);

// delete an existing tour
router.delete("/:id", verifyAdmin, deleteTour);

// get details of a single tour
router.get("/:id", getSingleTour);

// get all tours
router.get("/", getAllTours);

// get tours by search
router.get("/search/get", getTourBySearch);

// get all featured tours
router.get("/search/get-featured-tours", getFeaturedTours);

// get tour count
router.get("/search/get-tour-count", getTourCount);

export default router;
