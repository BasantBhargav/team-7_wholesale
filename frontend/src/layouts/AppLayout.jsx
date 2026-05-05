import { NavLink, Outlet } from 'react-router-dom';

const retailerLinks = [
  ['/retailer/dashboard', 'Dashboard'],
  ['/retailer/products', 'Products'],
  ['/retailer/cart', 'Cart'],
  ['/retailer/orders', 'Orders'],
  ['/retailer/invoices', 'Invoices'],
  ['/retailer/rfq', 'RFQ'],
  ['/retailer/credit', 'Credit'],
  ['/retailer/quick-reorder', 'Quick Reorder'],
  ['/retailer/csv-upload', 'CSV Upload'],
  ['/retailer/profile', 'Profile']
];

const adminLinks = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/approvals', 'Retailer Approvals'],
  ['/admin/products', 'Products'],
  ['/admin/inventory', 'Inventory'],
  ['/admin/pricing-rules', 'Pricing Rules'],
  ['/admin/orders', 'Orders'],
  ['/admin/rfq', 'RFQ'],
  ['/admin/credit', 'Credit'],
  ['/admin/invoices', 'Invoices'],
  ['/admin/analytics', 'Analytics']
];

export default function AppLayout() {
  const auth = JSON.parse(localStorage.getItem('bom_auth') || '{}');
  const isAdmin = auth.role === 'ADMIN';
  const links = isAdmin ? adminLinks : retailerLinks;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-4 space-y-2">
        <h2 className="text-lg font-semibold mb-3">BOM System</h2>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} className="block px-3 py-2 rounded hover:bg-slate-700">
            {label}
          </NavLink>
        ))}
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
