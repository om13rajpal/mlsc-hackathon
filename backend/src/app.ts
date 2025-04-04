import express from "express";
import connectDB from "./db/db";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import logger from "./middlewares/logger";
import cors from "cors";
import { authRouter, teamRouter } from "./routes/routes";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/api", authRouter);
app.use("/api", teamRouter);

app.get("/", (req, res) => {
  res.send("Backend is up and running");
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
