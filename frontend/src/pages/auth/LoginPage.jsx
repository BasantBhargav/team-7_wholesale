import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../../redux/slices/authSlice';
import api from '../../services/api';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/auth/login', values);
      const payload = data.data;
      dispatch(setAuth({ token: payload.accessToken, role: payload.role, userId: payload.userId }));
      navigate(payload.role === 'ADMIN' ? '/admin/dashboard' : '/retailer/dashboard');
    } catch (error) {
      alert("Login failed! Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block mb-2">
            BulkOrder Pro
          </Link>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-slate-400 mt-2 text-sm">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username or Email</label>
            <input 
              {...register('email')} 
              placeholder="e.g. admin" 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" 
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              {...register('password')} 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" 
            />
          </div>

          <button className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:from-brand-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_5px_20px_rgba(79,70,229,0.3)]">
            Sign In
          </button>

          <div className="text-center pt-4 border-t border-slate-700/50 mt-6">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                Apply as a retailer
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
