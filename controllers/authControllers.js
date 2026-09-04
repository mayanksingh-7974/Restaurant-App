import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    //check existing user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already registered",
      });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "successfully registerd",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

//LOGIN || POOST
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT
    const token = JWT.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Remove password from response
    const userData = user.toObject();
    delete userData.password;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user: userData,
    });

  } catch (error) {
    console.log("Error in Login API:", error);

    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

export { registerController, loginController };
