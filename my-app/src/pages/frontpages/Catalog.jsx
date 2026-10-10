import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../hooks/useProductQuery";
import { useSearchParams } from "react-router-dom";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get("brand");
  const searchWord = searchParams.get("search");

  // Filter aktif diturunkan dari URL, tidak perlu state terpisah
  const activeFilter = brandParam || "All";
  const { data: products = [], isLoading } = useProducts();

  const handleBrandClick = (brand) => setSearchParams({ brand });

  const filteredProducts = products.filter(p => {
    const matchBrand = activeFilter === "All" || p.brand.toLowerCase() === activeFilter.toLowerCase();
    const matchSearch = searchWord ? p.name.toLowerCase().includes(searchWord.toLowerCase()) : true;
    return matchBrand && matchSearch;
  });

  const getCategoryDescription = () => {
    if (searchWord) return `Showing search results for "${searchWord}"`;
    switch (activeFilter.toLowerCase()) {
      case "loose":
        return "Curated mint-condition loose models, ready for diorama and display.";
      case "hot wheels":
        return "Iconic castings, mainline favorites, and exclusive collector editions.";
      case "mini gt":
        return "Precision 1:64 scale replicas with authentic licensed details.";
      case "tomica":
        return "Legendary Japanese diecast with authentic details and working suspension.";
      default:
        return "Browse our complete selection of premium diecast models.";
    }
  };

  return (
    <div className="bg-white pb-12 pt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
            {searchWord ? "Search Results" : (activeFilter === "All" ? "Full Catalog" : `${activeFilter} Collection`)}
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {getCategoryDescription()}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center space-x-6 mb-10 overflow-x-auto">
          {["All", "Hot Wheels", "Mini GT", "Tomica", "Loose"].map(tab => (
            <button
              key={tab}
              onClick={() => handleBrandClick(tab)}
              className={`text-sm tracking-wider uppercase pb-1 transition-colors whitespace-nowrap ${activeFilter === tab ? 'text-black border-b border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((skeleton) => (
              <div key={skeleton} className="animate-pulse bg-white border border-gray-100 p-4">
                <div className="bg-gray-200 h-48 w-full mb-4"></div>
                <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/2 mb-4"></div>
                <div className="bg-gray-200 h-8 w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} p={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
