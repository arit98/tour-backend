import Booking from "../models/booking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create booking
export const createBooking = asyncHandler(async (req, res) => {
  const newBooking = await Booking(req.body);
  try {
    const savedBooking = await newBooking.save();

    res
      .status(200)
      .json(new ApiResponse(200, savedBooking, "Your tour is booked"));
  } catch (error) {
    throw new ApiError(500, "internal server error");
  }
});

// get a single book
export const getSingleBooking = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    const book = await Booking.findById(id)

    res
      .status(200)
      .json(new ApiResponse(200, book, "Successful"));
    
  } catch (error) {
    throw new ApiError(404, "Not Found")
  }
});

// get all bookings
export const getAllBooking = asyncHandler(async (_, res) => {
  try {
    const book = await Booking.find()

    res
      .status(200)
      .json(new ApiResponse(200, book, "Successful"));
    
  } catch (error) {
    throw new ApiError(500, "internal server error")
  }
});
