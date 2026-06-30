export default function MerchLoading() {
  return (
    <div className="min-h-screen bg-[#080808] animate-pulse">
      {/* Hero skeleton */}
      <div className="pt-32 pb-20 border-b border-white/4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-3 w-32 bg-white/6 rounded-full mx-auto" />
          <div className="h-10 w-80 bg-white/8 rounded-xl mx-auto" />
          <div className="h-4 w-96 bg-white/4 rounded-full mx-auto" />
        </div>
      </div>
      {/* Cards skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/4 bg-[#111111] h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}
