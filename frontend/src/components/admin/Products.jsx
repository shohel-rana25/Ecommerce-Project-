
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentMethods from '../category/PaymentMethods ';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <>
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="cursor-pointer bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
        >
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        
          <p className="text-blue-600 font-bold mt-2">${product.price}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          <p className="text-sm text-yellow-500">Rating: {product.average_rating ?? 'No rating yet'}</p>
        </div>
      ))}
    </div>

   
    </div>
     
     <PaymentMethods/>
    </>
  );
}

export default Products