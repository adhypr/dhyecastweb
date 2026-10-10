import { useState, useEffect } from "react";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  // Inisialisasi state dari localStorage agar data tetap ada setelah refresh
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []));

  // Sinkronisasi setiap perubahan cart ke localStorage
  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart]);

  // Tambah ke cart (mendukung jumlah custom, default 1)
  const addToCart = (product, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + count } : item
        );
      }
      return [...prev, { ...product, qty: count }];
    });
  };

  // Update qty
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // Hapus item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Kosongkan keranjang (berguna setelah checkout selesai)
  const clearCart = () => {
    setCart([]);
  };

  // Total item di dalam keranjang
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Total harga seluruh barang di keranjang
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, totalQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
