const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

// INITIALIZE BACKEND
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  "/imageStorage/",
  express.static(path.join(__dirname, "/imageStorage"))
);

// ROUTES
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const postsRoute = require("./routes/PostsRoute");
const categoryRoute = require("./routes/CategoriesRoute");
const imageUploader = require("./imageUploader/ImageUploader");

// IMPLEMENT ROUTES
app.use("/auth/", authRoute);
app.use("/users/", userRoute);
app.use("/posts/", postsRoute);
app.use("/categories/", categoryRoute);
app.use("/upload/", imageUploader);

// CONNECT TO DATABASE AND LISTEN TO PORT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
