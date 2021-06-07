//creating router file using express to use order model
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";
//creating express router
const orderRouter = express.Router();
//this router sends request of list of orders
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name");
    res.send(orders);
  })
);
//post request to mongodb
orderRouter.post(
  "/",
  isAuth, //middleware i defined in utils to check the users token
  expressAsyncHandler(async (req, res) => {
    //if there is any items in the card send an error message, if not create new order
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        //fetching data from body
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, //setting user to user object to fetch user info
      });
      //saving the created order
      const createdOrder = await order.save();
      res
        //sends the message if successfull
        .status(201)
        //passing the order to frontend by sending this
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //finding order data
    const order = await Order.findById(req.params.id);
    //if order exist, send it, otherwise status error
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
