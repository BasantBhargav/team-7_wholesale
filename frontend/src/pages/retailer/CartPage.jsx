import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data.data || { items: [] });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!sku || quantity < 1) return;
    try {
      await api.post('/cart/items', { sku, quantity: Number(quantity) });
      setSku('');
      setQuantity(1);
      load();
    } catch (error) {
      alert('Failed to add item: ' + (error.response?.data?.message || 'Try again'));
    }
  };

  const remove = async (itemSku) => {
    try {
      await api.delete(`/cart/items/${itemSku}`);
      load();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const total = (cart.items || []).reduce((sum, i) => sum + i.lineTotal, 0);
  const tax = total * 0.05;
  const grandTotal = total + tax;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
        <p className="text-slate-400 text-lg">{cart.items?.length || 0} items in cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Item Form */}
          <div className="card-base">
            <h3 className="text-lg font-bold text-white mb-4">Add Items</h3>
            <div className="flex gap-3">
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Enter SKU"
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Qty"
                min="1"
                className="w-24 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-center"
              />
              <button
                onClick={add}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-lg transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Items List */}
          {loading ? (
            <div className="text-center py-8 text-slate-400">
              <p>⏳ Loading cart...</p>
            </div>
          ) : (cart.items || []).length > 0 ? (
            <div className="card-base space-y-3">
              {(cart.items || []).map((item, idx) => (
                <div
                  key={item.sku}
                  className="flex justify-between items-center p-4 rounded-lg bg-slate-700/20 border border-slate-700/30 hover:border-brand-600/30 transition-all duration-200 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-medium text-white">{item.productName}</p>
                        <p className="text-sm text-slate-400">SKU: {item.sku}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                      <p className="font-bold text-emerald-400">₹{item.lineTotal.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => remove(item.sku)}
                      className="px-3 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/40 border border-red-600/50 text-sm font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-base text-center py-12">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-slate-300 font-medium">Your cart is empty</p>
              <p className="text-slate-400 text-sm mt-2">Add items using the form above</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="card-base h-fit sticky top-20">
          <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax (5%)</span>
              <span className="text-white font-medium">₹{tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-700/50"></div>
            <div className="flex justify-between text-white text-lg font-bold">
              <span>Total</span>
              <span className="text-emerald-400">₹{grandTotal.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all duration-200">
              Proceed to Checkout
            </button>
            <button className="w-full py-2 bg-slate-700/20 hover:bg-slate-700/40 text-slate-300 font-medium rounded-lg border border-slate-700/50 transition-all duration-200">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
