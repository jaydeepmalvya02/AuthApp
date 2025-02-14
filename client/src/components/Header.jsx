import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Header() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='bg-gradient-to-r from-blue-300 to-purple-400 shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
      <Link to='/' className="text-2xl font-extrabold group cursor-pointer">
      <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-md group-hover:from-blue-400 group-hover:to-blue-600'>
            Auth
            </span>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700 drop-shadow-md group-hover:from-purple-400 group-hover:to-purple-600'>
            App
          </span>
      </Link>
      <ul className='flex gap-4 '>
        <Link to='/'>
        <li>Home</li>
        </Link>
        <Link to='/about'>
        <li>About</li>
        </Link>
        <Link to='/profile'>
        {currentUser ? (
          <img src={currentUser.avatar} alt="Avatar" 
          className="h-7 w-7 rounded-full object-cover "/>
        ) :(<li>SignIn</li>)}
        
        </Link>
      </ul>
      </div>
      </div>
  )
}
