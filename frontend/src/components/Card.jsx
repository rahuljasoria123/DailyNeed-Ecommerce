import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice.js";

const Card = ({ productObj, onQuickView }) => {
  const dispatch = useDispatch();
  const productInCart = useSelector((state) =>
    state.cart.find((item) => item.id === productObj.id)
  );

  const quantity = productInCart?.quantity || 0;

  const discountedPrice = (
    productObj.price -
    (productObj.price * productObj.discountPercentage) / 100
  ).toFixed(2);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 transition-all duration-300 ${
            i <= Math.round(rating)
              ? "text-yellow-400 scale-110 drop-shadow-glow"
              : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className="bg-[#111827] border border-gray-800 rounded-xl shadow-lg overflow-hidden w-72
                 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl 
                 hover:shadow-indigo-500/30 group relative"
    >

      {/* Product Image Section */}
      <figure className="relative w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={productObj.thumbnail}
          alt={productObj.title}
        />

        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-red-700 
                        text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {productObj.discountPercentage.toFixed(0)}% OFF
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={() => onQuickView(productObj)}
            className="bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold 
                       shadow-md hover:bg-gray-200 transition-all duration-300"
          >
            Quick View
          </button>
        </div>
      </figure>

      {/* Content Section */}
      <div className="p-4 flex flex-col grow">
        <h2
          className="text-lg font-semibold text-gray-100 truncate group-hover:text-indigo-400 transition-all duration-300"
          title={productObj.title}
        >
          {productObj.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">{renderStars(productObj.rating)}</div>
          <span className="ml-2 text-sm text-gray-400">
            ({productObj.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-xl font-bold text-indigo-400">${discountedPrice}</p>
          <p className="text-sm text-gray-500 line-through">
            ${productObj.price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart / Quantity */}
        <div className="mt-4 grow flex items-end">
          {productInCart ? (
            <div className="w-full flex items-center justify-between bg-gray-800 py-2 px-3 rounded-lg shadow-inner">
              <button
                onClick={() => dispatch(decreaseQuantity(productObj))}
                className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md 
                           hover:bg-gray-600 hover:scale-110 transition-all duration-300"
              >
                -
              </button>

              <span className="text-lg font-semibold text-white">{quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(productObj))}
                className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md 
                           hover:bg-gray-600 hover:scale-110 transition-all duration-300"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(productObj))}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                         text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg
                         hover:shadow-indigo-500/40 hover:scale-105"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
