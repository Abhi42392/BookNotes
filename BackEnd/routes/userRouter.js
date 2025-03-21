import express from "express"
import { register,login, editUserInfo, getUserInfo, lastRead } from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import authUser from '../middleware/authUser.js'
const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login)
userRouter.post("/edit-user-info",upload.single('image'),authUser,editUserInfo)
userRouter.post("/get-user-info",authUser,getUserInfo)
userRouter.post("/last-read",authUser,lastRead)
export default userRouter;