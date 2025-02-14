import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart,signInSuccess,signInFailure } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";


export default function SignIn() {
  const[formData,setFormData]=useState({})
  const {error,loading}=useSelector((state)=>state.user);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleChange=(e)=>{
    
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  console.log(formData)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      // setError(false);
      // setLoading(true);
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data=await res.json()
      // setLoading(false)
      if(data.success===false){
        dispatch(signInFailure(data.message))
        // setError(true)
        return;
      }
      console.log(data)
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
      // setError(true)
      // setLoading(false)
    }
    
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl  text-center font-semibold p-2 mt-4'>SignIn</h1>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col my-7 gap-4'>
        <input 
        onChange={handleChange}
        className='bg-slate-100 border rounded-lg p-2'  
        type='email'
        id='email' 
        placeholder='Email'/>
        <input 
        onChange={handleChange}
        className='bg-slate-100 border rounded-lg p-2'  
        type='password'
        id='password' 
        placeholder='Password'/>
        <button className='bg-slate-700 text-white border rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>SignIn</button>
        <OAuth/>
      </form>
      <div className=" flex gap-2 mt-5 ">
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
        <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ?error.message || 'something went wrong!':''}</p>
    </div>
  )
}
