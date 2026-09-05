import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

import {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} from "../controllers/foodController.js";

const router = express.Router();

// CREATE FOOD
router.post(
  "/create",
  authMiddleware,
  createFoodController
);

// GET ALL FOOD
router.get(
  "/getAll",
  getAllFoodsController
);

// GET SINGLE FOOD
router.get(
  "/get/:id",
  getSingleFoodController
);

// GET FOOD BY RESTAURANT
router.get(
  "/getByRestaurant/:id",
  getFoodByRestaurantController
);

// UPDATE FOOD
router.put(
  "/update/:id",
  authMiddleware,
  updateFoodController
);

// DELETE FOOD
router.delete(
  "/delete/:id",
  authMiddleware,
  deleteFoodController
);

// PLACE ORDER
router.post(
  "/placeOrder",
  authMiddleware,
  placeOrderController
);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

export default router;