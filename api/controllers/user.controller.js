import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs';
export const test=(req,res)=>{
  res.json({message:"Api success"})
}

export const updateUser=async(req,res,next)=>{
  if (req.user.id!==req.params.id){
    return next(errorHandler(403,"You can update only yout account"));
  }
  try {
    
    if (req.body.password){
      req.body.password =  bcryptjs.hashSync(req.body.password,12)
    }

    const updatedUser =  await User.findByIdAndUpdate(req.params.id,
      {
        $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password ,
        avatar:req.body.avatar,
      }
    },
    {new:true}
    );
   const {password,...rest} = updatedUser._doc;
    // const data=res.json(updatedUser);
    res.status(201).json(rest);
    // console.log(data)
    
  } catch (error) {
    next(error)
    
  }
}
export const deleteUser=async(req,res,next)=>{
  if (req.user.id!==req.params.id){
    return next(errorHandler(403,"You can delete only yout account"));
  }
  try {
    const data=await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted...")
  } catch (error) {
    next(errorHandler(401,"user not found"))
  }
}