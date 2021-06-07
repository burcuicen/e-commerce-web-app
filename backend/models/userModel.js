import mongoose from "mongoose";
//creates user schema
//takes two objects one for user information, one for time of last updates of the user
const userSchema = new mongoose.Schema(
  {
    //username
    name: { type: String, required: true },
    //email of the user(it should be uniqe so i put uniqe true)
    //mangoose will search for if email exist in the database
    email: { type: String, required: true, unique: true },
    //password of the user
    password: { type: String, required: true },
    //there are 2 types of users, admins and costumers. This boolean value checks if user is an admin or costumer
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
  },
  {
    //it shows the time of last changes of the user in the database
    timestamps: true,
  }
);
//creating the model in mongoose
const User = mongoose.model("User", userSchema);
//exporting
export default User;
