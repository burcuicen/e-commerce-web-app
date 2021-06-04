import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

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
//creating signin router in backend
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    //checks if e mail exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //if e mail is correct check the password to see if it is correct
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //if login is succesfull send user info
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          //i will use jsonwebtoken to generate token
          token: generateToken(user),
        });
        return;
      }
    }
    //if login is not succesfull send an error message to user
    res.status(401).send({ message: "Invalid email or password, try again" });
  })
);
//sending post request for user register
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    //creating new user
    const user = new User({
      //collecting the info user enters in name input
      name: req.body.name,
      //collecting the info user enters in email input
      email: req.body.email,
      //collecting the info user enters in password input and encrypt it using bcrypt
      password: bcrypt.hashSync(req.body.password, 8),
    });
    //creatiing a new user and set the new user to created user above

    const createdUser = await user.save();
    //it sends the info of user to frontend
    res.send({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      //i will use jsonwebtoken to generate token
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
