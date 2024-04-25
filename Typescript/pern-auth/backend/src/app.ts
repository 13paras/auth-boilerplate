import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Routers
import { router as userRouter } from "./routes/user.routes";

app.use("/api/v1/user", userRouter);

export { app };
