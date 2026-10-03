import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, addOrder } = useAuth();
  const { cart, clearCart, cartTotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (cart.length === 0 && !submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="card p-8">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add a few pieces before checking out.</p>
          <Link to="/shop" className="btn-primary inline-block">Continue shopping</Link>
        </div>
      </div>
    );
  }

  const shipping = 0;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const handleSubmit = (event) => {
    event.preventDefault();

    addOrder({
      items: cart,
      total: grandTotal,
      shipping,
      tax,
      deliveryAddress: 'Shipping information provided during checkout',
    });

    clearCart();
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-scale-in">
        <div className="card p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-2">Order placed successfully</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-white">Checkout</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Complete your order and we&apos;ll hand it off to the seller.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white">Shipping details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Full name</label>
              <input type="text" defaultValue={user.name} className="input-field" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Email</label>
              <input type="email" defaultValue={user.email} className="input-field" readOnly />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Address</label>
            <textarea
              className="input-field min-h-[120px]"
              defaultValue="123 Main Street\nApt 4B\nBrooklyn, NY 11201"
              readOnly
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">I agree to the terms and delivery policy.</span>
          </div>

          <button type="submit" className="btn-primary w-full text-center">
            Place order
          </button>
        </form>

        <div className="card p-6 h-fit">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-4">Order summary</h2>

          <div className="space-y-3 mb-5">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-charcoal dark:text-white line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-primary-500">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-charcoal dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="font-medium text-charcoal dark:text-white">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="font-medium text-charcoal dark:text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
              <span className="font-bold text-charcoal dark:text-white">Total</span>
              <span className="text-xl font-bold text-primary-500">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
