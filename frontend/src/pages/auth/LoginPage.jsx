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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 font-sans flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link 
            to="/" 
            className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 inline-block mb-3"
          >
            BulkOrder Pro
          </Link>
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="text-slate-400 mt-2 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 p-8 rounded-2xl shadow-2xl space-y-6"
        >

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username or Email
            </label>
            <input 
              {...register('email')} 
              placeholder="e.g. admin" 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input 
              {...register('password')} 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:from-indigo-500 hover:via-blue-500 hover:to-emerald-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-indigo-500/30">
            Sign In
          </button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-slate-700/40 mt-6">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Apply as a retailer
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}