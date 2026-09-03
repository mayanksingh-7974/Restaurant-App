import express from "express";
import { testUserController } from "../controllers/testController.js";

const router = express.Router();

router.get("/test-user", testUserController);

export default router;