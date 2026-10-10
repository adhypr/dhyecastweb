import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import Catalog from "./pages/frontpages/Catalog";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import About from "./pages/frontpages/About";
import NotFound from "./pages/frontpages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
