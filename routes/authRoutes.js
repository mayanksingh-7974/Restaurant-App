import express from "express";
import {
  registerController,
  loginController
} from "../controllers/authControllers.js";

const router = express.Router();

//routes
 //Register || POST
 router.post("/register", registerController);

 //LOGIN || POST
router.post("/login", loginController);

export default router;
