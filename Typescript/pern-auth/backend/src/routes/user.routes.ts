import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").put(updateUser).get(getUser);
router.post("/logout", logoutUser);

export { router };
