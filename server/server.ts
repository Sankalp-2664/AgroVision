import express from "express";
import { connectDB } from "./lib/db";
require("dotenv").config();

export const app = express();
connectDB();

// Creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
