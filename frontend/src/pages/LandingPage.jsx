import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-50 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-8 py-6 z-10 backdrop-blur-sm">
        <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
          BulkOrder Pro
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
            Log in
          </Link>
          <Link 
            to="/register" 
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold hover:from-indigo-400 hover:to-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="text-center z-10 max-w-4xl mx-auto mt-20">
          
          <span className="px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
            B2B Commerce Reimagined
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Manage Wholesale Orders <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
              With Absolute Precision.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A production-ready platform designed for wholesalers and retailers to streamline operations, manage inventory, and process orders instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 text-white font-bold text-lg hover:from-indigo-500 hover:via-blue-500 hover:to-emerald-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/30"
            >
              Start Purchasing Now
            </Link>

            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800/60 border border-slate-700 text-white font-bold text-lg hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-300 backdrop-blur-md"
            >
              Admin Login
            </Link>

          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 z-10 max-w-6xl w-full px-4 pb-20">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/40 backdrop-blur-md hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Quick Reordering</h3>
            <p className="text-slate-400 leading-relaxed">Place massive bulk orders and instantly reorder past purchases.</p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/40 backdrop-blur-md hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Dynamic Pricing</h3>
            <p className="text-slate-400 leading-relaxed">Buy more, save more with intelligent tier-based pricing.</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/40 backdrop-blur-md hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Secure Dashboard</h3>
            <p className="text-slate-400 leading-relaxed">Role-based dashboards with analytics and approvals.</p>
          </div>

        </div>
      </main>
    </div>
  );
}