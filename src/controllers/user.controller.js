import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// get a single user
export const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleUser = await User.findById(id);
    res.status(200).json(new ApiResponse(200, getSingleUser));
  } catch (error) {
    throw new ApiError(404, "Does the user really exist?");
  }
});

// get all users
export const getAllUsers = asyncHandler(async (_, res) => {
  try {
    const getAllUsers = await User.find({});

    res.status(200).json(new ApiResponse(200, getAllUsers));
  } catch (error) {
    throw new ApiError(404, "Failed to get users, Try again");
  }
});

// update an existing user
export const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json(new ApiResponse(200, updateUser, "Successfully updated"));
  } catch (error) {
    throw new ApiError(404, "User not found");
  }
});

// delete an existing user
export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Successfully deleted"));
  } catch (error) {
    throw new ApiError(404, "User not found");
  }
});
