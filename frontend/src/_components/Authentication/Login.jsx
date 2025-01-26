import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, resetError } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const [authData,setAuthData] = useState({})
  const dispatch = useDispatch()
  const auth  = useSelector((state)=>state.auth)
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    dispatch(resetError());
    dispatch(loginUser(authData));
  }

  useEffect(() => {
    if (auth.error) {
      alert(auth.error); 
    }
    if (!auth.error && auth.user) {
      navigate('/form-builder'); 
    }
  }, [auth.error, auth.user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e)=>{ setAuthData({...authData , "email":e.target.value})}}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e)=>{ setAuthData({...authData , "password":e.target.value})}}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:outline-none"
          >
            Login
          </button>
          <div className="mt-4 mb-2">Don't have an account?</div>
          <Link to={'/signup'}>
            <button
                type="submit"
                className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none"
            >
                Signup
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
