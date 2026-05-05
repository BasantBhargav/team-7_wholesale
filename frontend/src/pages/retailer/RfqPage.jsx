import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function RfqPage() {
  const { register, handleSubmit, reset } = useForm();
  const [rfqs, setRfqs] = useState([]);

  const load = () => api.get('/rfqs/me').then(({ data }) => setRfqs(data.data || []));
  useEffect(() => { load(); }, []);

  const onSubmit = async (values) => {
    await api.post('/rfqs', { ...values, requestedQuantity: Number(values.requestedQuantity), proposedPrice: Number(values.proposedPrice) });
    reset();
    load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">RFQ Requests</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow grid grid-cols-2 gap-2">
        <input {...register('productId')} placeholder="Product ID" className="border p-2 rounded" />
        <input {...register('requestedQuantity')} placeholder="Quantity" className="border p-2 rounded" />
        <input {...register('proposedPrice')} placeholder="Proposed Price" className="border p-2 rounded" />
        <input {...register('notes')} placeholder="Notes" className="border p-2 rounded" />
        <button className="col-span-2 bg-brand-600 text-white py-2 rounded">Submit RFQ</button>
      </form>
      {rfqs.map((r) => <div key={r.id} className="bg-white p-3 rounded shadow">{r.productId} - {r.status}</div>)}
    </div>
  );
}
