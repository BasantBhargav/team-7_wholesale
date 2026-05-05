import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    await api.post('/auth/register', values);
    alert('Registration submitted for approval');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow w-full max-w-xl grid grid-cols-2 gap-3">
        <h1 className="text-2xl font-bold col-span-2">Retailer Registration</h1>
        <input {...register('businessName')} placeholder="Business Name" className="border p-2 rounded" />
        <input {...register('ownerName')} placeholder="Owner Name" className="border p-2 rounded" />
        <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
        <input {...register('phone')} placeholder="Phone" className="border p-2 rounded" />
        <input {...register('gstTaxId')} placeholder="GST/Tax ID" className="border p-2 rounded" />
        <input {...register('address')} placeholder="Address" className="border p-2 rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="border p-2 rounded col-span-2" />
        <button className="col-span-2 bg-brand-600 text-white py-2 rounded">Register</button>
        <Link to="/login" className="col-span-2 text-brand-600 text-sm">Back to login</Link>
      </form>
    </div>
  );
}
