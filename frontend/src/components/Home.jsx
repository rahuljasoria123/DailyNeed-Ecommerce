import React, { useState, useMemo } from "react";
import Card from "./Card.jsx";
import products from "../product-api/product.js";
import { useSearch } from "../context/SearchContext.jsx";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import ProductModal from "./ProductModal.jsx";
import Footer from "../components/Footer.jsx";


const Home = () => {
  const { search } = useSearch();
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    rating: 0,
    priceRange: { min: 0, max: 3000 },
  });

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      if (field === "category" || field === "brand") {
        const exists = prev[field].includes(value);
        return {
          ...prev,
          [field]: exists
            ? prev[field].filter((v) => v !== value)
            : [...prev[field], value],
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      rating: 0,
      priceRange: { min: 0, max: 3000 },
    });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  let filtered = products.filter((p) => {
    const searchMatch = p.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      filters.category.length === 0 || filters.category.includes(p.category);
    const brandMatch =
      filters.brand.length === 0 || filters.brand.includes(p.brand);
    const ratingMatch = p.rating >= filters.rating;
    const priceMatch =
      p.price >= filters.priceRange.min &&
      p.price <= filters.priceRange.max;

    return searchMatch && categoryMatch && brandMatch && ratingMatch && priceMatch;
  });

  // Sorting
  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating-desc") filtered.sort((a, b) => b.rating - a.rating);

return (
  <div className="bg-[#0D1117] min-h-screen flex flex-col">
    {/* MAIN CONTENT AREA: sidebar + main side by side */}
    <div className="flex flex-1">
      {/* FILTER SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#111827]/90 backdrop-blur-xl border-r border-gray-800 
             shadow-2xl p-6 transform ${
               isFilterOpen ? "translate-x-0" : "-translate-x-full"
             } transition-all duration-500 z-30`}
      >
        {/* Filter Panel */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-400">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-300 hover:text-indigo-400"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Filter Options */}
        <div className="space-y-8 text-gray-300">
          {/* Category */}
          <div>
            <h3 className="font-semibold mb-3 text-indigo-300 text-lg">Category</h3>
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer mb-2"
              >
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleFilterChange("category", category)}
                  className="accent-indigo-500"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-3 text-indigo-300 text-lg">Brand</h3>
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer mb-2"
              >
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleFilterChange("brand", brand)}
                  className="accent-indigo-500"
                />
                {brand}
              </label>
            ))}
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-3 text-indigo-300 text-lg">
              Customer Rating
            </h3>
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 cursor-pointer mb-2"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange("rating", rating)}
                  className="accent-indigo-500"
                />
                <span className="text-gray-400">{rating}★ & above</span>
              </label>
            ))}
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-3 text-indigo-300 text-lg">Price</h3>
            <input
              type="range"
              min="0"
              max="3000"
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filters.priceRange,
                  max: Number(e.target.value),
                })
              }
              className="w-full accent-indigo-500"
            />
            <p className="text-gray-400 text-center mt-1">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </p>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 
          text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/30"
        >
          Clear All
        </button>
      </aside>

      {/* MAIN SECTION */}
      <main className="flex-1 p-6 lg:p-10">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden mr-4 p-3 bg-indigo-600 text-white rounded-md shadow-md"
            >
              <FiFilter size={22} />
            </button>

            <span className="text-xl text-gray-300">
              Showing{" "}
              <span className="text-indigo-400 font-bold">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="text-gray-400">{products.length}</span> products
            </span>
          </div>

          {/* SORTING */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-gray-200 px-4 py-2 rounded-xl shadow-md border border-gray-700"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fadeUp">
          {filtered.map((product) => (
            <Card
              key={product.id}
              productObj={product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </main>

      {/* PRODUCT MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>

    {/* FOOTER AT BOTTOM */}
    <Footer />
  </div>
);

};
export default Home;
