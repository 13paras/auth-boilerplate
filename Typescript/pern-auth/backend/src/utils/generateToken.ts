import { Response } from "express";
import { config } from "../config/config";
import { asyncHandler } from "./asyncHandler";
import jwt from "jsonwebtoken";

export const generateToken = (userId: Number, res: Response ) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET_KEY as string, {
    expiresIn: "4d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 4 * 24 * 60 * 60 * 1000,
  });
};
