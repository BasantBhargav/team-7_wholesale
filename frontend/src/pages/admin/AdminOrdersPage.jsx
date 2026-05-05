import { useEffect, useState } from 'react';
import api from '../../services/api';

const statuses = ['PENDING_APPROVAL', 'APPROVED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED', 'REJECTED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const load = () => api.get('/orders').then(({ data }) => setOrders(data.data || []));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status?status=${status}`);
    load();
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      {orders.map((o) => (
        <div key={o.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
          <div>{o.id} | {o.status} | INR {o.grandTotal}</div>
          <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="border p-1 rounded">
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}
