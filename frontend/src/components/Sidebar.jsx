import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const location = useLocation();
  const { role } = useSelector(state => state.auth);
  const isAdmin = role === 'ADMIN';

  const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '📦' },
    { label: 'Orders', path: '/admin/orders', icon: '🛒' },
    { label: 'Retailers', path: '/admin/retailer-approvals', icon: '🏪' },
    { label: 'Pricing Rules', path: '/admin/pricing-rules', icon: '💰' },
    { label: 'RFQs', path: '/admin/rfq', icon: '📝' },
    { label: 'Credit', path: '/admin/credit', icon: '💳' },
    { label: 'Analytics', path: '/admin/analytics', icon: '📈' },
  ];

  const retailerMenuItems = [
    { label: 'Dashboard', path: '/retailer/dashboard', icon: '📊' },
    { label: 'Catalog', path: '/retailer/products', icon: '🛍️' },
    { label: 'Orders', path: '/retailer/orders', icon: '🛒' },
    { label: 'RFQ', path: '/retailer/rfq', icon: '📝' },
    { label: 'Quick Reorder', path: '/retailer/quick-reorder', icon: '⚡' },
    { label: 'Invoices', path: '/retailer/invoices', icon: '📄' },
    { label: 'Cart', path: '/retailer/cart', icon: '🛒' },
    { label: 'Credit', path: '/retailer/credit', icon: '💳' },
    { label: 'CSV Upload', path: '/retailer/csv-upload', icon: '📤' },
    { label: 'Profile', path: '/retailer/profile', icon: '👤' },
  ];

  const menuItems = isAdmin ? adminMenuItems : retailerMenuItems;
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Sidebar Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isAdmin ? '👨‍💼 Admin' : '🏪 Retailer'}
          </h2>
          <p className="text-sm text-slate-500 font-medium">Menu</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group ${
                isActive(item.path)
                  ? 'bg-brand-600/20 text-brand-300 border-l-2 border-brand-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
              }`}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <span>{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
