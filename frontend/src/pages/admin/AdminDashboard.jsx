import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics/admin');
        setStats(data.data || {});
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ icon, label, value, color = 'brand', trend = null }) => (
    <div className={`stat-card group bg-gradient-to-br from-${color}-600/10 to-${color}-600/5`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{loading ? '...' : value}</p>
        </div>
        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
      </div>
      {trend && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
          <div className={`w-2 h-2 rounded-full bg-${color}-400`}></div>
          <p className="text-xs text-slate-400">{trend}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-slate-400 text-lg">Real-time system overview and metrics</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon="🛒"
          label="Total Orders"
          value={stats.totalOrders || 0}
          color="brand"
          trend="Real-time updates"
        />
        <StatCard
          icon="⏳"
          label="Pending Orders"
          value={stats.pendingOrders || 0}
          color="amber"
          trend="Awaiting processing"
        />
        <StatCard
          icon="📝"
          label="Total RFQs"
          value={stats.totalRfqs || 0}
          color="purple"
          trend="Active requests"
        />
        <StatCard
          icon="📦"
          label="Total Products"
          value={stats.totalProducts || 0}
          color="blue"
          trend="In inventory"
        />
        <StatCard
          icon="👥"
          label="Total Users"
          value={stats.totalUsers || 0}
          color="emerald"
          trend="Active retailers"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-base">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span>📊</span> System Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Database</span>
                <span className="text-emerald-400 font-medium">Healthy</span>
              </div>
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">API Server</span>
                <span className="text-emerald-400 font-medium">Running</span>
              </div>
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Response Time</span>
                <span className="text-brand-400 font-medium">45ms</span>
              </div>
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-brand-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-base">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span>💰</span> Revenue Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
              <span className="text-slate-400 text-sm">Total Revenue</span>
              <span className="text-xl font-bold text-emerald-400">₹2.4L</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
              <span className="text-slate-400 text-sm">Avg Order Value</span>
              <span className="text-xl font-bold text-brand-400">₹8.5K</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
              <span className="text-slate-400 text-sm">Conversion Rate</span>
              <span className="text-xl font-bold text-purple-400">12.5%</span>
            </div>
          </div>
        </div>

        <div className="card-base">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span>⚙️</span> Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-600/50 text-brand-300 font-medium text-sm transition-all duration-200">
              ➕ Add Product
            </button>
            <button className="w-full p-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/50 text-emerald-300 font-medium text-sm transition-all duration-200">
              ✓ Approve Orders
            </button>
            <button className="w-full p-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/50 text-purple-300 font-medium text-sm transition-all duration-200">
              👥 Manage Retailers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
