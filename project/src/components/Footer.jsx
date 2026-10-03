import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const Footer = () => {
  const linkSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Furniture', to: '/shop' },
        { label: 'Sofas', to: '/shop?category=sofa' },
        { label: 'Beds', to: '/shop?category=bed' },
        { label: 'Dining Sets', to: '/shop?category=dining-set' },
        { label: 'Home Decor', to: '/shop?category=home-decor' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/' },
        { label: 'Sell on Furnishé', to: '/sell' },
        { label: 'Contact', to: '/' },
        { label: 'Careers', to: '/' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'My Dashboard', to: '/dashboard' },
        { label: 'My Orders', to: '/dashboard' },
        { label: 'Wishlist', to: '/wishlist' },
        { label: 'Cart', to: '/cart' },
      ],
    },
  ];

  return (
    <footer className="bg-primary-900 dark:bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Furnishé
            </h3>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-4">
              Your trusted marketplace for buying and selling quality furniture.
              Discover unique pieces, great deals, and connect with sellers across the country.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Furnishé. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
