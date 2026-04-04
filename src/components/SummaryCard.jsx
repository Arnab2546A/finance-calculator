import "tailwindcss";

export default function SummaryCard({ title, amount, icon, bgColor }) {
  return (
    <div className={`${bgColor} rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-white overflow-hidden relative group cursor-pointer h-full`}>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Animated background orbs */}
      <div className="absolute -right-12 -top-12 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 animate-glow\"></div>
      <div className="absolute -left-12 -bottom-12 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 animate-glow" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-bold opacity-80 tracking-widest uppercase">{title}</p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 sm:mt-4 group-hover:scale-110 transition-transform duration-300 origin-left">${amount.toLocaleString()}</p>
          <div className="mt-2 sm:mt-3 h-1 w-10 sm:w-12 bg-gradient-to-r from-white/60 to-white/20 rounded-full group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"></div>
        </div>
        <div className="text-5xl sm:text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg flex-shrink-0">{icon}</div>
      </div>
    </div>
  );
}
