import { formatRupiah } from "../../utils/format";

export default function OrderSummary({ cart, totalPrice, shippingCost, grandTotal, isProcessing }) {
  return (
    <div className="w-full lg:w-96">
      <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 sticky top-28">
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Order Summary</h2>

        {/* Daftar Item dari Cart */}
        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              <div className="flex-1 pr-4">
                <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-gray-500">Qty: {item.qty}</p>
              </div>
              <span className="font-medium text-gray-900">
                {formatRupiah(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>

        {/* Rincian Harga */}
        <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping Cost</span>
            <span>{formatRupiah(shippingCost)}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Grand Total</span>
            <span className="font-bold text-xl text-black">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 rounded-sm font-semibold uppercase tracking-wider transition-colors flex justify-center items-center gap-2 ${
            isProcessing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
