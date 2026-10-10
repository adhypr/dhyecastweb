import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Section */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase mb-4">DHYECAST.ID</h2>
          <p className="text-gray-500 text-sm">© 2026 Dhyecast ID. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
