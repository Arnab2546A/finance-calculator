export default function PerformanceStats() {
  const stats = [
    { label: "Savings", value: 85, color: "from-cyan-400 to-blue-500" },
    { label: "Investments", value: 72, color: "from-purple-400 to-pink-500" },
    { label: "Expenses", value: 58, color: "from-orange-400 to-red-500" },
    { label: "Growth", value: 91, color: "from-emerald-400 to-teal-500" },
    { label: "Goals", value: 68, color: "from-indigo-400 to-purple-500" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-purple-500/30 h-full">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Overall Stats</h3>
        <p className="text-sm text-blue-200 mb-8">Track your financial performance</p>

        {/* Progress Bars */}
        <div className="space-y-6">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">{stat.label}</span>
                <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full">{stat.value}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-xs text-blue-200 mb-2">Total Balance</p>
            <p className="text-2xl font-bold">$12,840</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-200 mb-2">Monthly Growth</p>
            <p className="text-2xl font-bold text-cyan-300">+8.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
