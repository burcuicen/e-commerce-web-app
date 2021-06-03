import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

//first i will use express to create a new router

const productRouter = express.Router();
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
//creating an api
//function should be async because i am using mongoose
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //after creating products in data.js i will create them in that async function
    //insertMany function creates the products in mangoDb
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
    //now next step is connecting to mangoDb, i will edit server.js for that
  })
);
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
