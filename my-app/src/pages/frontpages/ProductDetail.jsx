import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProductQuery";
import { formatRupiah, getImageSrc } from "../../utils/format";
import useCart from "../../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // States for Review & Rating Form
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Diana Lestari",
      date: "4 Oktober 2026",
      rating: 5,
      text: "Terima kasih anak saya suka! Barang mendarat dengan aman! Packing super rapi pake bubble wrap tebal."
    },
    {
      id: 2,
      name: "Henry Wijaya",
      date: "1 Oktober 2026",
      rating: 4,
      text: "Diecastnya keren banget. Cuma pengiriman dari kurirnya agak telat sehari. Tapi overal mantap!"
    }
  ]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);

  const { data: products, isLoading } = useProducts();
  const product = products?.find((p) => p.id === parseInt(id));

  if (isLoading) {
    return <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white"><p className="text-gray-500">Loading product details...</p></div>;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/catalog" className="text-blue-600 hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a rating star first.");
      return;
    }
    if (!newReview.name || !newReview.text) {
      alert("Please fill out your name and review text.");
      return;
    }

    const reviewToSubmit = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
    };

    setReviews([reviewToSubmit, ...reviews]);
    setNewReview({ name: "", text: "", rating: 0 });
    setHoverRating(0);
  };

  return (
    <div className="bg-white min-h-screen pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-3">/</span>
          <Link to="/catalog" className="hover:text-black transition-colors">Catalog</Link>
          <span className="mx-3">/</span>
          <Link to={`/catalog?brand=${product.brand}`} className="hover:text-black transition-colors">
            {product.brand}
          </Link>
          <span className="mx-3">/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Image */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-gray-50 p-8 rounded-sm aspect-square flex items-center justify-center">
              <img
                src={getImageSrc(product.img)}
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Middle Column: Details */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center text-sm mb-6">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(product.rating || 5))}
                {"☆".repeat(5 - Math.floor(product.rating || 5))}
              </div>
              <span className="ml-2 text-gray-500">({product.rating || 5} rating)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-8">
              {formatRupiah(product.price)}
            </div>

            {/* Attributes Tab */}
            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-5">
                Product Details
              </h3>
              <div className="grid grid-cols-3 gap-y-4 text-sm">
                <span className="text-gray-500">Condition</span>
                <span className="col-span-2 text-gray-900">{product.condition || "New (Mint)"}</span>

                <span className="text-gray-500">Scale</span>
                <span className="col-span-2 text-gray-900">{product.scale || "1:64"}</span>

                <span className="text-gray-500">Brand</span>
                <span className="col-span-2 text-gray-900">{product.brand}</span>

                <span className="text-gray-500">Category</span>
                <span
                  className="col-span-2 text-gray-900 underline underline-offset-4 cursor-pointer hover:text-gray-600"
                  onClick={() => navigate(`/catalog?brand=${product.brand}`)}
                >
                  {product.category_name}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
                {"\n\n"}
                Original authentic product. Shipped securely with bubble wrap to ensure mint condition upon arrival.
              </p>
            </div>
          </div>

          {/* Right Column: Add to Cart Widget */}
          <div className="w-full lg:w-[20%]">
            <div className="bg-white border border-gray-200 rounded p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-5">Order Details</h3>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-10 text-center text-sm font-medium py-1 outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Stock: <span className="font-medium text-gray-900">{product.stock}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                <span className="text-gray-500 text-sm">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatRupiah(product.price * quantity)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white border border-black text-black py-3 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                  + Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black border border-black text-white py-3 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Customer Reviews</h2>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Review List */}
            <div className="w-full lg:w-[60%]">
              {reviews.length === 0 ? (
                <div className="bg-gray-50 py-10 px-6 text-center rounded-sm">
                  <p className="text-gray-500 italic">Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{rev.name}</span>
                        <span className="text-xs text-gray-500">{rev.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2 text-sm">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                      <p className="text-gray-600 text-sm">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-gray-50 p-6 rounded-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Interactive Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex cursor-pointer text-2xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`transition-colors ${star <= (hoverRating || newReview.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-sm outline-none focus:border-black text-sm"
                      placeholder="Enter your name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea
                      rows="4"
                      className="w-full border border-gray-300 p-2 rounded-sm outline-none focus:border-black text-sm"
                      placeholder="Share your thoughts about this product..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
