import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function SignUp() {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()
  

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  console.log(formData)
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res=await fetch(`/api/auth/signup`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data=await res.json();
      setLoading(false);
      if (data.success===false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
       setLoading(false);
       setError(true);

    }
    console.log(data);

  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>{loading ?'Loading...' : 'Sign Up'}</h1>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col  my-7 gap-4'>
        <input
        className='bg-slate-100 border rounded-lg p-3' 
        type='text' 
        id='username'
        placeholder='Username'
        onChange={handleChange}
        />
        

        <input 
        className='bg-slate-100 border rounded-lg p-3' 
        type='email' 
        id='email'
        placeholder='Email'
        onChange={handleChange}
        />
        

        <input 
        className='bg-slate-100 border rounded-lg p-3' 
        type='password' 
        id='password'
        placeholder='Password'
        onChange={handleChange}
        />
        

        <button 
        disabled={loading}
        className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-80' 
        >SignUp</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
    </div>
  )
}
