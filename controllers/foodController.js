import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    // Validation
    if (!title || !description || price === undefined || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newFood = await foodModel.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    res.status(201).send({
      success: true,
      message: "New food item created successfully",
      food: newFood,
    });
  } catch (error) {
    console.log("Error in Create Food API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      error: error.message,
    });
  }
};

// GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("Error in Get All Foods API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Get All Foods API",
      error: error.message,
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log("Error in Get Single Food API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Get Single Food API",
      error: error.message,
    });
  }
};

// GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide restaurant ID",
      });
    }

    const foods = await foodModel.find({
      restaurant: id,
    });

    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("Error in Get Food By Restaurant API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Get Food By Restaurant API",
      error: error.message,
    });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.log("Error in Update Food API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error: error.message,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }

    const food = await foodModel.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
      food,
    });
  } catch (error) {
    console.log("Error in Delete Food API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Delete Food API",
      error: error.message,
    });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid food cart",
      });
    }

    const total = cart.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    const newOrder = await orderModel.create({
      foods: cart,
      payment: total,
      buyer: req.user.id,
    });

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in Place Order API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error: error.message,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide valid order ID",
      });
    }

    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Please provide order status",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in Order Status API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
      error: error.message,
    });
  }
};

export {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};