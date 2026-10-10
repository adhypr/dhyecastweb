import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../hooks/useProductQuery";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: products = [], isLoading } = useProducts();
  // Top tier: Harga >= 180000
  const topTierProducts = products.filter(p => p.price >= 180000);

  return (
    <div className="bg-white pb-12">
      <div className="relative h-[60vh] bg-gray-900 flex items-center justify-center overflow-hidden mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wider">
            Dhyecast Indonesia
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Discover our premium selection of precision diecast models. Where passion meets perfection and every detail tells a story.
          </p>
          <Link to="/catalog" className="border border-white text-white px-10 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-gray-200">
          <div className="flex flex-col items-center text-center">
            <svg className="w-8 h-8 mb-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1">100% Original</h3>
            <p className="text-gray-500 text-xs">Official product guarantee & factory sealed</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-8 h-8 mb-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1">Safe Packing</h3>
            <p className="text-gray-500 text-xs">Double box & thick bubble wrap</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-8 h-8 mb-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1">Fast Delivery</h3>
            <p className="text-gray-500 text-xs">Fast delivery across Indonesia</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-8 h-8 mb-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1">Premium Quality</h3>
            <p className="text-gray-500 text-xs">Collector grade diecast collection</p>
          </div>
        </div>
      </div>

      {/* Shop by Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-wide">Shop by Brand</h2>
          <div className="h-0.5 w-16 bg-black mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/catalog?brand=Hot Wheels" className="group relative h-64 overflow-hidden rounded-sm block">
            <img src="/images/banner_hotwheels.jpg" alt="Hot Wheels" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl font-bold tracking-widest uppercase mb-2">Hot Wheels</h3>
              <p className="text-sm font-light tracking-wide border-b border-white pb-1">Explore Collection</p>
            </div>
          </Link>
          <Link to="/catalog?brand=Mini GT" className="group relative h-64 overflow-hidden rounded-sm block">
            <img src="/images/banner_minigt.jpg" alt="Mini GT" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl font-bold tracking-widest uppercase mb-2">Mini GT</h3>
              <p className="text-sm font-light tracking-wide border-b border-white pb-1">Explore Collection</p>
            </div>
          </Link>
          <Link to="/catalog?brand=Tomica" className="group relative h-64 overflow-hidden rounded-sm block">
            <img src="/images/banner_tomica.jpg" alt="Tomica" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl font-bold tracking-widest uppercase mb-2">Tomica</h3>
              <p className="text-sm font-light tracking-wide border-b border-white pb-1">Explore Collection</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Content Section - Top Tier Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wide">
            Top Tier Selection
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            Handpicked premium models for serious collectors. Extraordinary details and flawless finish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="animate-pulse bg-white border border-gray-100 p-4">
                <div className="bg-gray-200 h-48 w-full mb-4"></div>
                <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/2 mb-4"></div>
                <div className="bg-gray-200 h-8 w-full"></div>
              </div>
            ))
          ) : (
            topTierProducts.map((item) => (
              <ProductCard key={item.id} p={item} />
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <Link to="/catalog" className="inline-block border-b border-black text-black pb-1 uppercase tracking-widest text-sm font-semibold hover:text-gray-600 hover:border-gray-600 transition-colors">
            View All Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
