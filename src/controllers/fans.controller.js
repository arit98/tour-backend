import FansComments from "../models/fans.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllFans = asyncHandler(async (_, res) => {
  try {
    const getAll = await FansComments.find({});

    res.status(200).json(new ApiResponse(200, getAll));
  } catch (error) {
    throw new ApiError(500, "Failed to get comments");
  }
});
