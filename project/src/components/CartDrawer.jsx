import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
            Cart ({cartCount})
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Your cart is empty. Start shopping to add items!
            </p>
            <Link
              to="/shop"
              onClick={onClose}
              className="btn-primary text-sm"
            >
              Browse Furniture
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-charcoal dark:text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {item.sellerName}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-charcoal dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-primary-500">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-charcoal dark:text-white">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-semibold text-green-500">Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <span className="font-semibold text-charcoal dark:text-white">Total</span>
                <span className="text-lg font-bold text-primary-500">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Link
                to="/cart"
                onClick={onClose}
                className="btn-outline w-full text-center text-sm"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="btn-primary w-full text-center text-sm"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
