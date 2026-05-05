import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(79,70,229,0.2)] hover:-translate-y-1 group backdrop-blur-sm">
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden relative">
        <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-300">📦</div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors mb-2">
            {product?.name || 'Product'}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">{product?.description || 'No description available'}</p>
        </div>

        {/* Price Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold text-brand-400">₹{product?.price || '0'}</span>
            {product?.originalPrice && (
              <span className="text-sm text-slate-500 line-through">₹{product?.originalPrice}</span>
            )}
          </div>
          {product?.stock !== undefined && (
            <p className="text-xs text-slate-400">
              <span className={product?.stock > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {product?.stock > 0 ? `${product?.stock} in stock` : 'Out of stock'}
              </span>
            </p>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-slate-400 hover:text-white transition-colors"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center bg-transparent text-white outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-slate-400 hover:text-white transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product?.stock === 0}
            className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              isAdded
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-600/50'
                : 'bg-brand-600/30 text-brand-300 hover:bg-brand-600/50 border border-brand-600/50 hover:border-brand-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAdded ? '✓ Added to cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
