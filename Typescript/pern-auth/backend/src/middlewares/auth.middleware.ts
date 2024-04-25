import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config, prisma } from "../config/config";
import createHttpError from "http-errors";

export interface CustomRequest extends Request {
  user?: Object | any;
}

const verifyToken = asyncHandler(async (req: CustomRequest, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      const error = createHttpError(401, "Unauthorized Request");
      return next(error);
    }

    const decodedTokenInfo = jwt.verify(
      token,
      config.JWT_SECRET_KEY
    ) as JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        id: decodedTokenInfo?.userId,
      },
    });

    if (!user) {
      const error = createHttpError(401, "Unauthorized Request");
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

export { verifyToken };
