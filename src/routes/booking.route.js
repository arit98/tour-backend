import express from "express"
import { createBooking, getAllBooking, getSingleBooking } from "../controllers/booking.controller.js";

const router = express.Router()

// create booking
router.post('/', createBooking)

// get a single booking
router.get('/:id', getSingleBooking)

// get all bookings
router.get('/', getAllBooking)

export default router;