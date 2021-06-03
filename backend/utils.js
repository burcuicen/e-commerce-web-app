import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  //jwt encrypt user info and generate unique token
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somesecretkeyword",
    {
      expiresIn: "30d",
    }
  );
};
