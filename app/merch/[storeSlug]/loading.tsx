export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-[#080808] animate-pulse">
      {/* Store header skeleton */}
      <div className="pt-20 lg:pt-24 pb-10 border-b border-white/4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-3 w-16 bg-white/6 rounded-full" />
          <div className="h-4 w-28 bg-white/6 rounded-full" />
          <div className="h-8 w-72 bg-white/8 rounded-xl" />
          <div className="h-3 w-96 bg-white/4 rounded-full" />
        </div>
      </div>
      {/* Product grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-white/4 bg-[#111111] aspect-square" />
          ))}
        </div>
      </div>
    </div>
  );
}
