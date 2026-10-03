const Star = ({ filled, half }) => (
  <svg
    className="w-4 h-4 inline-block"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : half ? 'url(#half-grad)' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    {half && (
      <defs>
        <linearGradient id="half-grad">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.841.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const RatingStars = ({ rating, size = 'sm', interactive = false, onChange }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };
  const colorClass = rating >= 4 ? 'text-accent-400' : rating >= 3 ? 'text-yellow-500' : 'text-red-400';

  if (interactive) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className={`${sizes[size]} ${colorClass} hover:scale-110 transition-transform`}
          >
            <Star filled={star <= Math.round(rating)} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-0.5 ${colorClass}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const diff = rating - (star - 1);
        return <Star key={star} filled={diff >= 1} half={diff > 0 && diff < 1} />;
      })}
    </div>
  );
};

export default RatingStars;
