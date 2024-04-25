import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";

const prisma = new PrismaClient()

const registerUser = asyncHandler(async (req, res) => {
    
});

const loginUser = asyncHandler(async (req, res) => {});

const updateUser = asyncHandler(async (req, res) => {});

const getUser = asyncHandler(async (req, res) => {});

const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, updateUser, logoutUser, getUser };
