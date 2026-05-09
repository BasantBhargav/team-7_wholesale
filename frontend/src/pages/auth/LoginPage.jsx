import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../../redux/slices/authSlice';
import api from '../../services/api';
import { ShieldCheck, LockKeyhole, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/auth/login', values);
      const payload = data.data;

      dispatch(
        setAuth({
          token: payload.accessToken,
          role: payload.role,
          userId: payload.userId,
        })
      );

      navigate(
        payload.role === 'ADMIN'
          ? '/admin/dashboard'
          : '/retailer/dashboard'
      );
    } catch (error) {
      alert('Login failed! Check credentials.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] text-white flex items-center justify-center px-4 py-10">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-600/30 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-emerald-500/20 blur-[140px] rounded-full animate-pulse"></div>

        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-sky-500/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Floating Glass Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-700/40 px-4 py-2 rounded-full backdrop-blur-xl mb-6 shadow-lg">
            <Sparkles size={18} className="text-emerald-400" />
            <span className="text-sm text-slate-300">
              Smart B2B Ordering Platform
            </span>
          </div>

          <Link
            to="/"
            className="block text-5xl font-black tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              BulkOrder Pro
            </span>
          </Link>

          <h2 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            Sign in to continue managing your wholesale orders,
            inventory, and retailer operations seamlessly.
          </p>
        </div>

        {/* Login Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-emerald-500/20 rounded-3xl blur-2xl"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(15,23,42,0.8)]"
          >
            {/* Security Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-4 py-2 rounded-full text-sm">
                <ShieldCheck size={16} />
                Secure Login
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username or Email
              </label>

              <div className="relative">
                <input
                  {...register('email')}
                  placeholder="Enter your email"
                  autoComplete="off"
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />

                <div className="absolute inset-y-0 right-4 flex items-center text-slate-500">
                  @
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />

                <LockKeyhole
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mb-7 text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Button */}
            <button className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 py-3.5 font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/30">
              <span className="relative z-10">Sign In</span>

              <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0"></div>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="h-px flex-1 bg-slate-700"></div>
              <span className="text-slate-500 text-xs uppercase tracking-widest">
                OR
              </span>
              <div className="h-px flex-1 bg-slate-700"></div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Apply as a retailer
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-slate-500 text-xs mt-8">
          © 2026 BulkOrder Pro. Built for modern wholesale businesses.
        </p>
      </div>
    </div>
  );
}
