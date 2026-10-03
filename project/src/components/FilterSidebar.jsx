const FilterSidebar = ({ filters, setFilters, categories }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleConditionToggle = (condition) => {
    setFilters((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }));
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      conditions: [],
      minPrice: 0,
      maxPrice: 3000,
      minRating: 0,
      sortBy: 'newest',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
          Filters
        </h3>
        <button
          onClick={handleReset}
          className="text-xs text-primary-500 hover:text-primary-600 font-medium"
        >
          Reset All
        </button>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-charcoal dark:text-white mb-3">
          Categories
        </h4>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-charcoal dark:text-white mb-3">
          Price Range
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value) || 0)}
            placeholder="Min"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-charcoal dark:text-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value) || 0)}
            placeholder="Max"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-charcoal dark:text-white focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
          />
        </div>
        <input
          type="range"
          min="0"
          max="3000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          className="w-full accent-primary-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-charcoal dark:text-white mb-3">
          Condition
        </h4>
        <div className="space-y-2">
          {['New', 'Like New', 'Good', 'Used'].map((cond) => (
            <label
              key={cond}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.conditions.includes(cond)}
                onChange={() => handleConditionToggle(cond)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
              />
              {cond}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-charcoal dark:text-white mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => handleChange('minRating', r)}
                className="w-4 h-4 border-gray-300 text-primary-500 focus:ring-primary-400"
              />
              {r === 0 ? 'All Ratings' : `${r}+ Stars`}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
