import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from './Rating';


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = (productId) => {
    console.log(`Add to Cart clicked for product ID: ${productId}`);
  };

  const handleBuyNow = (productId) => {
    console.log(`Buy Now clicked for product ID: ${productId}`);
  };

  if (!product) return <p className="p-4">Loading...</p>;

  return (

    <>

    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left Side - Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
          />
        </div>

        {/* Right Side - Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h1>brand : {product.brand}</h1>
          <p className="text-blue-700 text-xl font-semibold mt-2">
            Price: ${product.price}
          </p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <p className="text-sm text-yellow-500 mt-2">
            Rating: {product.average_rating ?? 'No rating yet'}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleBuyNow(product.id)}
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>


     {/* Divider */}
      <hr className="my-6" />

      {/* Description Section */}
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-3xl">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Product Description</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed">
            {product.description?.split('.').map((point, index) =>
            point.trim() && <li key={index}>{point.trim()}</li>
            )}
        </ul>
        </div>
      </div>

     
      <Rating productId={product.id} />

    </>
  );
}

export default ProductDetail;
