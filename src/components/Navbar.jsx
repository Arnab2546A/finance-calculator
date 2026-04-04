import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="text-2xl sm:text-3xl">💎</div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FinTrack
              </h1>
              <p className="text-xs text-slate-400">Financial Dashboard</p>
            </div>
          </a>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#dashboard" className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
              Dashboard
            </a>
            <a href="#transactions" className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
              Transactions
            </a>
            <a href="#insights" className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
              Insights
            </a>
            <a href="#settings" className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
              Settings
            </a>
          </div>

          {/* Desktop Profile Button */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-white text-sm font-medium flex-shrink-0">
            <span>👤</span>
            Profile
          </button>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-300 text-slate-300 hover:text-white">
              <span className="text-2xl">🔔</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
            >
              <span className="text-2xl text-slate-300">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700/50 space-y-3 pb-4">
            <a href="#dashboard" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-all duration-300 text-sm font-medium">
              Dashboard
            </a>
            <a href="#transactions" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-all duration-300 text-sm font-medium">
              Transactions
            </a>
            <a href="#insights" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-all duration-300 text-sm font-medium">
              Insights
            </a>
            <a href="#settings" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-all duration-300 text-sm font-medium">
              Settings
            </a>
            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-white text-sm font-medium">
              <span>👤</span> Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
