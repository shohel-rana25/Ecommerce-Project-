
// import React, { useState } from 'react';
// import { FiBell, FiSearch } from 'react-icons/fi';
// import Login from './../user/Login';


// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <nav className="bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
//         {/* Left Side */}
//         <div className="flex items-center space-x-4">
//           <a href="/" className="text-white font-semibold text-lg">Ecommerce</a>
//           <a href="/" className="text-gray-300 hover:text-white">Home</a>
//           <a href="/Cart" className="text-gray-300 hover:text-white">Cart</a>
//            <a href="/Categories" className="text-gray-300 hover:text-white">Categories</a>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center space-x-4 relative">

//           {/* Search bar - Always visible */}
//           <div className="relative text-gray-400">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-1 focus:outline-none"
//             />
//             <button className="absolute right-2 top-1.5">
//               <FiSearch className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Show Login/Signup if not logged in */}
//           {!isLoggedIn ? (
//             <>
//               <button
//                 onClick={() => setIsLoggedIn(true)} // For demo, clicking login sets login state
//                 className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded"
//               >
//                 <a href='/Login'>Login </a>
//               </button>
//               <button className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded">
//                 <a href='/Signup'>Signup </a>
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Notification icon */}
//               <button className="text-gray-400 hover:text-white">
//                 <FiBell className="h-6 w-6" />
//               </button>

//               {/* Profile dropdown */}
//               <div className="relative">
//                 <img
//                   className="h-8 w-8 rounded-full cursor-pointer"
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
//                   alt="profile"
//                   // For demo, clicking profile logs out
//                   onClick={() => setIsLoggedIn(false)}
//                 />
//                 <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
//                   <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
//                   <a href="/Setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
//                   <a href="/Logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
//                 </div>
//               </div>
//             </>
//           )}

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { FiBell, FiSearch } from 'react-icons/fi';
// import axios from 'axios';

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // Check login status on mount
//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/categories/')
//       .then(res => setCategories(res.data))
//       .catch(err => console.error('Failed to load categories:', err));
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refresh_token');
//       await axios.post('http://localhost:8000/api/logout/', { refresh: refreshToken });
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       setIsLoggedIn(false);
//       alert('Logged out');
//     } catch (err) {
//       alert('Logout error');
//     }
//   };

//   return (
//     <nav className="bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
//         {/* Left Side */}
//         <div className="flex items-center space-x-4 relative">
//           <a href="/" className="text-white font-semibold text-lg">Ecommerce</a>
//           <a href="/" className="text-gray-300 hover:text-white">Home</a>
//           <a href="/Cart" className="text-gray-300 hover:text-white">Cart</a>

//           {/* Dropdown Categories */}
//           <div className="relative group">
//             <button className="text-gray-300 hover:text-white cursor-pointer">
//               Categories
//             </button>
//             <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
//               <ul className="py-1">
//                 {categories.map(category => (
//                   <li key={category.id}>
//                     <a
//                       href={`/category/${category.id}`}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       {category.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center space-x-4 relative">
//           {/* Search Bar */}
//           <div className="relative text-gray-400">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-1 focus:outline-none"
//             />
//             <button className="absolute right-2 top-1.5">
//               <FiSearch className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Conditional Rendering based on login */}
//           {!isLoggedIn ? (
//             <>
//               <a href="/login" className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded">
//                 Login
//               </a>
//               <a href="/signup" className="text-gray-300 hover:text-white px-3 py-1 border border-gray-300 rounded">
//                 Signup
//               </a>
//             </>
//           ) : (
//             <>
//               <button className="text-gray-400 hover:text-white">
//                 <FiBell className="h-6 w-6" />
//               </button>
//               <div className="relative group">
//                 <img
//                   className="h-8 w-8 rounded-full cursor-pointer"
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
//                   alt="profile"
//                 />
//                 <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md py-1 shadow-lg hidden group-hover:block">
//                   <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
//                   <a href="/Setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4 relative">
          <a href="/" className="text-white font-semibold text-lg">Ecommerce</a>
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/Cart" className="text-gray-300 hover:text-white">Cart</a>
          <CategoryDropdown />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          <SearchBar />
          <AuthButtons isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
