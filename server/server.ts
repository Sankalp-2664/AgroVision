import express from "express";
require("dotenv").config();

export const app = express();

// Creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
