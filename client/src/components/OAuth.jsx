import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const handleGoogleClick=async()=>{
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app);
      const  result= await signInWithPopup(auth,provider);
      const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        }),
      })
      const data=await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log('Could not login with Google',error)
    }
  }
  return (
    <div className=''>
      <button type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white w-full mx-auto text-center uppercase p-3 mt-3 border rounded-lg hover:opacity-95 '> Continue with google</button>
    </div>

  )
}     

