import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}=useSelector(state=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form  className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="Avatar" className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2" />
      <input 
      defaultValue={currentUser.username}
      type="text" 
      className="bg-slate-100 rounded-lg p-3" 
      id='username'
      placeholder='username'/>
      <input 
      defaultValue={currentUser.email}
      type="email" 
      className="bg-slate-100 rounded-lg p-3" 
      id='email'
      placeholder='email'/>
      <input type="password" 
      className="bg-slate-100 rounded-lg p-3" 
      id='password'
      placeholder='password'/>

      <button className="uppercase text-white bg-slate-700 p-3 rounded-lg border hover:opacity-95 disabled:opacity-80 ">Update</button>
      </form>
      <div className="flex justify-between ">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
