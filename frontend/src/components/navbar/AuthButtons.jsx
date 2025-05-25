import React from 'react';
import { FiBell } from 'react-icons/fi';
import axios from 'axios';

const AuthButtons = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await axios.post('http://localhost:8000/api/logout/', { refresh: refreshToken });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      alert('Logged out');
    } catch (err) {
      alert('Logout error');
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <a href="/login" className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded">Login</a>
        <a href="/signup" className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded">Signup</a>
      </>
    );
  }

  return (
    <>
      <button className="text-gray-400 hover:text-white">
        <FiBell className="h-6 w-6" />
      </button>
      <div className="relative group">
        <img
          className="h-8 w-8 rounded-full cursor-pointer"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt="profile"
        />
        <div className="absolute right-0 z-10 mt-0 w-27 bg-white rounded-md py-1 shadow-lg hidden group-hover:block">
          <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
          <a href="/Setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthButtons;
