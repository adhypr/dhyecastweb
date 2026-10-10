import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
          Error 404
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tight mb-3">
          LOST TRACK?
        </h1>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Page not Found!
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/catalog"
            className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-gray-800 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors rounded-sm"
          >
            Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
