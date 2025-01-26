import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloadUserSlice } from './store/authSlice';

const AuthWrapper = ({ children }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      const token = {token:storedToken}
      if (!token) {
        return;
      }
    dispatch(reloadUserSlice(token))
    };
    verifyToken();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
