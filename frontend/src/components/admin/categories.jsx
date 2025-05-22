
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ navigate import
import Rating from './Rating';
import ProductDetail from './ProductDetail';
import PaymentMethods from '../category/PaymentMethods ';

function Categories() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate(); // ✅ declare navigate

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/categories/${id}/`)
      .then(res => setCategory(res.data))
      .catch(err => console.error('Failed to load category:', err));
  }, [id]);

  if (!category) return <p className="text-center mt-10 text-gray-500">Loading category...</p>;

  return (
    <>
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
      <p className="text-gray-600 mb-6">{category.description}</p>

      {category.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {category.products.map(product => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)} // ✅ navigate works now
              className="cursor-pointer bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">৳{product.price}</p>

              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <p className="text-sm text-yellow-500">Rating: {product.average_rating ?? 'No rating yet'}</p>

            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
    
    <PaymentMethods/>
    </>
  );
}

export default Categories;
