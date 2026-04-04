import "tailwindcss";
import { useState, useMemo } from "react";

export default function TransactionsTable({ tableType = 'full' }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const transactions = [
    { id: 1, description: 'Grocery Store', amount: -120.50, date: '2024-04-02', category: 'Groceries', type: 'expense' },
    { id: 2, description: 'Salary Deposit', amount: 5000.00, date: '2024-04-01', category: 'Income', type: 'income' },
    { id: 3, description: 'Netflix Subscription', amount: -15.99, date: '2024-03-31', category: 'Entertainment', type: 'expense' },
    { id: 4, description: 'Gas Station', amount: -55.00, date: '2024-03-30', category: 'Transportation', type: 'expense' },
    { id: 5, description: 'Freelance Project', amount: 1200.00, date: '2024-03-29', category: 'Income', type: 'income' },
    { id: 6, description: 'Doctor Appointment', amount: -150.00, date: '2024-03-28', category: 'Healthcare', type: 'expense' },
    { id: 7, description: 'Coffee Shop', amount: -7.50, date: '2024-03-27', category: 'Food', type: 'expense' },
    { id: 8, description: 'Bonus Payment', amount: 800.00, date: '2024-03-26', category: 'Income', type: 'income' },
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      'Groceries': '🛒',
      'Income': '💵',
      'Entertainment': '🎬',
      'Transportation': '🚗',
      'Healthcare': '🏥',
      'Food': '☕',
    };
    return icons[category] || '💳';
  };

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (searchQuery.trim()) {
      result = result.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== "all") {
      result = result.filter((transaction) => transaction.type === filterType);
    }

    result.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return Math.abs(b.amount) - Math.abs(a.amount);
      }
      return 0;
    });

    return result;
  }, [searchQuery, filterType, sortBy]);

  // TOP RANKING VIEW (Condensed list)
  if (tableType === 'topRanking') {
    return (
      <div className="bg-white backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">TOP RANKING</h3>
        <div className="space-y-2">
          {transactions.slice(0, 8).map((transaction, idx) => (
            <div key={transaction.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">{transaction.description}</p>
                  <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <span className={`text-xs font-bold ml-2 ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FULL TABLE VIEW
  if (tableType === 'full') {
    return (
      <div className="bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border border-gray-200">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">Recent Transactions</h2>
          <p className="text-xs sm:text-sm text-gray-500">Track your latest financial activities</p>
        </div>

        {/* Search, Filter, and Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="🔍 Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm cursor-pointer"
            >
              <option value="all">🔽 All Types</option>
              <option value="income">💵 Income</option>
              <option value="expense">📉 Expense</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm cursor-pointer"
            >
              <option value="date">🔃 Newest First</option>
              <option value="amount">🔃 Highest Amount</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 sm:mb-6 flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredTransactions.length}</span> of <span className="font-semibold text-gray-700">{transactions.length}</span> transactions
          </p>
        </div>

        {/* Mobile-friendly card view for small screens */}
        <div className="md:hidden space-y-3">
          {filteredTransactions.length > 0 ? (
            <>
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(transaction.category)}</span>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No transactions found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                        <span className="text-gray-800 text-sm font-medium">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className={`py-3 px-4 text-sm font-bold text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    No transactions found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
}
