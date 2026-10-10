import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function Navbar() {
  const { totalQty } = useCart();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false); // Tutup search box
      setSearchQuery(""); // Kosongkan input biar rapi lagi
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">

          <div className="flex-1 flex justify-start"></div>

          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="font-extrabold text-3xl tracking-widest text-gray-900 uppercase">
              DHYECAST<span className="text-gray-400">.ID</span>
            </h1>
          </Link>

          <div className="flex-1 flex items-center justify-end space-x-6">
            {/* Tombol Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isSearchOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>
            <Link to="/cart" className="text-gray-600 hover:text-black relative transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Kotak Input Pencarian (Muncul kalau isSearchOpen true) */}
        {isSearchOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 z-40">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diecast models (e.g., Skyline, Porsche)..."
                className="flex-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                autoFocus
              />
              <button 
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        <nav className="hidden md:flex justify-center space-x-8 pb-4 text-xs tracking-wider uppercase font-medium text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <Link to="/catalog" className="hover:text-black transition-colors">Catalog</Link>
          <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
        </nav>
      </div>
    </header>
  );
}
