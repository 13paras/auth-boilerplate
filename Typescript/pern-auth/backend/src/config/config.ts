import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

const _config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export const config = Object.freeze(_config);

export const prisma = new PrismaClient()
