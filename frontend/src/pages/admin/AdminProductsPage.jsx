import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.data?.content || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Product Management</h1>
        <p className="text-slate-400 text-lg">Manage your wholesale product inventory</p>
      </div>

      {/* Actions & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
        />
        <button className="px-6 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200">
          ➕ Add Product
        </button>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-2xl mb-3">⏳</p>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/80">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">📦 Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">MOQ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">{product.sku}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-400">₹{product.basePrice}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{product.moq} units</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 50
                          ? 'bg-emerald-600/20 text-emerald-300'
                          : product.stock > 0
                          ? 'bg-amber-600/20 text-amber-300'
                          : 'bg-red-600/20 text-red-300'
                      }`}>
                        {product.stock} items
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 rounded-lg bg-brand-600/20 text-brand-300 hover:bg-brand-600/30 text-xs font-medium transition-all">
                          Edit
                        </button>
                        <button className="px-3 py-1 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 text-xs font-medium transition-all">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <p className="text-2xl mb-2">🔍</p>
                    <p>No products found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
