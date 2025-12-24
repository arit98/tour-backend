import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/user.middleware.js";

const router = Router();

// update an existing user
router.put("/:id",verifyUser, updateUser);

// delete an existing user
router.delete("/:id",verifyUser, deleteUser);

// get details of a single user
router.get("/:id", verifyUser, getSingleUser);

// get all users
router.get("/",verifyAdmin, getAllUsers);

export default router;
