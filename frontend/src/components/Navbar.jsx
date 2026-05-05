import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth } from '../redux/slices/authSlice';

export default function Navbar() {
  const { token, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <header className="bg-slate-800/60 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to={role === 'ADMIN' ? '/admin/dashboard' : '/retailer/dashboard'} className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 hover:opacity-80 transition-opacity">
          BulkOrder Pro
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {token && (
            <>
              <Link to={role === 'ADMIN' ? '/admin/dashboard' : '/retailer/dashboard'} className="text-slate-300 hover:text-white transition-colors font-medium">
                Dashboard
              </Link>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm">{role === 'ADMIN' ? '👨‍💼 Admin' : '🏪 Retailer'}</span>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/40 border border-red-600/50 text-sm font-medium transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500 text-sm font-medium transition-all">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
