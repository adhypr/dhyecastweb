import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { formatRupiah, getImageSrc } from "../../utils/format";

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, totalQty } = useCart();

  // Kondisi 1: Jika keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Empty Cart</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          There are no products in your cart yet. Let's find your dream diecast now!
        </p>
        <Link 
          to="/catalog" 
          className="bg-black text-white px-6 py-3 rounded-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          View Catalog
        </Link>
      </div>
    );
  }

  // Kondisi 2: Jika ada barang di keranjang
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Kiri: Daftar Produk */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0 gap-4">
                  
                  {/* Gambar & Nama Produk */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-sm p-2 flex-shrink-0">
                      <img 
                        src={getImageSrc(item.img)} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <Link to={`/product/${item.id}`} className="hover:underline">
                        <h2 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h2>
                      </Link>
                      <p className="text-sm text-gray-500 mb-1">{item.brand} | {item.scale}</p>
                      <p className="font-medium text-gray-900">{formatRupiah(item.price)}</p>
                    </div>
                  </div>

                  {/* Kontrol Qty & Hapus */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    
                    {/* Plus Minus Qty */}
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button 
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        value={item.qty} 
                        readOnly 
                        className="w-10 text-center text-sm font-medium py-1 outline-none bg-transparent"
                      />
                      <button 
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.qty >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Tombol Hapus */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tombol Navigasi Lanjut Belanja */}
            <div className="mt-6 inline-block">
              <Link 
                to="/catalog" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-2"
              >
                <span>&larr;</span> Continue shopping
              </Link>
            </div>
          </div>

          {/* Kanan: Ringkasan Harga / Invoice */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{totalQty} Items</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Price</span>
                  <span className="font-bold text-xl text-gray-900">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Menuju Checkout */}
              <Link 
                to="/checkout"
                className="block w-full text-center bg-black text-white py-3 rounded-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
