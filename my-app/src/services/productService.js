import { initialProducts } from "../data/initialProducts";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

const KEY = STORAGE_KEYS.products;

// Mengambil produk dari localStorage (simulasi database), seed data awal jika kosong
export const getProducts = () => {
  const saved = readStorage(KEY);
  if (saved) return saved;
  writeStorage(KEY, initialProducts);
  return initialProducts;
};

const toSlug = (name) =>
  name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

export const addProduct = (productData) => {
  const newProduct = {
    ...productData,
    id: Date.now(),
    rating: 0,
    slug: toSlug(productData.name),
  };
  writeStorage(KEY, [newProduct, ...getProducts()]);
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  writeStorage(
    KEY,
    getProducts().map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  );
  return updatedProduct;
};

export const deleteProduct = (productId) => {
  writeStorage(KEY, getProducts().filter((p) => p.id !== productId));
};

// Mengurangi stok produk berdasarkan isi keranjang saat order selesai
export const reduceStock = (cartItems) => {
  writeStorage(
    KEY,
    getProducts().map((p) => {
      const item = cartItems.find((i) => i.id === p.id);
      return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p;
    })
  );
};
