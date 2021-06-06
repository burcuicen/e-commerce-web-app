//to let admin to upload a picture i will use multer library
import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

//new express router
const uploadRouter = express.Router();
//define a multer disk storage to upload folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    //creating a new folder for uploads
    cb(null, "uploads/"); //first is null in case of error, the other is destination for uploads
  },
  filename(req, file, cb) {
    //name of file
    cb(null, `${Date.now()}.png`);
  },
});
//upload middleware
const upload = multer({ storage });
//when there is a file it will be automatically uploaded to uploads folder
uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
