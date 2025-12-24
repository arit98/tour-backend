import Tour from "../models/tour.model.js";
import Review from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// create review
export const createReview = asyncHandler(async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();

    // existing review update
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json(new ApiResponse(200, savedReview, "Successfully login"));
  } catch (error) {
    throw new ApiError(500, "Failed submit");
  }
});
