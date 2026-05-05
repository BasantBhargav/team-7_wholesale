import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function CreditPage() {
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    api.get('/credit/me').then(({ data }) => setCredit(data.data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Credit Overview</h1>
      {credit && (
        <div className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3">
          <div>Total Limit: INR {credit.totalLimit}</div>
          <div>Used Credit: INR {credit.usedCredit}</div>
          <div>Remaining: INR {credit.totalLimit - credit.usedCredit}</div>
          <div>Due Amount: INR {credit.dueAmount}</div>
        </div>
      )}
    </div>
  );
}
