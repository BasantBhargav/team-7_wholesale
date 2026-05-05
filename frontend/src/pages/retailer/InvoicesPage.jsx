import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function InvoicesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/invoices/me').then(({ data }) => setRows(data.data || []));
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Invoices</h1>
      {rows.map((r) => (
        <div key={r.id} className="bg-white p-3 rounded shadow flex justify-between">
          <div>
            <div>{r.invoiceNumber}</div>
            <div className="text-sm text-slate-600">Order: {r.orderId}</div>
          </div>
          <a className="text-brand-600" href={`http://localhost:8080/api/invoices/download/${r.invoiceNumber}`} target="_blank">Download PDF</a>
        </div>
      ))}
    </div>
  );
}
