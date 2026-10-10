import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useReduceStock } from "../../hooks/useProductQuery";
import { useCreateOrder } from "../../hooks/useOrderQuery";
import { SHIPPING_OPTIONS } from "../../services/orderService";
import { formatRupiah } from "../../utils/format";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  shipping: "",
  paymentMethod: "",
};

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrderMutation = useCreateOrder();
  const reduceStockMutation = useReduceStock();

  // State untuk form checkout
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hitung ongkos kirim secara dinamis
  const shippingCost = formData.shipping ? SHIPPING_OPTIONS[formData.shipping].cost : 0;
  const grandTotal = totalPrice + shippingCost;

  // Handle submit order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    createOrderMutation.mutate(
      { formData, cart, subtotal: totalPrice },
      {
        onSuccess: () => {
          reduceStockMutation.mutate(cart); // Kurangi stok
          alert(`Order placed successfully!\nThank you for shopping at Dhyecast.\nTotal Paid: ${formatRupiah(grandTotal)}`);
          clearCart(); // Kosongkan keranjang setelah order selesai
          navigate("/"); // Kembali ke halaman utama
        },
        onError: () => {
          setIsProcessing(false);
          alert("Failed to place order.");
        }
      }
    );
  };

  // Jika user maksa buka halaman checkout tapi keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          You need to add items to your cart before proceeding to checkout.
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

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          <CheckoutForm formData={formData} onChange={handleInputChange} />
          <OrderSummary
            cart={cart}
            totalPrice={totalPrice}
            shippingCost={shippingCost}
            grandTotal={grandTotal}
            isProcessing={isProcessing}
          />
        </form>

      </div>
    </div>
  );
}
