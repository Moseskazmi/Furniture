import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { products, categories } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const LocationIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openCart } = useOutletContext();
  const { listings, user } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState([]);

  const allProducts = [...listings, ...products];
  const product = allProducts.find((p) => p.id === id);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (product) {
      setLocalReviews(product.reviews || []);
      setActiveImage(0);
      setQuantity(1);
    }
  }, [id, product]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-white mb-4">
          Product Not Found
        </h2>
        <Link to="/shop" className="btn-primary inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const allReviews = [...localReviews, ...(product.reviews || [])];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const newReview = {
      id: `r_${Date.now()}`,
      userName: user.name,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setReviewComment('');
    setReviewRating(5);
    setShowReviewForm(false);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary-500">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary-500">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-primary-500">
          {category?.name || product.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal dark:text-white truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
              {category?.name || product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-charcoal dark:text-white mt-3">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary-500">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="badge bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Dimensions</p>
              <p className="text-sm text-charcoal dark:text-white">{product.dimensions}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Material</p>
              <p className="text-sm text-charcoal dark:text-white">{product.material}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Condition</p>
              <p className="text-sm text-charcoal dark:text-white">{product.condition}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Category</p>
              <p className="text-sm text-charcoal dark:text-white">{category?.name || product.category}</p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-primary-50/50 dark:bg-gray-700/30 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-semibold text-charcoal dark:text-white uppercase tracking-wide">
              Seller Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                {product.sellerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal dark:text-white">{product.sellerName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <LocationIcon /> {product.location}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <PhoneIcon /> {product.contactNumber}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-charcoal dark:text-white">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-medium text-charcoal dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-outline flex-1 min-w-[140px]"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-primary flex-1 min-w-[140px]"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  inWishlist
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 hover:text-red-500 hover:border-red-500'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title text-2xl">Ratings & Reviews</h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-outline text-sm !px-4 !py-2"
          >
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="card p-6 mb-6 space-y-4 animate-slide-down">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Your Rating
              </label>
              <RatingStars rating={reviewRating} size="lg" interactive onChange={setReviewRating} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Your Review
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows="4"
                required
                placeholder="Share your experience with this product..."
                className="input-field resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">Submit Review</button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn-outline text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {allReviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            allReviews.map((review) => (
              <div key={review.id} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal dark:text-white">
                        {review.userName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="section-title text-2xl mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
