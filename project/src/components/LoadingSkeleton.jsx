const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const shimmer = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card p-0 overflow-hidden">
            <div className={`aspect-[4/3] ${shimmer}`} />
            <div className="p-4 space-y-3">
              <div className={`h-3 w-20 rounded ${shimmer}`} />
              <div className={`h-4 w-full rounded ${shimmer}`} />
              <div className={`h-3 w-32 rounded ${shimmer}`} />
              <div className="flex justify-between items-center pt-2">
                <div className={`h-6 w-16 rounded ${shimmer}`} />
                <div className={`h-8 w-16 rounded-lg ${shimmer}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card p-0 overflow-hidden">
            <div className={`aspect-[4/3] ${shimmer}`} />
            <div className="p-4 space-y-3">
              <div className={`h-3 w-20 rounded ${shimmer}`} />
              <div className={`h-4 w-full rounded ${shimmer}`} />
              <div className={`h-3 w-32 rounded ${shimmer}`} />
              <div className="flex justify-between items-center pt-2">
                <div className={`h-6 w-16 rounded ${shimmer}`} />
                <div className={`h-8 w-16 rounded-lg ${shimmer}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`aspect-square rounded-2xl ${shimmer}`} />
        <div className="space-y-4">
          <div className={`h-3 w-24 rounded ${shimmer}`} />
          <div className={`h-8 w-full rounded ${shimmer}`} />
          <div className={`h-6 w-32 rounded ${shimmer}`} />
          <div className={`h-4 w-full rounded ${shimmer}`} />
          <div className={`h-4 w-3/4 rounded ${shimmer}`} />
          <div className={`h-4 w-2/3 rounded ${shimmer}`} />
          <div className="flex gap-4 pt-4">
            <div className={`h-12 w-32 rounded-lg ${shimmer}`} />
            <div className={`h-12 w-32 rounded-lg ${shimmer}`} />
          </div>
        </div>
      </div>
    );
  }

  return <div className={`h-32 rounded-xl ${shimmer}`} />;
};

export default LoadingSkeleton;
