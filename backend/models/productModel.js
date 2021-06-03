import mongoose from "mongoose";
//creates product schema
//takes two objects one for product information, one for time of last updates of the product
const productSchema = new mongoose.Schema(
  {
    //product name
    name: { type: String, required: true, unique: true },
    //image of the product(url)
    image: { type: String, required: true },
    //product category
    category: { type: String, required: true },
    //product description
    description: { type: String, required: true },
    //product price
    price: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  {
    //it shows the time of last changes of the product in the database
    timestamps: true,
  }
);
//creating the model in mongoose
const Product = mongoose.model("Product", productSchema);
//exporting
export default Product;
