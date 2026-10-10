import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { formatRupiah, getImageSrc } from "../utils/format";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col justify-between bg-white transition-all duration-300">
      <Link to={`/product/${p.id}`} className="block relative overflow-hidden bg-gray-50 aspect-[4/3] rounded-sm">
        {/* Gambar diecast */}
        <img 
          src={getImageSrc(p.img)} 
          alt={p.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover overlay dengan tombol Add to Cart di tengah (Optional style) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
        </div>
      </Link>
      
      <div className="pt-4 text-left">
        <h2 className="font-medium text-gray-900 text-sm truncate" title={p.name}>{p.name}</h2>
        <p className="text-gray-500 text-xs mt-1 mb-2">{p.brand} | {p.scale}</p>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-900 font-semibold text-sm">
            {formatRupiah(p.price)}
          </p>
          <button
            onClick={() => addToCart(p)}
            className="text-xs font-medium text-gray-400 hover:text-black uppercase tracking-wider transition-colors"
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}
