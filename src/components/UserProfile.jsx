export default function UserProfile() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-blue-500/30 overflow-hidden relative">
      {/* Background Effect */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* User Avatar and Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-slate-200 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-blue-600 shadow-lg">
            👤
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Jane Lauren</h3>
            <p className="text-sm text-blue-200">Premium Member</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
            <p className="text-xs sm:text-sm text-blue-200 font-semibold mb-2">Earning</p>
            <p className="text-xl sm:text-2xl font-bold">$2,314</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
            <p className="text-xs sm:text-sm text-blue-200 font-semibold mb-2">Bonus</p>
            <p className="text-xl sm:text-2xl font-bold text-cyan-300">$200</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
            <p className="text-xs sm:text-sm text-blue-200 font-semibold mb-2">Favorite</p>
            <p className="text-xl sm:text-2xl font-bold">12,340</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-blue-900 font-bold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          View Profile
        </button>
      </div>
    </div>
  );
}
