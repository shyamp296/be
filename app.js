const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const userRoutes = require("./routes/user_route");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/" , express.static('uploads'))

app.use(userRoutes);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server Is Running On : ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
