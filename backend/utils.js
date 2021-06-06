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
//to define the user that creates the user we neeed to implement middleware for it

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  //if user is authorızed vertify its token
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //for example: Diamond XXXXXX, We need last 6 digits
    //using jwt to vertify token
    jwt.verify(
      token,
      //fetching the secret word if exist
      process.env.JWT_SECRET || "somesecretkeyword",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
//isAdmin function to vertify admin's token to let the admin see the contents of admin route
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //sending request to server to check if user is admin(using its token)
    next();
  } else {
    //sending message from server if admin tokens do not match
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
