import { useWishlist } from '../context/WishlistContext';

const HeartIcon = ({ filled, className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const WishlistButton = ({ product, className = '' }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 ${
        inWishlist
          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
          : 'text-gray-400 bg-white/80 dark:bg-gray-700/80 hover:text-red-500'
      } ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <HeartIcon filled={inWishlist} />
    </button>
  );
};

export default WishlistButton;
