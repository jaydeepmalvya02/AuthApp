import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form className='flex flex-col  my-7 gap-4'>
        <input className='bg-slate-100 border rounded-lg p-3' type='text' placeholder='Username'/>
        <input className='bg-slate-100 border rounded-lg p-3' type='email' placeholder='Email'/>
        <input className='bg-slate-100 border rounded-lg p-3' type='password' placeholder='Password'/>
        <button className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-80' type='submit'>SignUp</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      
      </div>
    </div>
  )
}
