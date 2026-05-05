import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import api from '../../services/api';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.data?.content || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-white mb-2">Product Catalog</h1>
        <p className="text-slate-400 text-lg">Browse our complete selection of wholesale products</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search products by name, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="apparel">Apparel</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400 text-center">
            <div className="animate-spin text-3xl mb-4">⏳</div>
            Loading products...
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-3xl mb-4">🔍</p>
          <p className="text-slate-400 text-lg">No products found. Try a different search.</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="card-base bg-gradient-to-r from-brand-600/10 to-indigo-600/10 border-brand-600/30 text-center">
        <p className="text-slate-300 mb-2">💡 Bulk purchases get better pricing</p>
        <p className="text-slate-400 text-sm">Prices vary based on quantity. Add items to cart to see volume discounts.</p>
      </div>
    </div>
  );
}
