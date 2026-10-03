import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="card group flex flex-col items-center justify-center p-6 text-center hover:border-primary-200 border-2 border-transparent transition-all duration-300 animate-fade-in"
    >
      <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:bg-primary-100 dark:group-hover:bg-primary-800/40 transition-all duration-300">
        {category.icon}
      </div>
      <h3 className="font-serif text-sm font-semibold text-charcoal dark:text-white group-hover:text-primary-500 transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
        {category.description}
      </p>
    </Link>
  );
};

export default CategoryCard;
