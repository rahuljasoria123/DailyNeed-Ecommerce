import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { user, logout } = useAuth();
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { search, setSearch } = useSearch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
   <nav className="backdrop-blur-xl bg-gradient-to-r from-gray-900 via-[#0F1628] to-gray-900 
                shadow-[0_0_30px_rgba(0,0,0,0.7)] 
                p-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-700
                animate-fadeSlideDown">

  {/* Logo + Home */}
  <div className="flex items-center space-x-8">
    <Link
      to="/home"
      className="text-3xl font-extrabold text-white hover:text-indigo-400 transition-all duration-300 hover:scale-110"
    >
      DailyNeed
    </Link>

    <Link
      to="/home"
      className="text-lg font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
    >
      Home
    </Link>
  </div>

  {/* Search */}
  <div className="flex-1 max-w-lg mx-4">
    <div className="relative group">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 text-gray-200 bg-gray-800/70 border border-gray-700 
                   rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Right Side */}
  <div className="flex items-center space-x-6">

    {/* Cart Icon */}
    <Link
      to="/cart"
      className="relative text-white hover:scale-125 transition-all duration-300"
    >
      <span className="text-3xl hover:rotate-6 drop-shadow-lg transition-transform">
        🛍️
      </span>

      {quantity > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 py-0.5 
                         text-xs shadow-md animate-pulse">
          {quantity}
        </span>
      )}
    </Link>

    {/* Username Badge */}
    {user && (
      <span className="bg-gray-800/70 text-gray-200 px-4 py-1 rounded-full font-semibold shadow-lg 
                       text-md hover:bg-gray-700 transition-all duration-300 border border-gray-600">
        Welcome, {user.username}
      </span>
    )}

    {/* Dropdown Hamburger */}
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="bg-gray-800/60 p-2 text-white rounded-full border border-gray-600 
                   hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg
                   flex flex-col justify-center items-center gap-1"
      >
        <span className="block w-5 h-0.5 bg-white rounded transition-all duration-300"></span>
        <span className="block w-5 h-0.5 bg-white rounded transition-all duration-300"></span>
        <span className="block w-5 h-0.5 bg-white rounded transition-all duration-300"></span>
      </button>

      {/* Dropdown Menu */}
      {isUserMenuOpen && (
        <div
          className="absolute right-0 mt-3 w-52 bg-gray-900/95 rounded-2xl shadow-2xl py-2 border border-gray-700
                      animate-dropdown transition-all duration-300 origin-top-right"
        >
          {user ? (
            <>
              <div className="px-4 py-3 text-gray-300 font-semibold border-b border-gray-700">
                Hello, {user.username}
              </div>

              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-200"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  </div>
</nav>
  );
};

export default NavBar;
