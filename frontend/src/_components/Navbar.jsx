import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const handleLogin = () => {
   navigate('/login')
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">My Application</div>
        <div className="space-x-4 flex items-center">
          {isLoggedIn ? (
            <>
              <button className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
                Logout
              </button>
              <button className="bg-green-500 hover:bg-green-600">User Dashboard</button>
            </>
          ) : (
            <>
              <button className="bg-blue-500 hover:bg-blue-700" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;