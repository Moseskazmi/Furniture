import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import WishlistButton from './WishlistButton';
import { useCart } from '../context/CartContext';

const LocationIcon = () => (
  <svg className="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="card group block animate-fade-in"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {product.discount > 0 && (
          <span className="absolute top-3 left-3 badge bg-red-500 text-white">
            -{product.discount}%
          </span>
        )}

        {product.newArrival && (
          <span className="absolute top-3 right-10 badge bg-primary-500 text-white">
            New
          </span>
        )}

        <div className="absolute top-3 right-3">
          <WishlistButton product={product} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-charcoal dark:text-white px-3 py-2 rounded-lg text-xs font-medium shadow-md">
              <EyeIcon />
              View Details
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-primary-500 uppercase tracking-wide">
            {product.category.replace(/-/g, ' ')}
          </span>
          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} size="xs" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        <h3 className="font-serif text-base font-semibold text-charcoal dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          by {product.sellerName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          <LocationIcon /> {product.location}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary-500">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-primary-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary-600 transition-all duration-200 active:scale-90 shadow-sm"
          >
            <CartIcon />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
