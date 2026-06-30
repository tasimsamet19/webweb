export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#080808] animate-pulse">
      {/* Breadcrumb */}
      <div className="pt-20 lg:pt-24 pb-5 border-b border-white/4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-48 bg-white/6 rounded-full" />
        </div>
      </div>
      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-3 w-24 bg-white/4 rounded-full mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl bg-[#111111] border border-white/4" />
          <div className="space-y-4 pt-4">
            <div className="h-3 w-24 bg-white/6 rounded-full" />
            <div className="h-8 w-64 bg-white/8 rounded-xl" />
            <div className="h-6 w-20 bg-white/6 rounded-lg" />
            <div className="h-3 w-full bg-white/4 rounded-full" />
            <div className="h-3 w-3/4 bg-white/4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
