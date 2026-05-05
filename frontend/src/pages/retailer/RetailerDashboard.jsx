export default function RetailerDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Retailer Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Orders: 45</div>
        <div className="bg-white p-4 rounded shadow">Pending Payments: INR 98,000</div>
        <div className="bg-white p-4 rounded shadow">Frequent Products: 17</div>
        <div className="bg-white p-4 rounded shadow">Quick Reorder Enabled</div>
      </div>
    </div>
  );
}
