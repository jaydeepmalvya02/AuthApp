import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to MongoDB')).catch((err)=>{
  console.log(err);
})
const app=express();
app.use(express.json());

app.use(cors())
app.use(cookieParser());
app.listen(3000,()=>{
  console.log("Server started at port 3000");
})

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
  const statuscode=err.statuscode ||500;
  const message=err.message || 'Internal Server Error';
  return res.status(statuscode).json({
    success:false,
    message,
  statuscode
});
})