import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, myListings, myOrders, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-500 font-semibold">Dashboard</p>
            <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-white mt-2">
              Welcome back, {user.name}
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="btn-outline"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-4">Profile</h2>
          <dl className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between gap-4">
              <dt>Name</dt>
              <dd className="font-medium text-charcoal dark:text-white">{user.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Email</dt>
              <dd className="font-medium text-charcoal dark:text-white">{user.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Phone</dt>
              <dd className="font-medium text-charcoal dark:text-white">{user.phone || 'Not added'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Location</dt>
              <dd className="font-medium text-charcoal dark:text-white">{user.location || 'Not added'}</dd>
            </div>
          </dl>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-4">Sales summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Listings</p>
              <p className="text-2xl font-bold text-primary-500">{myListings.length}</p>
            </div>
            <div className="rounded-xl bg-accent-50 dark:bg-accent-900/20 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Orders</p>
              <p className="text-2xl font-bold text-accent-500">{myOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white">Your listings</h2>
            <Link to="/sell" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
              Add new
            </Link>
          </div>
          {myListings.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">You haven&apos;t listed any furniture yet.</p>
          ) : (
            <ul className="space-y-3">
              {myListings.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-none last:pb-0">
                  <div>
                    <p className="font-medium text-charcoal dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                  <span className="font-bold text-primary-500">${item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-4">Recent orders</h2>
          {myOrders.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">You haven&apos;t placed any orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {myOrders.map((order) => (
                <li key={order.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-none last:pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-charcoal dark:text-white">{order.items?.[0]?.name || 'Furniture order'}</p>
                    <span className="text-xs rounded-full bg-green-100 text-green-700 px-2 py-1">{order.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(order.date).toLocaleDateString()} • ${order.total}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
