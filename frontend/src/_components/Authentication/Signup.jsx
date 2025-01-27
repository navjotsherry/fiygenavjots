import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, resetError } from '../../store/authSlice';

const Signup = () => {
  const [authData, setAuthData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(resetError());

    // Input validation
    if (!authData.name || authData.name.trim().length < 3) {
      alert('Please enter a valid name (at least 3 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!authData.email || !emailRegex.test(authData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!authData.password || authData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    if (authData.password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // If all validations pass, proceed with signup
    try {
      dispatch(registerUser(authData));
    } catch (error) {
      alert(error.message)
    }
  };

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
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
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
              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:outline-none"
          >
            Signup
          </button>
          <div className="mt-4 mb-2">Already have an account?</div>
          <Link to={'/login'}>
            <button
              type="button"
              className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
