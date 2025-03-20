import express from "express";
import { connectDB } from "./lib/db";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

export const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

// routes


// Creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
