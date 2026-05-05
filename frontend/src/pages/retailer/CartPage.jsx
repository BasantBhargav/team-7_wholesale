import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);

  const load = async () => {
    const { data } = await api.get('/cart');
    setCart(data.data || { items: [] });
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await api.post('/cart/items', { sku, quantity: Number(quantity) });
    setSku('');
    setQuantity(1);
    load();
  };

  const remove = async (itemSku) => {
    await api.delete(`/cart/items/${itemSku}`);
    load();
  };

  const total = (cart.items || []).reduce((sum, i) => sum + i.lineTotal, 0);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="bg-white p-4 rounded shadow flex gap-2">
        <input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" className="border p-2 rounded" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Qty" className="border p-2 rounded" />
        <button onClick={add} className="px-4 bg-brand-600 text-white rounded">Add</button>
      </div>
      <div className="bg-white rounded shadow">
        {(cart.items || []).map((i) => (
          <div key={i.sku} className="flex justify-between border-b p-3">
            <div>{i.productName} ({i.sku}) x {i.quantity}</div>
            <div className="flex items-center gap-3">
              <span>INR {i.lineTotal.toFixed(2)}</span>
              <button onClick={() => remove(i.sku)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="font-semibold">Sub-total: INR {total.toFixed(2)}</div>
    </div>
  );
}
