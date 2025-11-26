import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#020617] border-t border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div>
          <h2 className="text-lg font-semibold text-white">DailyNeed</h2>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} DailyNeed. All rights reserved.
          </p>
        </div>

        {/* Middle links */}
        <div className="flex gap-4 text-sm text-gray-400">
          <button className="hover:text-indigo-400 transition-colors">
            Privacy Policy
          </button>
          <button className="hover:text-indigo-400 transition-colors">
            Terms of Service
          </button>
          <button className="hover:text-indigo-400 transition-colors">
            Help
          </button>
        </div>

        {/* Right side */}
        <div className="text-xs text-gray-500">
          Made with ❤️ for smooth shopping
        </div>
      </div>
    </footer>
  );
};

export default Footer;
