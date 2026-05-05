import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const { data } = await api.get('/products');
    setProducts(data.data?.content || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => <div key={p.id} className="bg-white p-4 rounded shadow">{p.name} ({p.sku})</div>)}
      </div>
    </div>
  );
}
