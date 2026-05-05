import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductCatalogPage from './pages/retailer/ProductCatalogPage';
import OrdersPage from './pages/retailer/OrdersPage';
import RfqPage from './pages/retailer/RfqPage';
import CreditPage from './pages/retailer/CreditPage';
import AdminRetailerApprovalsPage from './pages/admin/AdminRetailerApprovalsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import CartPage from './pages/retailer/CartPage';
import InvoicesPage from './pages/retailer/InvoicesPage';
import QuickReorderPage from './pages/retailer/QuickReorderPage';
import CsvUploadPage from './pages/retailer/CsvUploadPage';
import ProfilePage from './pages/retailer/ProfilePage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminPricingRulesPage from './pages/admin/AdminPricingRulesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminRfqPage from './pages/admin/AdminRfqPage';
import AdminCreditPage from './pages/admin/AdminCreditPage';
import AdminInvoicePage from './pages/admin/AdminInvoicePage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
          <Route path="/retailer/products" element={<ProductCatalogPage />} />
          <Route path="/retailer/cart" element={<CartPage />} />
          <Route path="/retailer/orders" element={<OrdersPage />} />
          <Route path="/retailer/invoices" element={<InvoicesPage />} />
          <Route path="/retailer/rfq" element={<RfqPage />} />
          <Route path="/retailer/credit" element={<CreditPage />} />
          <Route path="/retailer/quick-reorder" element={<QuickReorderPage />} />
          <Route path="/retailer/csv-upload" element={<CsvUploadPage />} />
          <Route path="/retailer/profile" element={<ProfilePage />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/approvals" element={<AdminRetailerApprovalsPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/pricing-rules" element={<AdminPricingRulesPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/rfq" element={<AdminRfqPage />} />
          <Route path="/admin/credit" element={<AdminCreditPage />} />
          <Route path="/admin/invoices" element={<AdminInvoicePage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
