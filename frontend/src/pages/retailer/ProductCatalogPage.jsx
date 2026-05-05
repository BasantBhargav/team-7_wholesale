import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data.data?.content || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-slate-600">SKU: {p.sku}</div>
            <div className="text-sm">MOQ: {p.moq}</div>
            <div className="text-sm">Base Price: INR {p.basePrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
