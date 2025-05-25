import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  return (
    <div className="relative group">
      <button className="text-gray-300 hover:text-white cursor-pointer">Categories</button>
      <div className="absolute top-full left-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
        <ul className="py-1">
          {categories.map(category => (
            <li key={category.id}>
              <a
                href={`/category/${category.id}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropdown;
