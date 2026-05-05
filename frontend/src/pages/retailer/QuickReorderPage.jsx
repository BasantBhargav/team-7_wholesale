import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function QuickReorderPage() {
  const [orders, setOrders] = useState([]);

  const load = () => api.get('/orders').then(({ data }) => setOrders(data.data || []));
  useEffect(() => { load(); }, []);

  const reorder = async (id) => {
    await api.post(`/orders/${id}/quick-reorder`);
    alert('Reorder created successfully');
    load();
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Quick Reorder</h1>
      {orders.map((o) => (
        <div key={o.id} className="bg-white p-3 rounded shadow flex justify-between">
          <div>{o.id} - INR {o.grandTotal}</div>
          <button className="px-3 py-1 bg-brand-600 text-white rounded" onClick={() => reorder(o.id)}>Repeat Order</button>
        </div>
      ))}
    </div>
  );
}
