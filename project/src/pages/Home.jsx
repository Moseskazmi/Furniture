import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categories, testimonials } from '../data/products';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import RatingStars from '../components/RatingStars';

const ArrowRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const Home = () => {
  const { listings } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const allProducts = [...listings, ...products];
  const featured = allProducts.filter((p) => p.featured).slice(0, 8);
  const newArrivals = allProducts.filter((p) => p.newArrival).slice(0, 4);
  const bestDeals = allProducts
    .filter((p) => p.bestDeal)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-100/20 to-transparent dark:from-primary-900/30 dark:via-accent-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                Premium Furniture Marketplace
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-charcoal dark:text-white leading-tight">
                Find Perfect Furniture for Your <span className="text-primary-500">Dream Home</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Buy, sell, and discover quality furniture from trusted sellers.
                From modern sofas to vintage decor, find pieces that tell your story.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary flex items-center gap-2">
                  Shop Now <ArrowRight />
                </Link>
                <Link to="/sell" className="btn-outline">
                  Sell Your Furniture
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-serif font-bold text-primary-500">15+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-primary-500">9</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-primary-500">100%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quality</p>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Modern sofa"
                    className="rounded-2xl shadow-xl w-full h-64 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/7607461/pexels-photo-7607461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Coffee table"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.pexels.com/photos/15456211/pexels-photo-15456211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Wooden bed"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/7061419/pexels-photo-7061419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Wardrobe"
                    className="rounded-2xl shadow-xl w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal dark:text-white">Verified Sellers</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Trusted & reviewed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Furniture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Furniture</h2>
            <p className="section-subtitle">Handpicked pieces our customers love</p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
          >
            View All <ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-primary-50/50 dark:bg-gray-800/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">Browse furniture by category</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.slice(0, 10).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">Fresh listings just added</p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
          >
            View All <ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Deals */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Best Deals
            </h2>
            <p className="text-primary-100 mt-2">Biggest discounts on quality furniture</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real experiences from the Furnishé community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="card p-6 flex flex-col animate-fade-in"
            >
              <RatingStars rating={t.rating} size="sm" />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 mb-4 flex-1 leading-relaxed">
                “{t.comment}”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-charcoal dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-400 to-primary-500 p-8 md:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Stay in the Loop
            </h2>
            <p className="text-white/90 max-w-md mx-auto mb-6">
              Subscribe to get the latest deals, new arrivals, and furniture tips
              delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/95 text-charcoal outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-charcoal text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors active:scale-95"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-white mt-3 animate-slide-up text-sm font-medium">
                Thank you for subscribing!
              </p>
            )}
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />
        </div>
      </section>
    </div>
  );
};

export default Home;
