import React from 'react';
import { SiGoogle } from 'react-icons/si'; 
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/API/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/Task');
      } else {
        console.error('Google sign-in failed', data);
      }
    } catch (error) {
      console.error('Could not sign in with Google', error);
    }
  };

  return (
    <button 
      onClick={handleGoogleClick} 
      type="button" 
      className="mt-4 tracking-wide font-semibold bg-[#de462b] text-black-100 w-full py-4 rounded-lg hover:bg-[#fcfcfc]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
    >
    <SiGoogle className="h-6 w-6 mr-2" />
      <span className="uppercase">Sign In with Google</span>
    </button>
  );
}

export default OAuth;
