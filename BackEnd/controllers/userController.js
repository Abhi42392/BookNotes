import validator from 'validator'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import notesModel from '../models/notesModel.js'


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const register=async(req,res)=>{
    const{password,email,name}=req.body;
    try{
        if(!name||!password||!email){
            return res.json({success:false,message:"Credentials missing"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password is too small"})
        }
        const user=await userModel.findOne({email});
        if(user){
            return res.json({success:false,message:"Account already exist, try login"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await userModel({name,email,password:hashedPassword});
        await newUser.save();
        const token=createToken(newUser._id);
        return res.json({success:true,token})
    }catch(err){
        return res.json({success:false,message:err})
    }
}

const login=async(req,res)=>{
    const{email,password}=req.body;
   try{
    const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"Account doesn't exist, try register"})
    }
    const compare=await bcrypt.compare(password,user.password);
    if(!compare){
        return res.json({success:false,message:"Incorrect Password"})
    }
    const token=createToken(user._id);
    return res.json({success:true,token})
   }catch(err){
      return res.json({success:false,message:err.message})
   }
}

const editUserInfo=async(req,res)=>{
    try{
        const{userId,phone,name,email}=req.body;
        console.log(phone,name,email)
        if(!name||!phone||!email){
            return res.json({success:false,message:"Insufficient Credentials"})
        }
        const image=req.file;
        await userModel.findByIdAndUpdate(userId,{name,email,phone})
        if(image){
            const imageUpload=await cloudinary.uploader.upload(image.path,{resource_type:"image"});
            const imageUrl=imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        return res.json({success:true,message:"User data updated"})
    }catch(err){
        console.log(err)
      return res.json({success:false,message:err.message})
    }
}

const getUserInfo=async(req,res)=>{
    try{
        const{userId}=req.body;
        const userData=await userModel.findById(userId).select("-password");
        if(!userData){
            return res.json({success:false,message:"No User found"})
        }
        return res.json({success:true,message:userData})
    }catch(err){
      return res.json({success:false,message:err.message})
    }
}

const lastRead=async(req,res)=>{
    try{
        const{userId,bookId}=req.body;
        const book=await notesModel.findById(bookId);
        const title=book.title;
        await userModel.findByIdAndUpdate(userId,{last_read:title});
        return res.json({success:true,message:"Last read updated"})
    }catch(err){
      return res.json({success:false,message:err.message})
    }
}

export {register,login,editUserInfo,getUserInfo,lastRead}