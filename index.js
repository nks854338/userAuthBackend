const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");

const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://nks854338:Nandani50%25@students.a0ydx.mongodb.net/userAuth"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});















// const express = require("express");
// const cookieParse = require('cookie-parser');
// const { connectToMongoDB } = require("./connect");
// const {cheakForAuthentication, restrictTo} = require('./middleware/auth');
// const cors = require('cors');

// const staticRoute = require("./routes/staticRouter");
// const userRoute = require("./routes/user");

// const app = express();
// const port = 8001;

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

// app.use(cors({
//   origin: '*'
// }));

// connectToMongoDB("mongodb+srv://nks854338:Nandani50%25@students.a0ydx.mongodb.net/userAuth").then(() =>
//   console.log("connected to mongoDB")
// );

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParse());
// app.use(cheakForAuthentication);

// app.use("/user", userRoute);
// app.use("/", staticRoute);

// app.listen(port, () => console.log(`server started at ${port}`));
