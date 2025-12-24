import Tour from "../models/tour.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create tour
export const createTour = asyncHandler(async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res
      .status(200)
      .json(new ApiResponse(200, savedTour, "Successfully created"));
  } catch (error) {
    throw new ApiError(404, "Failed to create. Try again");
  }
});

// get a single tour
export const getSingleTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleTour = await Tour.findById(id).populate("reviews");
    res.status(200).json(new ApiResponse(200, getSingleTour));
  } catch (error) {
    throw new ApiError(404, "Does the tour really exist?");
  }
});

// get all tours
export const getAllTours = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const getAllTours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json(new ApiResponse(200, getAllTours));
  } catch (error) {
    throw new ApiError(404, "Failed to get tours, Try again");
  }
});

// update an existing tour
export const updateTour = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json(new ApiResponse(200, updateTour, "Successfully updated"));
  } catch (error) {
    throw new ApiError(404, "Tour not found");
  }
});

// delete an existing tour
export const deleteTour = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Successfully deleted"));
  } catch (error) {
    throw new ApiError(404, "Tour not found");
  }
});

// get tour by searching
export const getTourBySearch = asyncHandler(async (req, res) => {
  try {
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json(new ApiResponse(200, tours, "Successful"));
  } catch (error) {
    throw new ApiError(404, "Tour not found");
  }
});

// get tour by it's features
export const getFeaturedTours = asyncHandler(async (_, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json(new ApiResponse(200, tours, "Successful"));
  } catch (error) {
    throw new ApiError(404, "Tour not found");
  }
});

// tour count
export const getTourCount = asyncHandler(async (_, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json(new ApiResponse(200, tourCount, "Successful"));
  } catch (error) {
    throw new ApiError(404, "Failed to fetch");
  }
});
