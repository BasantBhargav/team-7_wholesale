import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useState } from 'react';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setApiError('');
      await api.post('/auth/register', values);
      alert('Registration submitted for approval');
      navigate('/login');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl z-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block mb-2">
            BulkOrder Pro
          </Link>
          <h2 className="text-3xl font-bold">Join as a Retailer</h2>
          <p className="text-slate-400 mt-2 text-sm">Register your business to start purchasing at wholesale prices</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl space-y-5">
          {apiError && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
              {apiError}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Business Name *</label>
              <input 
                {...register('businessName', { required: true })} 
                placeholder="Enter business name" 
                className={inputClass}
              />
              {errors.businessName && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Owner Name *</label>
              <input 
                {...register('ownerName', { required: true })} 
                placeholder="Full name" 
                className={inputClass}
              />
              {errors.ownerName && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
              <input 
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} 
                type="email"
                placeholder="you@company.com" 
                className={inputClass}
              />
              {errors.email && <span className="text-red-400 text-xs mt-1">Valid email required</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
              <input 
                {...register('phone', { required: true })} 
                placeholder="+91-1234567890" 
                className={inputClass}
              />
              {errors.phone && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GST/Tax ID *</label>
              <input 
                {...register('gstTaxId', { required: true })} 
                placeholder="GST/Tax ID" 
                className={inputClass}
              />
              {errors.gstTaxId && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Business Address *</label>
              <input 
                {...register('address', { required: true })} 
                placeholder="Street address" 
                className={inputClass}
              />
              {errors.address && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password *</label>
            <input 
              {...register('password', { required: true, minLength: 6 })} 
              type="password" 
              placeholder="••••••••" 
              className={inputClass}
            />
            {errors.password && <span className="text-red-400 text-xs mt-1">Min 6 characters</span>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:from-brand-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_5px_20px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Registering...' : 'Register Business'}
          </button>

          <div className="text-center pt-4 border-t border-slate-700/50 mt-6">
            <p className="text-slate-400 text-sm">
              Already registered?{' '}
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
