// Helper tunggal untuk akses localStorage (parse/stringify + penanganan error)

export const STORAGE_KEYS = {
  products: "dhyecast_products",
  orders: "dhyecast_orders",
  cart: "dhyecast_cart",
};

export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Gagal membaca "${key}" dari localStorage`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Gagal menyimpan "${key}" ke localStorage`, error);
  }
}
