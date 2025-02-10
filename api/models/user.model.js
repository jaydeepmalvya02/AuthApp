import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({ 
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    
  },
  password:{
    type:String,
    required:true,
    minlength:8,

  },
  avatar:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQSwlI2jh42geitbgpoByIXfaR_2J9Dl3XJQ&s",
  }

},{timestamps:true})

const User=mongoose.model('User',userSchema);
export default User;