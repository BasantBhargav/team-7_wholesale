import { useEffect, useState } from 'react';
import api from '../../services/api';

const statuses = ['PENDING_APPROVAL', 'APPROVED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED', 'REJECTED'];

const getStatusColor = (status) => {
  const colors = {
    'PENDING_APPROVAL': 'amber',
    'APPROVED': 'blue',
    'PROCESSING': 'purple',
    'PACKED': 'indigo',
    'SHIPPED': 'cyan',
    'DELIVERED': 'emerald',
    'REJECTED': 'red'
  };
  return colors[status] || 'slate';
};

const getStatusIcon = (status) => {
  const icons = {
    'PENDING_APPROVAL': '⏳',
    'APPROVED': '✓',
    'PROCESSING': '⚡',
    'PACKED': '📦',
    'SHIPPED': '🚚',
    'DELIVERED': '✅',
    'REJECTED': '❌'
  };
  return icons[status] || '•';
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const load = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status?status=${status}`);
      load();
    } catch (error) {
      alert('Failed to update status: ' + (error.response?.data?.message || 'Try again'));
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Order Management</h1>
        <p className="text-slate-400 text-lg">Review and manage all wholesale orders</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
            filterStatus === 'all'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 border border-slate-700/50'
          }`}
        >
          📋 All Orders
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
              filterStatus === status
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 border border-slate-700/50'
            }`}
          >
            {getStatusIcon(status)} {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-2xl mb-3">⏳</p>
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/80">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Current Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusColor = getStatusColor(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-slate-300">#{order.id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-400">₹{order.grandTotal || 0}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{order.items?.length || 0} items</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-600/20 text-${statusColor}-300 border border-${statusColor}-600/50`}>
                          {getStatusIcon(order.status)} {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => setStatus(order.id, e.target.value)}
                          className="bg-slate-900/50 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <p className="text-2xl mb-2">📋</p>
                    <p>No orders with this status</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
