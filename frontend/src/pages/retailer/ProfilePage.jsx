export default function ProfilePage() {
  const auth = JSON.parse(localStorage.getItem('bom_auth') || '{}');
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <div>User ID: {auth.userId}</div>
        <div>Role: {auth.role}</div>
      </div>
    </div>
  );
}
