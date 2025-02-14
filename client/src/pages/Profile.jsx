import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../../redux/user/userSlice';

export default function Profile() {
  const {currentUser,loading,error}=useSelector(state=> state.user)
  const [formData,setFormData]=useState({})
  const dispatch=useDispatch()
  // const [loading,setLoading]=useState(false)
  // const [error,setError]=useState(false)
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  console.log(formData) 
  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {

      dispatch(updateUserStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data)
      if (data.success===false){
        dispatch(updateUserFailure(data))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log('Error updating user', error)  // for debugging purposes only, remove in production!  // error will contain a detailed message about the error that occurred.  // you might want to show this error to the user in a more user-friendly way.  // for example, you could show an error message to the user, and then re-enable the form submission button.  // this is just a simple example, and you might want to do something more complex depending
      
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form  
      onSubmit={handleSubmit}
      className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="Avatar" className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2" />
      <input 
      onChange={handleChange}
      defaultValue={currentUser.username}
      type="text" 
      className="bg-slate-100 rounded-lg p-3" 
      id='username'
      placeholder='username'/>
      <input 
      onChange={handleChange}
      defaultValue={currentUser.email}
      type="email" 
      className="bg-slate-100 rounded-lg p-3" 
      id='email'
      placeholder='email'/>
      <input
      onChange={handleChange}
      type="password" 
      className="bg-slate-100 rounded-lg p-3" 
      id='password'
      placeholder='password'/>

      <button className="uppercase text-white bg-slate-700 p-3 rounded-lg border hover:opacity-95 disabled:opacity-80 ">Update</button>
      </form>
      <div className="flex justify-between ">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!' }</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User is updated successfully ' }</p>
      
    </div>
  )
}
