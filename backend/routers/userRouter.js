import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

//first i will use express to create a new router

const userRouter = express.Router();
//creating an api
//function should be async because i am using mongoose
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //after creating users in data.js i will create them in that async function
    //insertMany function creates the users in mangoDb
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
    //now next step is connecting to mangoDb, i will edit server.js for that
  })
);
export default userRouter;
