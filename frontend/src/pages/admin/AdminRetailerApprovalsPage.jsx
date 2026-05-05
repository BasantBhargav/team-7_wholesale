import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminRetailerApprovalsPage() {
  const [rows, setRows] = useState([]);

  const load = async () => {
    const { data } = await api.get('/admin/retailers/pending');
    setRows(data.data || []);
  };

  const setStatus = async (id, status) => {
    await api.patch(`/admin/retailers/${id}/status?status=${status}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Retailer Approvals</h1>
      <table className="w-full bg-white rounded shadow">
        <thead><tr><th className="p-2">Business</th><th>Owner</th><th>Email</th><th>Action</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.businessName}</td><td>{r.ownerName}</td><td>{r.email}</td>
              <td className="space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => setStatus(r.id, 'APPROVED')}>Approve</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => setStatus(r.id, 'REJECTED')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
