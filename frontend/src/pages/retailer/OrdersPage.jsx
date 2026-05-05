import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    const icons = {
      'PENDING': '⏳',
      'CONFIRMED': '✓',
      'SHIPPED': '🚚',
      'DELIVERED': '📦',
      'CANCELLED': '✗'
    };
    return icons[status] || '•';
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'amber',
      'CONFIRMED': 'blue',
      'SHIPPED': 'purple',
      'DELIVERED': 'emerald',
      'CANCELLED': 'red'
    };
    return colors[status] || 'slate';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-slate-400 text-lg">Track and manage your wholesale orders</p>
      </div>

      {/* Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['all', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
              filterStatus === status
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 border border-slate-700/50'
            }`}
          >
            {status === 'all' ? '📋 All Orders' : `${getStatusIcon(status)} ${status}`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-2xl mb-3">⏳</p>
          <p>Loading orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusColor = getStatusColor(order.status);
            const bgColor = `from-${statusColor}-600/10 to-${statusColor}-600/5`;
            return (
              <div
                key={order.id}
                className={`card-base bg-gradient-to-r ${bgColor} border-${statusColor}-600/30 cursor-pointer hover:scale-102 group`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getStatusIcon(order.status)}</span>
                      <div>
                        <p className="font-bold text-white text-lg">Order #{order.id}</p>
                        <p className="text-sm text-slate-400">Placed on {order.date || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/30">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Items</p>
                        <p className="font-semibold text-white">{order.items?.length || 0} items</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Total</p>
                        <p className="font-semibold text-emerald-400">₹{order.grandTotal || order.total || 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-600/20 text-${statusColor}-300 border border-${statusColor}-600/50`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-lg bg-brand-600/20 text-brand-300 hover:bg-brand-600/30 border border-brand-600/50 font-medium transition-all duration-200 whitespace-nowrap">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-base text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-300 font-medium">No orders found</p>
          <p className="text-slate-400 text-sm mt-2">Start by browsing our product catalog</p>
        </div>
      )}
    </div>
  );
}
