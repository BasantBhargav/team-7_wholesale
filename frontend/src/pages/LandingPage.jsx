import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-brand-600 selection:text-white">
      {/* Navigation */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-8 py-6 z-10">
        <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          BulkOrder Pro
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
            Log in
          </Link>
          <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all duration-200 transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="text-center z-10 max-w-4xl mx-auto mt-20">
          <span className="px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/30 text-brand-300 text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
            B2B Commerce Reimagined
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Manage Wholesale Orders <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              With Absolute Precision.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A production-ready platform designed for wholesalers and retailers to streamline operations, manage inventory, and process orders instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-lg hover:from-brand-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(79,70,229,0.4)]">
              Start Purchasing Now
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800/50 border border-slate-700 text-white font-bold text-lg hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm">
              Admin Login
            </Link>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 z-10 max-w-6xl w-full px-4 pb-20">
          <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Quick Reordering</h3>
            <p className="text-slate-400 leading-relaxed">Place massive bulk orders with our streamlined checkout and instantly reorder past purchases.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Dynamic Pricing</h3>
            <p className="text-slate-400 leading-relaxed">Take advantage of intelligent tier-based pricing. Buy more, save more with automated discounts.</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">Secure Dashboard</h3>
            <p className="text-slate-400 leading-relaxed">Comprehensive role-based access for both admins and retailers. Get analytics and track approvals instantly.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
