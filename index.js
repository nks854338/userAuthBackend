const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");

const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://user-auth-frontend-nine.vercel.app/",
  method: ['GET', 'POST'],
  credentials:true,
  allowedHeaders: "Content-Type, Authorization",
}));

app.options('*', cors()); 

mongoose
  .connect(
    "mongodb+srv://nks854338:Nandani50%25@students.a0ydx.mongodb.net/userAuth"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
