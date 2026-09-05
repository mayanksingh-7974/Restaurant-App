import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} from "../controllers/restaurantController.js";

const router = express.Router();

// CREATE RESTAURANT || POST
router.post(
  "/create",
  authMiddleware,
  createRestaurantController
);

// GET ALL RESTAURANTS || GET
router.get(
  "/getAll",
  getAllRestaurantController
);

// GET RESTAURANT BY ID || GET
router.get(
  "/get/:id",
  getRestaurantByIdController
);

// DELETE RESTAURANT || DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  deleteRestaurantController
);

export default router;