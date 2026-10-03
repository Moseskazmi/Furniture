import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, register } = useAuth();
  const isRegister = location.pathname === '/register';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (isRegister) {
      const result = register(form.name, form.email, form.password);
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate('/dashboard');
      return;
    }

    const result = login(form.email, form.password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card overflow-hidden">
        <div className="bg-primary-500 px-6 py-5 text-white">
          <h1 className="text-2xl font-serif font-bold">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-primary-100 mt-1">
            {isRegister ? 'Join Furnishé to buy and sell furniture.' : 'Sign in to manage your orders and listings.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Full name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="input-field"
                placeholder="Jane Smith"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" className="btn-primary w-full text-center">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 font-medium hover:text-primary-600">
                Sign in
              </Link>
            </p>
          ) : (
            <p>
              Need an account?{' '}
              <Link to="/register" className="text-primary-500 font-medium hover:text-primary-600">
                Create one
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
