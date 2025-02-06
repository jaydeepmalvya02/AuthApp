import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  const[formData,setFormData]=useState({})
  const[error,setError]=useState(false)
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleChange=(e)=>{
    
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  console.log(formData)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data=await res.json()
      setLoading(false)
      if(data.success===false){
        setError(true)
        return;
      }
      navigate('/')
    } catch (error) {
      setError(true)
      setLoading(false)
    }
    console.log(data)
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
      </form>
      <div className=" flex gap-2 mt-5 ">
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
        <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
