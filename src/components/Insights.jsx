import "tailwindcss";
export default function Insights() {
  const insights = [
    {
      id: 1,
      icon: '💡',
      title: 'Spending Alert',
      description: 'Your entertainment expenses are 23% higher than last month. Consider cutting back on subscriptions.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-700',
      descColor: 'text-blue-600',
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Savings Goal',
      description: 'You\'re on track! Keep up your 47% savings rate to reach your $50,000 goal.',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      titleColor: 'text-emerald-700',
      descColor: 'text-emerald-600',
    },
    {
      id: 3,
      icon: '📊',
      title: 'Budget Tip',
      description: 'Groceries are your largest expense category. Meal planning could save you $200 monthly.',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      titleColor: 'text-purple-700',
      descColor: 'text-purple-600',
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Investment Opportunity',
      description: 'Your monthly surplus increased by 15%. Consider investing the extra funds.',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      titleColor: 'text-pink-700',
      descColor: 'text-pink-600',
    },
  ];

  return (
    <div id="insights" className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Financial Insights</h2>
        <p className="text-xs sm:text-sm text-gray-500">Personalized recommendations to improve your finances</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`${insight.bgColor} backdrop-blur-xl rounded-2xl p-6 border ${insight.borderColor} hover:border-opacity-75 transition-all duration-300 hover:shadow-lg hover:scale-105`}
          >
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">{insight.icon}</div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${insight.titleColor} mb-2`}>{insight.title}</h3>
                <p className={`${insight.descColor} text-sm leading-relaxed`}>{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <div className="bg-blue-50 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-blue-200 text-center hover:border-blue-400 transition-colors duration-300">
          <p className="text-2xl sm:text-4xl font-bold text-blue-600">82%</p>
          <p className="text-blue-600 text-xs mt-2 uppercase tracking-wide font-semibold">Budget Control</p>
        </div>
        <div className="bg-emerald-50 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-emerald-200 text-center hover:border-emerald-400 transition-colors duration-300">
          <p className="text-2xl sm:text-4xl font-bold text-emerald-600">$4.2K</p>
          <p className="text-emerald-600 text-xs mt-2 uppercase tracking-wide font-semibold">Monthly Savings</p>
        </div>
        <div className="bg-purple-50 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-purple-200 text-center hover:border-purple-400 transition-colors duration-300">
          <p className="text-2xl sm:text-4xl font-bold text-purple-600">12</p>
          <p className="text-purple-600 text-xs mt-2 uppercase tracking-wide font-semibold">Transactions</p>
        </div>
        <div className="bg-pink-50 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-pink-200 text-center hover:border-pink-400 transition-colors duration-300">
          <p className="text-2xl sm:text-4xl font-bold text-pink-600">5</p>
          <p className="text-pink-600 text-xs mt-2 uppercase tracking-wide font-semibold">Categories</p>
        </div>
      </div>
    </div>
  );
}
