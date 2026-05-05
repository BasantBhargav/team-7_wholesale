export default function RetailerDashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 text-lg">Here's your business overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Orders Card */}
        <div className="stat-card group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">45</p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🛒</span>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <p className="text-xs text-slate-400">+5 this week</p>
          </div>
        </div>

        {/* Payments Card */}
        <div className="stat-card group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Payments</p>
              <p className="text-3xl font-bold text-white mt-2">₹98K</p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💳</span>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <p className="text-xs text-slate-400">Due within 7 days</p>
          </div>
        </div>

        {/* Products Card */}
        <div className="stat-card group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Favorite Products</p>
              <p className="text-3xl font-bold text-white mt-2">17</p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⭐</span>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <p className="text-xs text-slate-400">Ready to reorder</p>
          </div>
        </div>

        {/* Quick Reorder Card */}
        <div className="stat-card group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Quick Reorder</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">Active</p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⚡</span>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <p className="text-xs text-slate-400">Feature enabled</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card-base">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span> Recent Orders
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Order #12345</p>
                <p className="text-xs text-slate-400 mt-1">₹5,200 • Processing</p>
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Processing</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Order #12344</p>
                <p className="text-xs text-slate-400 mt-1">₹3,800 • Delivered</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">Delivered</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card-base">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-600/50 transition-all duration-200 text-center">
              <p className="text-2xl mb-2">🛍️</p>
              <p className="text-xs font-medium text-brand-300">Browse Catalog</p>
            </button>
            <button className="p-4 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/50 transition-all duration-200 text-center">
              <p className="text-2xl mb-2">⚡</p>
              <p className="text-xs font-medium text-emerald-300">Quick Reorder</p>
            </button>
            <button className="p-4 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/50 transition-all duration-200 text-center">
              <p className="text-2xl mb-2">📝</p>
              <p className="text-xs font-medium text-purple-300">Place RFQ</p>
            </button>
            <button className="p-4 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/50 transition-all duration-200 text-center">
              <p className="text-2xl mb-2">📄</p>
              <p className="text-xs font-medium text-amber-300">Invoices</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
