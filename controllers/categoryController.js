import categoryModel from "../models/categoryModel.js";

// CREATE CATEGORY
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }

    const newCategory = await categoryModel.create({
      title,
      imageUrl,
    });

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log("Error in Create Category API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log("Error in Get All Category API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Get All Category API",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide category ID",
      });
    }

    if (!title && !imageUrl) {
      return res.status(400).send({
        success: false,
        message: "Please provide title or image URL to update",
      });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log("Error in Update Category API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Update Category API",
      error: error.message,
    });
  }
};

// DELETE CATEGORY
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide category ID",
      });
    }

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log("Error in Delete Category API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error: error.message,
    });
  }
};

export {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};