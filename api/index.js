const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
const userRoute = require("./routes/user");

const app = express();

const port = 5000;

app.use(cors());
app.options("*", cors());
app.use("/", userRoute);

mongoose
  .connect("mongodb+srv://nks854338:Nandani50%25@students.a0ydx.mongodb.net/userAuth")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
