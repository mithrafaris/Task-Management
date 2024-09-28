import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from "../components/DarkModeToggle"; 
import OAuth from "../components/OAuth";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
const SignUp = () => {
  const [darkMode, setDarkMode] = useState(false); 
  const [formData, setFormData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const toggleState = () => {
    setIsShow(!isShow);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('/API/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success('Login successful', {
          icon: '👏',
        });
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message || 'Sign-in failed.');
      }
    } catch (error) {
      dispatch(signInFailure('Something went wrong'));
      toast.error('Something went wrong');
    }
  };


  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white"> &nbsp;</h3>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        }  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Login
        </h1>

        <div className="w-full mt-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
          <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
            darkMode
              ? "bg-[#302E30] text-white focus:border-white"
              : "bg-gray-100 text-black focus:border-black"
          }`}
          type="email"
        placeholder="Your email"
        id="email"
        onChange={handleChange}
      />  
          </div>
          <div>
          <input
            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
              darkMode
                ? "bg-[#302E30] text-white focus:border-white"
                : "bg-gray-100 text-black focus:border-black"
            }`}
            type={isShow ? 'text' : 'password'}
            placeholder="Password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          </div>
          
          <button
          disabled={loading}
          type="submit" 
          className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <svg
              className="w-6 h-6 -ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">{loading ? 'Loading....' : 'Login'}</span>
          </button>
          <div className="w-full flex items-center justify-center my-4">
          <p className="text-lg text-red-600">or</p>
        </div>
          <OAuth/>
        </form>
           
          </div>
          
        <p className="mt-6 text-xs text-gray-600 text-center">
        Have an account?
        <Link to="/sign-up">
          <span className="text-[#E9522C] font-semibold">Register</span>
        </Link>
      </p>
        
      </div>
    </div>
  );
};

export default SignUp;
