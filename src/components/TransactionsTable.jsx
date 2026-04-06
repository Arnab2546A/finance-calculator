import "tailwindcss";
import { useState, useMemo } from "react";

export default function TransactionsTable({ tableType = 'full', darkMode = false, transactions: passedTransactions = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showAll, setShowAll] = useState(false);

  const defaultTransactions = [
    { id: 1, date: '2024-01-05', description: 'January Salary', amount: 3000.00, category: 'Income', type: 'income' },
    { id: 2, date: '2024-01-10', description: 'Groceries', amount: 150.00, category: 'Food', type: 'expense' },
    { id: 3, date: '2024-01-15', description: 'January Bonus', amount: 500.00, category: 'Income', type: 'income' },
    { id: 4, date: '2024-01-20', description: 'Electric Bill', amount: 120.00, category: 'Utilities', type: 'expense' },
    { id: 5, date: '2024-02-05', description: 'February Salary', amount: 3000.00, category: 'Income', type: 'income' },
    { id: 6, date: '2024-02-10', description: 'Restaurant', amount: 75.30, category: 'Food', type: 'expense' },
    { id: 7, date: '2024-02-15', description: 'February Bonus', amount: 300.00, category: 'Income', type: 'income' },
    { id: 8, date: '2024-02-20', description: 'Gas Station', amount: 45.00, category: 'Travel', type: 'expense' },
    { id: 9, date: '2024-03-05', description: 'March Salary', amount: 3000.00, category: 'Income', type: 'income' },
    { id: 10, date: '2024-03-12', description: 'Movie Tickets', amount: 25.00, category: 'Entertainment', type: 'expense' },
    { id: 11, date: '2024-03-15', description: 'March Bonus', amount: 400.00, category: 'Income', type: 'income' },
    { id: 12, date: '2024-03-25', description: 'Gym Membership', amount: 30.00, category: 'Health', type: 'expense' },
    { id: 13, date: '2024-04-01', description: 'Grocery Store', amount: 52.50, category: 'Food', type: 'expense' },
    { id: 14, date: '2024-04-02', description: 'April Salary', amount: 3000.00, category: 'Income', type: 'income' },
    { id: 15, date: '2024-04-03', description: 'Gas Station', amount: 45.00, category: 'Travel', type: 'expense' },
    { id: 16, date: '2024-04-04', description: 'Restaurant', amount: 75.30, category: 'Food', type: 'expense' },
    { id: 17, date: '2024-04-05', description: 'Movie Tickets', amount: 25.00, category: 'Entertainment', type: 'expense' },
    { id: 18, date: '2024-04-08', description: 'Coffee Shop', amount: 6.50, category: 'Food', type: 'expense' },
    { id: 19, date: '2024-04-09', description: 'Gym Membership', amount: 30.00, category: 'Health', type: 'expense' },
    { id: 20, date: '2024-04-10', description: 'Freelance Payment', amount: 500.00, category: 'Income', type: 'income' },
    { id: 21, date: '2024-04-12', description: 'Electric Bill', amount: 120.00, category: 'Utilities', type: 'expense' },
    { id: 22, date: '2024-04-15', description: 'April Bonus', amount: 250.00, category: 'Income', type: 'income' },
    { id: 23, date: '2024-04-18', description: 'Groceries', amount: 100.00, category: 'Food', type: 'expense' },
    { id: 24, date: '2024-04-22', description: 'Gas Station', amount: 50.00, category: 'Travel', type: 'expense' },
    { id: 25, date: '2024-04-25', description: 'Restaurant', amount: 85.00, category: 'Food', type: 'expense' },
    { id: 26, date: '2024-04-28', description: 'Shopping', amount: 200.00, category: 'Entertainment', type: 'expense' },
  ];

  const transactions = passedTransactions && passedTransactions.length > 0 ? passedTransactions : defaultTransactions;

  const getCategoryIcon = (category) => {
    const icons = {
      'Groceries': '🛒',
      'Income': '💵',
      'Entertainment': '🎬',
      'Transportation': '🚗',
      'Healthcare': '🏥',
      'Health': '🏥',
      'Food': '☕',
      'Education': '📚',
      'Utilities': '⚡',
      'Travel': '🚗',
    };
    return icons[category] || '💳';
  };

  const downloadCSV = () => {
    const headers = ['Description', 'Category', 'Date', 'Amount', 'Type'];
    const rows = filteredTransactions.map(transaction => [
      transaction.description,
      transaction.category,
      new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      `₹${Math.abs(transaction.amount).toFixed(2)}`,
      transaction.type
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
  }, [searchQuery, filterType, sortBy, transactions]);

  // TOP RANKING VIEW (Condensed list)
  if (tableType === 'topRanking') {
    return (
      <div className="bg-white backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">TOP RANKING</h3>
        <div className="space-y-2">
          {transactions.slice(0, 8).map((transaction) => (
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
      <div className={`backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="mb-6 sm:mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Recent Transactions</h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track your latest financial activities</p>
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
              className={`w-full px-4 py-2 sm:py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Filter Dropdown */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`w-full px-4 py-2 sm:py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 cursor-pointer ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-800'
              }`}
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
              className={`w-full px-4 py-2 sm:py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 cursor-pointer ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-800'
              }`}
            >
              <option value="date">🔃 Newest First</option>
              <option value="amount">🔃 Highest Amount</option>
            </select>
          </div>
        </div>

        {/* Results Summary and Action Buttons */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing <span className={`font-semibold ${ darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{Math.min(showAll ? filteredTransactions.length : 14, filteredTransactions.length)}</span> of <span className={`font-semibold ${ darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{filteredTransactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button
              onClick={downloadCSV}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              📥 Download
            </button>
          </div>
        </div>

        {/* Mobile-friendly card view for small screens */}
        <div className="md:hidden space-y-3">
          {filteredTransactions.length > 0 ? (
            <>
              {(showAll ? filteredTransactions : filteredTransactions.slice(0, 14)).map((transaction) => (
                <div 
                  key={transaction.id}
                  className={`rounded-lg p-4 border transition-colors duration-300 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 hover:border-blue-400'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(transaction.category)}</span>
                      <div>
                        <p className={`font-medium text-sm ${ darkMode ? 'text-white' : 'text-gray-800'}`}>{transaction.description}</p>
                        <p className={`text-xs ${ darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.category}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className={`text-xs ${ darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
              {!showAll && filteredTransactions.length > 14 && (
                <button
                  onClick={() => setShowAll(true)}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                  }`}
                >
                  View More ({filteredTransactions.length - 14} more)
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className={`text-sm ${ darkMode ? 'text-gray-400' : 'text-slate-400'}`}>No transactions found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`border-b ${ darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
                <th className={`text-left py-3 px-4 font-semibold text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</th>
                <th className={`text-left py-3 px-4 font-semibold text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                <th className={`text-right py-3 px-4 font-semibold text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                (showAll ? filteredTransactions : filteredTransactions.slice(0, 14)).map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`border-b transition-colors duration-200 ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-blue-50'}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{transaction.description}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.category}</td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className={`py-3 px-4 text-sm font-bold text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
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
          {filteredTransactions.length > 0 && !showAll && filteredTransactions.length > 14 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                }`}
              >
                View More ({filteredTransactions.length - 14} more)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
