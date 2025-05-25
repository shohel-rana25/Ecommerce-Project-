import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className="relative text-gray-400">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-1 focus:outline-none"
      />
      <button className="absolute right-2 top-1.5">
        <FiSearch className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
