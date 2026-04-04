import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard", tooltip: "Dashboard" },
    { id: "analytics", icon: "📊", label: "Analytics", tooltip: "Analytics" },
    { id: "transactions", icon: "💳", label: "Transactions", tooltip: "Transactions" },
    { id: "budget", icon: "🎯", label: "Budget", tooltip: "Budget" },
    { id: "reports", icon: "📈", label: "Reports", tooltip: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings", tooltip: "Settings" },
  ];

  return (
    <div className="w-20 lg:w-24 h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-blue-700 shadow-2xl flex flex-col items-center py-8 gap-8 flex-shrink-0">
      {/* Logo */}
      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl font-bold text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300">
        💰
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-6 flex-1 items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`group relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-xl lg:text-2xl transition-all duration-300 ${
              activeItem === item.id
                ? "bg-white/30 text-white shadow-lg"
                : "text-white/70 hover:bg-white/20 hover:text-white"
            }`}
            title={item.tooltip}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Bottom Settings/Profile */}
      <div className="flex flex-col gap-4 items-center mb-4">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
          JL
        </div>
      </div>
    </div>
  );
}
