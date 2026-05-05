export default function PricingTable({ tiers = [], isRecommended = false }) {
  return (
    <div className={`rounded-2xl border transition-all ${
      isRecommended 
        ? 'border-brand-500/50 bg-brand-500/10 ring-2 ring-brand-500/20' 
        : 'border-slate-700/50 bg-slate-800/40'
    } overflow-hidden backdrop-blur-sm`}>
      <div className="p-6 space-y-4">
        {isRecommended && (
          <span className="inline-block px-3 py-1 rounded-full bg-brand-600/30 text-brand-300 text-xs font-semibold border border-brand-600/50">Most Popular</span>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/30">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">Quantity Range</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-300">Price per Unit</th>
                <th className="px-4 py-3 text-right font-semibold text-brand-300">Savings</th>
              </tr>
            </thead>
            <tbody>
              {tiers && tiers.length > 0 ? (
                tiers.map((tier, i) => {
                  const basePrice = tiers[0]?.unitPrice || 0;
                  const savings = ((basePrice - (tier.unitPrice || basePrice)) / basePrice * 100).toFixed(0);
                  return (
                    <tr key={i} className="border-b border-slate-700/20 hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-slate-300 font-medium">{tier.minQty} - {tier.maxQty ? tier.maxQty + ' units' : '∞'}</td>
                      <td className="px-4 py-3 text-right font-semibold text-brand-300">₹{tier.unitPrice}</td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-medium">{savings > 0 ? `${savings}% OFF` : '-'}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-4 text-center text-slate-400">No pricing tiers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
