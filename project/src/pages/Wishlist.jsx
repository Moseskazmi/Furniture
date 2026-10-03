import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Save your favorite furniture pieces here for later!
        </p>
        <Link to="/shop" className="btn-primary inline-block">
          Browse Furniture
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-white">
          My Wishlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="card group">
            <div className="relative overflow-hidden aspect-[4/3]">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 badge bg-red-500 text-white">
                  -{product.discount}%
                </span>
              )}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-red-500 hover:scale-110 transition-transform shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <RatingStars rating={product.rating} size="xs" />
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              </div>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-serif text-sm font-semibold text-charcoal dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-primary-500">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-primary-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary-600 transition-colors active:scale-90"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
