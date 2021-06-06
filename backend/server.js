import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();
//it parses json data in the body of request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to connect mongoose to mangodb we need 2 parameters;
//first one, is the link of localhost
//second one, is options
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/venus", {
  //options for database,default,to get rid of duplicated warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//using upload image file in server
app.use("/api/uploads", uploadRouter);

app.use("/api/users", userRouter); //using api for users
app.use("/api/products", productRouter); //using api for products
app.use("/api/orders", orderRouter); //using api for orders

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
