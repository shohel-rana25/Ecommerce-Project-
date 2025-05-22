import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PaymentMethods from '../category/PaymentMethods ';

function Rating({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [cnt3, setCnt3] = useState(0);
  const [cnt4, setCnt4] = useState(0);
  const [cnt5, setCnt5] = useState(0);

  const fetchReviews = () => {
    axios.get(`http://127.0.0.1:8000/api/reviews/by_product/?product=${productId}`)
      .then(res => {
        const data = res.data;
        setReviews(data);

        // Count ratings
        let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;
        data.forEach(review => {
          switch (review.rating) {
            case 1: c1++; break;
            case 2: c2++; break;
            case 3: c3++; break;
            case 4: c4++; break;
            case 5: c5++; break;
            default: break;
          }
        });
        setCnt1(c1); setCnt2(c2); setCnt3(c3); setCnt4(c4); setCnt5(c5);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]); // include productId as dependency

  const totalCount = cnt1 + cnt2 + cnt3 + cnt4 + cnt5;
  const averageRating = totalCount === 0 ? 0 : ((cnt5 * 5 + cnt4 * 4 + cnt3 * 3 + cnt2 * 2 + cnt1 * 1) / totalCount).toFixed(1);

  const handleSubmit = () => {
    axios.post("http://127.0.0.1:8000/api/reviews/", {
      comment: newComment,
      rating: newRating,
      product: productId
    }).then(() => {
      setNewComment('');
      setNewRating(5);
      fetchReviews(); // Refresh review list
    }).catch(err => {
      console.error("Error submitting review:", err);
      alert("Failed to submit your review. Please try again.");
    });
  };

  return (
    <>

    <div className="max-w-5xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Customer Ratings</h2>

      {/* Average Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="text-center md:w-1/3">
          <p className="text-4xl font-bold text-yellow-500">{averageRating}</p>
          <p className="text-gray-600">out of 5</p>
          <p className="text-sm text-gray-500 mt-1">{totalCount} Ratings</p>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2 w-full">
          {[
            { stars: 5, count: cnt5 },
            { stars: 4, count: cnt4 },
            { stars: 3, count: cnt3 },
            { stars: 2, count: cnt2 },
            { stars: 1, count: cnt1 }
          ].map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <div className="w-12 text-sm text-gray-600">{stars} star</div>
              <div className="flex-1 bg-gray-200 h-3 rounded">
                <div
                  className="bg-yellow-400 h-3 rounded"
                  style={{ width: `${totalCount ? (count / totalCount) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-700">"{review.comment}"</p>
                <div className="text-yellow-500 mt-1">
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-xs text-gray-400 mt-1">by {review.username || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          rows="3"
          placeholder="Write your review here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <div className="mt-2">
          <label className="text-sm mr-2">Rating:</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 4, 3, 2, 1].map(star => (
              <option key={star} value={star}>{star}</option>
            ))}
          </select>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
     
     <PaymentMethods/>
    </>
  );
}

export default Rating;


