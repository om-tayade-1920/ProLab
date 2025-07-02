import express from "express";
import {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    googleOAuth,
    deleteUser,
    signOutUser,
    userResetPassword,
    getComment
} from "../controller/userController.js";



const userRouter = express.Router();
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .put("/update/:id", verifyUserMiddleware, updateUser)
    .post("/googleuser", googleOAuth)
    .delete("/deleteuser/:id", verifyUserMiddleware, deleteUser)
    .post("/signoutuser", signOutUser)
    .get("/getusers", verifyUserMiddleware, getUser)
    .post("/reset-password", userResetPassword)
    .get('/get-user-comment/:commentUserId', getComment)

export default userRouter;
