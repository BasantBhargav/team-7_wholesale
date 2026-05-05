import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data.data || []));
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map((o) => (
        <div key={o.id} className="bg-white p-3 rounded shadow">
          <div>Order ID: {o.id}</div>
          <div>Status: {o.status}</div>
          <div>Total: INR {o.grandTotal}</div>
        </div>
      ))}
    </div>
  );
}
