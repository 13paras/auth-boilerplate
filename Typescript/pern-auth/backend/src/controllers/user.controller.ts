import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";
import {
  signinBody,
  signupBody,
  updateBody,
  updatePasswordBody,
} from "../utils/userValidation";
import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";
import { NextFunction, Request, Response } from "express";
import { any } from "zod";
import { CustomRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/config";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const validatedResult = signupBody.safeParse(body);

      if (!validatedResult.success) {
        const error = createHttpError(400, validatedResult.error);
        return next(error);
      }

      const existedUser = await prisma.user.findUnique({
        where: {
          email: body.email,
          username: body.username,
        },
      });

      if (existedUser) {
        const error = createHttpError(400, "User already existed");
        return next(error);
      }

      const securedPass = await hashPassword(body.password);

      const user = await prisma.user.create({
        data: {
          id: body.id,
          fullName: body.fullName,
          username: body.username,
          email: body.email,
          password: securedPass,
        },
      });

      if (user) {
        generateToken(user.id, res);

        res.status(201).json({
          message: "User registered successfully",
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const loginUser = asyncHandler(async (req, res, next: NextFunction) => {
  try {
    const body = req.body;
    const validatedResult = signinBody.safeParse(body);

    if (!validatedResult.success) {
      const error = createHttpError(400, validatedResult.error);
      return next(error);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        username: body.username,
      },
    });

    const matchPassword = bcrypt.compareSync(body.password, user.password);

    if (user && matchPassword) {
      generateToken(user.id, res);

      return res.status(200).json({
        message: "User logged in successfully",
        id: user.id,
      });
    } else {
      const error = createHttpError(400, "Invalid credentials");
      return next(error);
    }
  } catch (error) {
    console.log(error);
  }
});

const updateUser = asyncHandler(async (req: CustomRequest, res, next) => {
  try {
    const body = req.body;
    const validatedResult = updateBody.safeParse(body);

    if (!validatedResult.success) {
      const error = createHttpError(400, validatedResult.error);
      return next(error);
    }

    const user = await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: {
        fullName: body?.fullName,
        username: body?.username,
      },
    });

    if (user) {
      res.status(200).json({
        message: "User updated successfully",
        id: user.id,
      });
    } else {
      const error = createHttpError(400, "User not found");
      return next(error);
    }
  } catch (error) {
    console.log(error);
  }
});

const updatePassword = asyncHandler(async (req: CustomRequest, res, next) => {
  const body = req.body;
  const validatedResult = updatePasswordBody.safeParse(body);

  if (!validatedResult.success) {
    const error = createHttpError(400, validatedResult.error);
    return next(error);
  }

  const user = await prisma.user.update({
    where: {
      id: req.user?.id,
    },
    data: {
      password: await hashPassword(body.password),
    },
  });

  if (!user) {
    const error = createHttpError(400, "User not found");
    return next(error);
  }

  res.status(200).json({
    message: "Password updated successfully",
  });
});

const getUser = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });

    if (user) {
      res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const logoutUser = asyncHandler(async (_, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
});

export {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUser,
  updatePassword,
};
