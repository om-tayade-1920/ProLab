import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  signOutUser,
  
} from "../controller/userController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";

const userRouter = express.Router();

// Routes
userRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .put("/update/:id", verifyUserMiddleware, updateUser)
  .post("/signoutuser", signOutUser)
  .get("/getusers", verifyUserMiddleware, getUser)
   

export default userRouter;
