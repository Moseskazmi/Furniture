import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const SearchBar = ({ className = '', onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/shop?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for furniture..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-charcoal dark:text-gray-100 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 outline-none text-sm"
        />
      </div>
    </form>
  );
};

export default SearchBar;
