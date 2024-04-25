import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").put(verifyToken, updateUser).get(verifyToken, getUser);
router.put("/update-password", verifyToken, updatePassword);
router.post("/logout", logoutUser);

export { router };
