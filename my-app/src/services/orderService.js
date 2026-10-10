import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

const KEY = STORAGE_KEYS.orders;

export const SHIPPING_OPTIONS = {
  standard: { label: "Standard Delivery", title: "Standard Shipping (3-5 Days)", cost: 25000 },
  express: { label: "Express Delivery", title: "Express Shipping (1-2 Days)", cost: 50000 },
};

export const PAYMENT_LABELS = {
  bank_transfer: "Bank Transfer",
  qris: "QRIS",
};

const formatOrderDate = (withTime = true) =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(withTime && { hour: "2-digit", minute: "2-digit" }),
  });

const toEnglishDate = (str) => {
  if (!str || typeof str !== "string") return str;
  const idMonths = {
    Januari: "Jan",
    Februari: "Feb",
    Maret: "Mar",
    April: "Apr",
    Mei: "May",
    Juni: "Jun",
    Juli: "Jul",
    Agustus: "Aug",
    September: "Sep",
    Oktober: "Oct",
    November: "Nov",
    Desember: "Dec",
  };
  let result = str;
  Object.entries(idMonths).forEach(([idMonth, enMonth]) => {
    result = result.replace(new RegExp(idMonth, "gi"), enMonth);
  });
  return result;
};

// Pesanan contoh agar dashboard admin tidak kosong saat pertama kali dibuka
const createSeedOrder = () => ({
  id: "ORD-777",
  date: formatOrderDate(false),
  customer: {
    name: "Adhy",
    email: "dhyadhy@gmail.com",
    phone: "081234567890",
    address: "Jl. Dhyecast No. 1, Jakarta",
    courier: SHIPPING_OPTIONS.standard.label,
    paymentMethod: PAYMENT_LABELS.bank_transfer,
  },
  items: [
    { id: 1, name: "Hot Wheels '93 Honda Civic Coupe EX (EJ1)", price: 150000, qty: 2 },
    { id: 2, name: "Hot Wheels '70 Dodge Charger R/T", price: 175000, qty: 1 },
  ],
  subtotal: 475000,
  shipping: SHIPPING_OPTIONS.standard.cost,
  total: 500000,
});

// Urutan penyimpanan: terlama -> terbaru
export const getOrders = () => {
  const saved = readStorage(KEY);
  if (saved && saved.length > 0) {
    return saved.map((order) => ({
      ...order,
      date: toEnglishDate(order.date),
      customer: {
        ...order.customer,
        courier:
          !order.customer?.courier ||
          order.customer.courier.toLowerCase().includes("jne") ||
          order.customer.courier.toLowerCase().includes("reguler")
            ? SHIPPING_OPTIONS.standard.label
            : order.customer.courier,
      },
    }));
  }
  const seeded = [createSeedOrder()];
  writeStorage(KEY, seeded);
  return seeded;
};

// Membuat & menyimpan pesanan baru dari data form checkout dan isi keranjang
export const createOrder = ({ formData, cart, subtotal }) => {
  const shipping = SHIPPING_OPTIONS[formData.shipping];
  const newOrder = {
    id: "ORD-" + Date.now().toString(36).toUpperCase(),
    date: formatOrderDate(),
    customer: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      courier: shipping.label,
      paymentMethod: PAYMENT_LABELS[formData.paymentMethod],
    },
    items: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
    subtotal,
    shipping: shipping.cost,
    total: subtotal + shipping.cost,
  };
  writeStorage(KEY, [...getOrders(), newOrder]);
  return newOrder;
};
