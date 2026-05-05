import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/analytics/admin').then(({ data }) => setStats(data.data || {}));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Analytics Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Orders: {stats.totalOrders || 0}</div>
        <div className="bg-white p-4 rounded shadow">Pending Orders: {stats.pendingOrders || 0}</div>
        <div className="bg-white p-4 rounded shadow">Total RFQs: {stats.totalRfqs || 0}</div>
        <div className="bg-white p-4 rounded shadow">Total Products: {stats.totalProducts || 0}</div>
        <div className="bg-white p-4 rounded shadow">Total Users: {stats.totalUsers || 0}</div>
      </div>
    </div>
  );
}
