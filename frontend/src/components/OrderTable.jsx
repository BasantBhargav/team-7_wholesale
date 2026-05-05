import { useState } from 'react';

function OrderTableHeader() {
  return (
    <thead className="bg-slate-800/80 border-b border-slate-700/50 sticky top-0">
      <tr>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">#</th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order ID</th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total</th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
      </tr>
    </thead>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    'PENDING': { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-600/30' },
    'CONFIRMED': { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-600/30' },
    'SHIPPED': { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-600/30' },
    'DELIVERED': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-600/30' },
    'CANCELLED': { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-600/30' }
  };
  const config = statusConfig[status] || statusConfig['PENDING'];
  return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>{status}</span>;
}

export default function OrderTable({ rows = [] }) {\n  return (\n    <div className=\"overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm\">\n      <table className=\"w-full text-slate-100\">\n        <OrderTableHeader />\n        <tbody>\n          {rows && rows.length > 0 ? (\n            rows.map((row, idx) => (\n              <tr key={row.id} className=\"border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors\">\n                <td className=\"px-6 py-4 text-sm text-slate-400\">{idx + 1}</td>\n                <td className=\"px-6 py-4 text-sm font-medium text-slate-200\">{row.orderNumber || row.id}</td>\n                <td className=\"px-6 py-4 text-sm text-slate-400\">{row.date || 'N/A'}</td>\n                <td className=\"px-6 py-4 text-sm font-semibold text-brand-300\">\u20b9{row.total || 0}</td>\n                <td className=\"px-6 py-4 text-sm\"><StatusBadge status={row.status || 'PENDING'} /></td>\n                <td className=\"px-6 py-4 text-sm\"><button className=\"text-brand-400 hover:text-brand-300 font-medium transition-colors\">View</button></td>\n              </tr>\n            ))\n          ) : (\n            <tr>\n              <td colSpan=\"6\" className=\"px-6 py-8 text-center text-slate-400\">No orders found</td>\n            </tr>\n          )}\n        </tbody>\n      </table>\n    </div>\n  );\n}"
