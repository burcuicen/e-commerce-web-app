import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

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
//create product api
//only logged in admin users can use this api
//save newly created product
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "New Product " + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "Category",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "Description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
//backend of the product update function
//this request gets the updated data from frontend and saves the new data to database
//product router to update product in edit product screen
productRouter.put(
  //only logged in admins can reach the page

  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    //getting id
    const productId = req.params.id;
    //getting product from database
    const product = await Product.findById(productId);
    //if it exists get the new info to update
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      //save the update
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
//router to delete product
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    //finding id in database
    const product = await Product.findById(req.params.id);
    if (product) {
      //remove product
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
